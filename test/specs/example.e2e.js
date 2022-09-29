const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');
const { assert } = require('chai');

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await weExpect(browser).toHaveUrl(LoginPage.url());

        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await weExpect(SecurePage.flashAlert).toBeExisting();
        assert.equal(true, await SecurePage.flashAlert.isExisting());
        await weExpect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
        assert.include(await SecurePage.flashAlert.getText(), 'You logged into a secure area!');
        (await SecurePage.flashAlert.getText()).should.include('You logged into a secure area!');

        await weExpect(browser).toHaveUrl(SecurePage.url());
        assert.equal(SecurePage.url(), await browser.getUrl());
        await weExpect(browser).toHaveUrlContaining(SecurePage.path);

        await weExpect(SecurePage.flashAlert).toHaveText('SECURE',{ignoreCase:true,containing:true});
    });
});


