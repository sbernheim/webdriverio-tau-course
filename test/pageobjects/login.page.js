

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    path = "login";

    /**
     * define selectors using getter methods
     */
    get usernameField () {
        return $('#username');
    }

    get passwordField () {
        return $('#password');
    }

    get loginButton () {
        return $('button[type="submit"]');
    }

    get header() {
        return $('h2')
    }

    /**
     * Enters the passed username string into the login form username field 
     * @param {String} username 
     */
    async enterUsername(username) {
        await this.usernameField.waitForDisplayed(1000);
        await this.usernameField.setValue(username);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    /**
     * Enters the passed password string into the login form password field
     * @param {String} password 
     */
    async enterPassword(password) {
        await this.passwordField.waitForDisplayed(1000);
        await this.passwordField.setValue(password);
    }

    async clearUsername() {
        await this.usernameField.clearValue();
    }

    async clearPassword() {
        await this.passwordField.clearValue();
    }

    async clearLoginForm() {
        await this.clearUsername();
        await this.clearPassword();
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.loginButton.click();
    }

}

module.exports = new LoginPage();
