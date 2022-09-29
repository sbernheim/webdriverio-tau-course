

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ABTestPage extends Page {

    path = 'abtest';

    get header() {
        return $('h3')
    }
}

module.exports = new ABTestPage();
