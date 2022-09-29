

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FramesPage extends Page {

    path = 'frames';

    get header() {
        return $('h3')
    }
}

module.exports = new FramesPage();
