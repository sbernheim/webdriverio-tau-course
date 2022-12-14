/* Why do $('selector') calls fail when this require statement is 
   included in a .js file? */
//const { default: $ } = require("webdriverio/build/commands/browser/$");

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    path = '';

    rootUrl = "https://the-internet.herokuapp.com/";
    
    /* These getters fail when the require statement is not commented */
    get footer() {
        return $("#page-footer")
    }

    get xpFoot() {
        return $("//*[@id='page-footer']")
    }

    get header() {
        return $('h3')
    }

    get flashAlert () {
        return $('#flash');
    }

    get flashAlertCloser() {
        return $('#flash .close')
    }

    get forkMe() {
        return $('img[alt^="Fork me"]')
    }

    async headerText() {
        return await (await this.header).getText();
    }

    body() {
        return $('body')
    }

    getLink(linkText) {
        return $(`=${linkText}`)
    }

    async clickLink(linkText, pauseMillis=0) {
        var link = await this.getLink(linkText);
        await link.click();
        browser.pause(pauseMillis);
    }

    async hideForkMe() {
        await browser.execute("document.querySelector('img[alt^=\"Fork me\"]').style.display='none'");
    }

    async showForkMe() {
        await browser.execute("document.querySelector('img[alt^=\"Fork me\"]').style.display=''");
    }

    async dismissAlert() {
        await this.hideForkMe();
        await this.forkMe.waitForDisplayed({reverse: true});
        (await this.flashAlertCloser).click();
        await this.showForkMe();
        await this.forkMe.waitForDisplayed();
    }

    /**
     * Returns the passed path appended to the root URL of this page
     *
     * @returns {String} url for the passed path on the rootUrl
     */
    url () {
        //return `${this.rootUrl}${this.path}`
        return `${browser.options.baseUrl}${this.path}`
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open () {
        const url = this.url();
        console.log(`OPENING URL: ${url}`);
        return browser.url(url)
    }

    /**
     * Verifies that this page is loaded.
     * @returns a Promise waiting for the body element to be displayed
     */
    async toBeLoaded() {
        await weExpect(browser).toHaveUrl(this.url());
        return this.body().waitForDisplayed();
    }

    async switchWindow() {
        const url = this.url();
        console.log(`SWITCHING WINDOW TO: ${url}`)
        await browser.switchWindow(url);
    }

    async scrollToFooter() {
        var footer = await this.footer;
        await footer.scrollIntoView();
        await footer.moveTo();
    }
}
