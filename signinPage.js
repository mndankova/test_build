// pp_signinPage.js

var signinPage = function () {
    function signinPage() {
        
        this.get = function() {
            browser.get('');
        };

        var ec = protractor.ExpectedConditions,
            
        this.email = element(by.name('email'));
        this.setEmail = function(value) {this.email.clear(); this.email.sendKeys(value);};
        this.shouldHaveEmail = function(value) {expect(this.email.getAttribute('value')).toEqual(value);};
        this.emailShouldBeVisible = function() {expect(this.email.isDisplayed()).toBeTruthy();};
        this.emailShouldBeEnabled = function() {expect(this.email.isEnabled()).toBeTruthy();};

        this.password = element(by.name('password'));
        this.setPassword = function(value) {this.password.clear(); this.password.sendKeys(value);};
        this.shouldHavePassword = function(value) {expect(this.password.getAttribute('value')).toEqual(value);};
        this.passwordShouldBeVisible = function() {expect(this.password.isDisplayed()).toBeTruthy();};
        this.passwordShouldBeEnabled = function() {expect(this.password.isEnabled()).toBeTruthy();};
      
        this.code = element(by.name('code'));
        this.setCode = function(value) {this.code.clear(); this.code.sendKeys(value);};
        this.shouldHaveCode = function(value) {expect(this.code.getAttribute('value')).toEqual(value);};
        this.codeShouldBeVisible = function() {expect(this.code.isDisplayed()).toBeTruthy();};       
        this.codeShouldBeEnabled = function() {expect(this.code.isEnabled()).toBeTruthy();};
        
        this.logInButton = element(by.buttonText('Log in'));
        this.clickLogInButton = function() {this.logInButton.click();};
        this.logInButtonShouldBeVisible = function() {expect(this.logInButton.isDisplayed()).toBeTruthy();};
     }
 };

module.exports = new signinPage();
