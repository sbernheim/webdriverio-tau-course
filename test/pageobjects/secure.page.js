

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {

    /**
     * define selectors using getter methods
     */
    get flashAlert () {
        return $('#flash');
    }

    path = 'secure';
    /*get path () {
        return 'secure';
    }*/
}

module.exports = new SecurePage();
