
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InternetPage extends Page {

    /**
     * define selectors using getter methods
     */
    get heading() {
        return $("h1.heading")
    }

    get subheading() {
        return $("h2")
    }

    get links () {
        return $('ul a');
    }

    get list() {
        return $('ul')
    }

    get listItems() {
        return this.list.$$('li')
    }

    get firstLink() {
        return $('ul li:first-child a')
    }

    nthListItem(index) {
        return this.list.$(`li:nth-child(${index})`)
    }

    async nthListItemText(index) {
        return (await this.nthListItem(index)).getText()
    }

    async nthLink(index=1) {
        return await $(`ul li:nth-child(${index}) a`)
    }

    async clickFirstLink(pauseMillis=2000) {
        var link = await this.firstLink;
        if (await link.isDisplayed()) {
            link.click();
        }
        await browser.pause(pauseMillis);
    }

    async clickNthLink(index=0, pauseMillis=0) {
        const link = await this.nthLink(index);
        await link.waitForDisplayed(pauseMillis);
        await link.click();
    }

    /**
     * return an array of the link list items on this page
     */
    async getListItems() {
        var linkCount = await this.listItems.length;
        console.log(`FOUND ${linkCount} LIST ELEMENTS`);
        await this.listItems.filter((e) => {
            e.getText()
        }).map((e) => {
            console.log(e.getText())
        })
    }
    
    async titleText() {
        const title = await this.title;
        return title.getText();
    }
}

module.exports = new InternetPage();
