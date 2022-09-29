

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DynamicControlsPage extends Page {
    path = "dynamic_controls";

    /**
     * define selectors using getter methods
     */
    get footerLink () {
        return $('#page-footer a');
    }

    get inputEnabledField() {
        return $('#input-example input');
    }

    get enableButton () {
        return $('#input-example button');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to enable the input example field
     */
    async enableInput (username, password) {
        await this.enableButton.waitForDisplayed();
        await this.enableButton.click();
    }

}

module.exports = new DynamicControlsPage();
