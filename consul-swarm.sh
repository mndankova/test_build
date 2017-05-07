#!/usr/bin/env bash

#swarm registry
docker-machine create -d virtualbox keystore
docker-machine env keystore -- bash
eval "$(docker-machine env keystore --shell bash)"
docker run -d -p 8500:8500 -h consul progrium/consul -server -bootstrap
docker-machine ip keystore
export consul_ip=$(docker-machine ip keystore)

echo consul IP: $consul_ip

#swarm master node
docker-machine create \
    -d virtualbox \
    --swarm --swarm-master \
    --swarm-discovery="consul://$consul_ip:8500" \
    --engine-opt="cluster-store=consul://$consul_ip:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    master-node

#worker node=API
docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://$consul_ip:8500" \
    --engine-opt="cluster-store=consul://$consul_ip:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    --engine-label noderole=api \
    cluster-node-api

#worker node=WEBAPP
docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://$consul_ip:8500" \
    --engine-opt="cluster-store=consul://$consul_ip:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    --engine-label noderole=webapp \
    cluster-node-webapp

#worker node=DATABASE
docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://$consul_ip:8500" \
    --engine-opt="cluster-store=consul://$consul_ip:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    --engine-label noderole=db \
    cluster-node-db

#check cluster node
docker-machine env --shell bash master-node
eval "$(docker-machine env --shell bash master-node)"
docker ps --format "{{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Command}}"
docker run swarm list consul://$consul_ip:8500

#check connect swarm
docker-machine env --shell bash --swarm master-node
eval "$(docker-machine env --shell bash  --swarm master-node)"
docker ps --format "{{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Command}}"
docker ps --all --format "{{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Command}}"
docker info

#overlay
docker network create --driver overlay test-netw
docker network ls
