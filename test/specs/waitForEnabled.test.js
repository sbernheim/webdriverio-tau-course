//const { default: $ } = require("webdriverio/build/commands/browser/$");
const { default: selectByIndex } = require('webdriverio/build/commands/element/selectByIndex');
const DynamicControlsPage = require('../pageobjects/dynamicControls.page');

describe('Wait for enabled dynamic controls', () => {
    it.skip('should wait for the input field to be enabled', async () => {
        await DynamicControlsPage.open();
        //await expect(browser).toHaveUrl(DynamicControlsPage.url());

        const enableButton = await DynamicControlsPage.enableButton;
        await enableButton.waitForDisplayed();
        await enableButton.click();

        const inputField = await DynamicControlsPage.inputEnabledField;
        await inputField.waitForEnabled({timeout:5000});

        await weExpect(DynamicControlsPage.inputEnabledField).toBeEnabled();
        //expect('#input-example input').dom.to.be.enabled();
        await weExpect(DynamicControlsPage.inputEnabledField).not.toBeDisabled();

        await weExpect(DynamicControlsPage.enableButton).toHaveAttrContaining('autocomplete','off');

        const footLink = await DynamicControlsPage.footerLink;
        await weExpect(footLink).toHaveHrefContaining('elemental');

        /*const foot = DynamicControlsPage.footer;
        const footText = await foot.getText();
        await expect(footText).toContain("Powered by");*/
    });
    it.skip('should wait for the input field to be disabled', async () => {
        const enableButton = await DynamicControlsPage.enableButton;
        await enableButton.waitForDisplayed();
        await enableButton.click();

        await DynamicControlsPage.inputEnabledField.waitForEnabled({timeout: 5000, reverse: true});

        await weExpect(DynamicControlsPage.inputEnabledField).toBeDisabled();
        await weExpect(DynamicControlsPage.inputEnabledField).not.toBeEnabled();
    });
    it('should wait for the checkbox to not exist', async () => {
        await DynamicControlsPage.open();
        await DynamicControlsPage.toBeLoaded();
        const button = await DynamicControlsPage.checkboxButton;
        await button.waitForDisplayed();
        const box = await DynamicControlsPage.checkbox;
        const msg = await DynamicControlsPage.checkboxMessage;
        await weExpect(box).toExist();
        await weExpect(msg).not.toExist();
        await button.click();
        await box.waitForExist({reverse: true, timeout: 5000});
        await weExpect(box).not.toExist();
        await weExpect(msg).toExist();
        var msgText = await msg.getText();
        console.log(`CHECKBOX MESSAGE: ${msgText}`);
        msgText.should.equal("It's gone!");
        await button.click();
        await button.waitForEnabled({timeout: 5000});
        await weExpect(button).toBeEnabled();
        await weExpect(box).toExist();
        var msgText = await msg.getText();
        console.log(`CHECKBOX MESSAGE: ${msgText}`);
        msgText.should.equal("It's back!");
        await button.click();
        await weExpect(button).not.toBeEnabled();
        await weExpect(box).toExist();
        await weExpect(msg).not.toExist();
        await msg.waitForExist({timeout: 5000});
        await weExpect(msg).toExist();
        var msgText = await msg.getText();
        console.log(`CHECKBOX MESSAGE: ${msgText}`);
        msgText.should.equal("It's gone!");
        await weExpect(box).not.toExist();
        await weExpect(button).toHaveText("Add");
    });
    it.only('should wait for checkbox button text to change', async () => {
        await DynamicControlsPage.open();
        await DynamicControlsPage.toBeLoaded();
        const button = await DynamicControlsPage.checkboxButton;
        const box = await DynamicControlsPage.checkbox;
        const msg = await DynamicControlsPage.checkboxMessage;
        await button.waitForDisplayed();
        await weExpect(button).toExist();
        await weExpect(button).toHaveText("Remove");
        await weExpect(box).toExist();
        await weExpect(msg).not.toExist();
        await button.click();
        await button.click();
        await button.waitUntil(async () => {
            return (await DynamicControlsPage.checkboxButtonText()) == "Add";
        }, { 
            timeout: 5000, timeoutMsg: 'expected checkbox button text to be Remove after 5000ms'
        });
        await weExpect(box).not.toExist();
        await weExpect(button).toHaveText("Add");
        await weExpect(msg).toExist();
        await weExpect(msg).toHaveText("It's gone!");
        await button.click();
        await browser.waitUntil(async () => {
            return (await msg.isExisting()) && (await msg.getText()) == "It's back!";
        }, {
            timeout: 8000, 
            interval: 2000,
            timeoutMsg: 'expected checkbox message to exist and be "It\'s back" after 8000ms'
        });
        await weExpect(msg).toExist();
        await weExpect(msg).toHaveText("It's back!");
    });
});


