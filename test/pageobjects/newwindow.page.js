

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NewWindowPage extends Page {

    path = 'windows/new';

    expectedHeader = 'New Window';

}

module.exports = new NewWindowPage();
