

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MultiWindowPage extends Page {

    path = 'windows';

    expectedHeader = 'Opening a new window';
}

module.exports = new MultiWindowPage();
