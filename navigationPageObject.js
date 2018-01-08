
var navigationPageObject = function() {

    this.get = function() {
        browser.get('');
    };
    
    var ec = protractor.ExpectedConditions,
    
    this.userName = element(by.exactBinding('user.name'));
    this.userNameShouldHaveText = function(value) {expect(this.userName.getText()).toBe(value);};

    this.dashboardLink = element(by.linkText('Dashboard'));
    this.clickDashboardLink = function() {this.dashboardLink.click();};
    this.dashboardLinkShouldBeVisible = function() {expect(this.dashboardLink.isDisplayed()).toBeTruthy();};

    this.newsLink = element(by.css('#nav > li.nav__item:nth-of-type(3) > a'));
    this.clickNewsLink = function() {this.newsLink.click();};
    this.newsLinkShouldBeVisible = function() {expect(this.newsLink.isDisplayed()).toBeTruthy();};
    this.unreadNews = element(by.exactBinding('unread.news'));
    this.unreadNewsShouldHaveText = function(value) {expect(this.unreadNews.getText()).toBe(value);};

    this.offersLink = element(by.linkText('Offers'));
    this.clickOffersLink = function() {this.offersLink.click();};
    this.offersLinkShouldBeVisible = function() {expect(this.offersLink.isDisplayed()).toBeTruthy();};

    this.statisticsLink = element(by.linkText('Statistics'));
    this.clickStatisticsLink = function() {this.statisticsLink.click();};
    this.statisticsLinkShouldBeVisible = function() {expect(this.statisticsLink.isDisplayed()).toBeTruthy();};

    this.payoutsLink = element(by.linkText('Payouts'));
    this.clickPayoutsLink = function() {this.payoutsLink.click();};
    this.payoutsLinkShouldBeVisible = function() {expect(this.payoutsLink.isDisplayed()).toBeTruthy();};

    this.unreadTickets = element(by.exactBinding('unread.tickets'));
    this.unreadTicketsShouldHaveText = function(value) {expect(this.unreadTickets.getText()).toBe(value);};

    this.referralHistoryLink = element(by.linkText('Referral History'));
    this.clickReferralHistoryLink = function() {this.referralHistoryLink.click();};
    this.referralHistoryLinkShouldBeVisible = function() {expect(this.referralHistoryLink.isDisplayed()).toBeTruthy();};

    this.historyLink = element(by.linkText('History'));
    this.clickHistoryLink = function() {this.historyLink.click();};
    this.historyLinkShouldBeVisible = function() {expect(this.historyLink.isDisplayed()).toBeTruthy();};

    this.instrumentsLink = element(by.linkText('Instruments'));
    this.clickInstrumentsLink = function() {this.instrumentsLink.click();};
    this.instrumentsLinkShouldBeVisible = function() {expect(this.instrumentsLink.isDisplayed()).toBeTruthy();};

    this.rotatorsLink = element(by.linkText('Rotators'));
    this.clickRotatorsLink = function() {this.rotatorsLink.click();};
    this.rotatorsLinkShouldBeVisible = function() {expect(this.rotatorsLink.isDisplayed()).toBeTruthy();};

    this.domainsLink = element(by.linkText('Domains'));
    this.clickDomainsLink = function() {this.domainsLink.click();};
    this.domainsLinkShouldBeVisible = function() {expect(this.domainsLink.isDisplayed()).toBeTruthy();};

    this.translationsLink = element(by.linkText('Translations'));
    this.clickTranslationsLink = function() {this.translationsLink.click();};
    this.translationsLinkShouldBeVisible = function() {expect(this.translationsLink.isDisplayed()).toBeTruthy();};
    
    this.trafficNotificationLink = element(by.linkText('Traffic notification'));
    this.clickTrafficNotificationLink = function() {this.trafficNotificationLink.click();};
    this.trafficNotificationLinkShouldBeVisible = function() {expect(this.trafficNotificationLink.isDisplayed()).toBeTruthy();};

    this.settingsLink = element(by.linkText('Settings'));
    this.clickSettingsLink = function() {this.settingsLink.click();};
    this.settingsLinkShouldBeVisible = function() {expect(this.settingsLink.isDisplayed()).toBeTruthy();};

    this.helpLink = element(by.linkText('Help'));

    this.clickHelpLink = function() {this.helpLink.click();};
    this.helpLinkShouldBeVisible = function() {expect(this.helpLink.isDisplayed()).toBeTruthy();};

    this.blogLink = element(by.linkText('Blog'));
    this.clickBlogLink = function() {this.blogLink.click();};
    this.blogLinkShouldBeVisible = function() {expect(this.blogLink.isDisplayed()).toBeTruthy();};
    
};
module.exports = new navigationPageObject();
