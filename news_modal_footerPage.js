var news_modal_footerPageObject = function() {
var ptor;

  beforeEach(function() {
    browser.get('');
    ptor = protractor.getInstance();
  });
  
    this.get = function() {
        browser.get('');
    };

    this.clickButtonsButton = function(rowIndex1) {this.buttonsButton.get(rowIndex1).element(by.buttonText('OK')).click();};
    this.buttonsButtonShouldBeVisible = function(rowIndex1) {expect(this.buttonsButton.get(rowIndex1).element(by.buttonText('OK')).isDisplayed()).toBeTruthy();
    };

    this.clickCancelButton = function(rowIndex1) {this.buttonsButton.get(rowIndex1).element(by.buttonText('Cancel')).click();};
    this.cancelButtonShouldBeVisible = function(rowIndex1) {
      expect(this.buttonsButton.get(rowIndex1).element(by.buttonText('Cancel')).isDisplayed()).toBeTruthy();
    };
};
module.exports = new news_modal_footerPageObject();
