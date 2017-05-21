#!/usr/bin/env bash

#boot2docker-17.05.iso
if [ ! -f $HOME/.docker/machine/cache/boot2docker-17.05.iso ]; then
  curl -L https://github.com/boot2docker/boot2docker/releases/download/v17.05.0-ce/boot2docker.iso > $HOME/.docker/machine/cache/boot2docker-17.05.iso
fi
export VIRTUALBOX_BOOT2DOCKER_URL=file://$HOME/.docker/machine/cache/boot2docker-17.05.iso

#swarm token
echo "swarm token"
docker-machine create -d virtualbox test
eval "$(docker-machine env test)"
SWARM_TOKEN=$(docker run swarm create)

echo "======swarm token: $SWARM_TOKEN"

SWARM_MASTER=swarm-master
CONSUL_MASTER=$SWARM_MASTER

#swarm-master
echo "swarm master"
docker-machine create \
    -d virtualbox \
    --swarm \
    --swarm-master \
    --swarm-discovery token://$SWARM_TOKEN \
    $SWARM_MASTER

echo "======consul/swarm-master"

#bootstramp/consul-master
echo "consul-master-node"
docker-machine create \
	    -d virtualbox \
	    $CONSUL_MASTER
eval "$(docker-machine env $CONSUL_MASTER)"
CONSUL_MASTER_IP=$(docker-machine ip $CONSUL_MASTER)
docker run -d --name $CONSUL_MASTER -h $CONSUL_MASTER \
		-p $CONSUL_MASTER_IP:8300:8300 \
		-p $CONSUL_MASTER_IP:8301:8301 \
		-p $CONSUL_MASTER_IP:8301:8301/udp \
		-p $CONSUL_MASTER_IP:8302:8302 \
		-p $CONSUL_MASTER_IP:8302:8302/udp \
		-p $CONSUL_MASTER_IP:8400:8400 \
		-p $CONSUL_MASTER_IP:8500:8500 \
		-p $CONSUL_MASTER_IP:53:53 \
		-p $CONSUL_MASTER_IP:53:53/udp \
		progrium/consul \
		-server \
		-advertise $(docker-machine ip $CONSUL_MASTER) \
		-bootstrap
echo "======consul-master_IP: $CONSUL_MASTER_IP"

REGISTRATOR_TAG=v6
echo "======registrator/swarm-master-node"
eval $(docker-machine env $SWARM_MASTER)
docker run -d \
	-v /var/run/docker.sock:/tmp/docker.sock \
	-h registrator-swarm-master \
	--name registrator-swarm-master \
	gliderlabs/registrator:$REGISTRATOR_TAG \
	consul://$(docker-machine ip $SWARM_MASTER):8500 \
	-ip $(docker-machine ip $SWARM_MASTER)

#swarm-node
SWARM_NODES=("redis" "postgres" "mongo" "rabbit" "core")
for i in "${SWARM_NODES[@]}"; do
	echo "======creating swarm-node $i"
	docker-machine create \
	    -d virtualbox \
	    --swarm \
	    --swarm-discovery token://$SWARM_TOKEN \
	    $i

	NODE_IP=$(docker-machine ip $i)

	eval "$(docker-machine env $i)"
	docker run --name consul-$i -d -h $i \
		-p $NODE_IP:8300:8300 \
		-p $NODE_IP:8301:8301 \
		-p $NODE_IP:8301:8301/udp \
		-p $NODE_IP:8302:8302 \
		-p $NODE_IP:8302:8302/udp \
		-p $NODE_IP:8400:8400 \
		-p $NODE_IP:8500:8500 \
		-p $NODE_IP:53:53 \
		-p $NODE_IP:53:53/udp \
		progrium/consul \
		-server \
		-advertise $NODE_IP \
		-join $CONSUL_MASTER_IP

	echo "======registrator/node $i"
	eval $(docker-machine env $i)
	docker run -d \
		-v /var/run/docker.sock:/tmp/docker.sock \
		-h registrator-$i \
		--name registrator-$i \
		gliderlabs/registrator:$REGISTRATOR_TAG \
		consul://$NODE_IP:8500 \
		-ip $NODE_IP

	#local-balancer
	docker run \
		-d \
		-e SERVICE_NAME=balancer \
		--name=balancer \
		--dns $NODE_IP \
		-p 80:80 \
		chenglong/nginx-consul-template
done

eval "$(docker-machine env --swarm $SWARM_MASTER)"
