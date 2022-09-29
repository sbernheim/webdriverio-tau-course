

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MultiWindowPage extends Page {

    path = 'windows';

    get header() {
        return $('h3')
    }
}

module.exports = new MultiWindowPage();
