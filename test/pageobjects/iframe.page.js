

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class IFramePage extends Page {

    path = 'iframe';

    get header() {
        return $('h3')
    }

    get iframeBody() {
        return $('#tinymce')
    }

    get iframe() {
        return $('#mce_0_ifr')
    }

    async headerToBeDisplayed() {
        await (await this.header).waitForDisplayed();
    }

    async iframeToBeDisplayed() {
        await (await this.iframe).waitForDisplayed();
    }

    async switchToIframe() {
        await browser.switchToFrame(await this.iframe);
    }

    async getBodyText() {
        return await (await this.iframeBody).getText();
    }

    async clearBodyText() {
        await this.iframeBody.clearValue();
    }

    async focusOnBody() {
        await this.iframeBody.click();
    }

    async sendTextToBody(bodyText) {
        await this.iframeBody.keys(bodyText);
    }
}

module.exports = new IFramePage();
