

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NewWindowPage extends Page {

    path = 'windows/new';

    get header() {
        return $('h3')
    }

    async headerText() {
        return await (await this.header).getText();
    }

}

module.exports = new NewWindowPage();
