

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    path = 'secure';

    /**
     * define selectors using getter methods
     */
    get header() {
        return $('h2')
    }

    get logoutButton() {
        return $('.example .button')
    }

    async logout() {
        await this.logoutButton.click();
    }
}

module.exports = new SecurePage();
