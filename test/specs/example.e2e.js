const loginPage = require('../pageobjects/login.page');
const securePage = require('../pageobjects/secure.page');
const loginData = require('../../data/logindata');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await loginPage.open();
        await weExpect(browser).toHaveUrl(loginPage.url());

        await loginPage.login(loginData.username, loginData.password);
        await weExpect(securePage.flashAlert).toBeExisting();
        assert.equal(true, await securePage.flashAlert.isExisting());
        await weExpect(securePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
        assert.include(await securePage.flashAlert.getText(), 'You logged into a secure area!');
        (await securePage.flashAlert.getText()).should.include('You logged into a secure area!');

        await weExpect(browser).toHaveUrl(securePage.url());
        assert.equal(securePage.url(), await browser.getUrl());
        await weExpect(browser).toHaveUrlContaining(securePage.path);

        await weExpect(securePage.flashAlert).toHaveText('SECURE',{ignoreCase:true,containing:true});
    });
    it('should logout by clicking the logout button', async () => {
        await securePage.logout();
        await loginPage.toBeLoaded();
        await weExpect(loginPage.flashAlert).toExist();
        await weExpect(loginPage.flashAlert).toHaveTextContaining('You logged out of the secure area!');
        await weExpect(loginPage.flashAlert).toHaveElementClass('success');
        /*await weExpect(loginPage.flashAlertCloser).toExist();
        await weExpect(loginPage.flashAlertCloser).toBeEnabled();
        await loginPage.dismissAlert();
        await weExpect(loginPage.flashAlert).not.toExist();*/
    });
    it('should get an invalid username alert when username field is empty', async () => {
        await loginPage.clearLoginForm();
        await loginPage.clickLoginButton();
        await loginPage.flashAlert.waitForDisplayed();
        await weExpect(loginPage.flashAlert).toExist();
        await weExpect(loginPage.flashAlert).toHaveElementClass('error');
        await weExpect(loginPage.flashAlert).toHaveTextContaining('Your username is invalid!');
        /*await loginPage.dismissAlert();
        await weExpect(loginPage.flashAlert).not.toExist();*/
    });
    it('should get an invalid username alert when username is not valid', async () => {
        await loginPage.login("notAValidUser", loginData.password);
        await loginPage.flashAlert.waitForDisplayed();
        await weExpect(loginPage.flashAlert).toExist();
        await weExpect(loginPage.flashAlert).toHaveElementClass('error');
        await weExpect(loginPage.flashAlert).toHaveTextContaining('Your username is invalid!');
        /*await loginPage.dismissAlert();
        await weExpect(loginPage.flashAlert).not.toExist();*/
    });
    it.skip('should get an invalid password aleret when password is not valid', async () => {
        await browser.debug();
        await loginPage.login(loginData.username, "invalid-Password");
        await loginPage.flashAlert.waitForDisplayed();
        await weExpect(loginPage.flashAlert).toExist();
        await weExpect(loginPage.flashAlert).toHaveElementClass('error');
        await weExpect(loginPage.flashAlert).toHaveTextContaining('Your password is invalid!');
        /*await loginPage.dismissAlert();
        await weExpect(loginPage.flashAlert).not.toExist();*/
    });
    it.skip('should wait for us to debug at the end', async () => {
        await browser.debug();
    });
});
