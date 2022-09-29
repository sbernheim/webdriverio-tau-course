//const { default: $ } = require("webdriverio/build/commands/browser/$");
const DynamicControlsPage = require('../pageobjects/dynamicControls.page');

describe('Wait for enabled dynamic controls', () => {
    it('should wait for the input field to be enabled', async () => {
        await DynamicControlsPage.open();
        //await expect(browser).toHaveUrl(DynamicControlsPage.url());

        const enableButton = DynamicControlsPage.enableButton;
        await enableButton.waitForDisplayed();
        await enableButton.click();

        await DynamicControlsPage.inputEnabledField.waitForEnabled({timeout:5000});

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
    it('should wait for the input field to be disabled', async () => {
        const enableButton = DynamicControlsPage.enableButton;
        await enableButton.waitForDisplayed();
        await enableButton.click();

        await DynamicControlsPage.inputEnabledField.waitForEnabled({timeout: 5000, reverse: true});

        await weExpect(DynamicControlsPage.inputEnabledField).toBeDisabled();
        await weExpect(DynamicControlsPage.inputEnabledField).not.toBeEnabled();
    });
});


