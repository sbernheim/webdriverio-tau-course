

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckboxPage extends Page {

    path = 'checkboxes';

    get header() {
        return $('h3')
    }

    get form() {
        return $('form.checkboxes')
    }

    get firstCheckbox() {
        return $('#checkboxes input:first-child')
    }

    get lastCheckbox() {
        return $('#checkboxes input:last-child')
    }

    get checkboxes() {
        return $$('#checkboxes')
    }

    checkbox(index=1) {
        return $(`#checkboxes input:nth-child(${index})`)
    }

    async clickCheckbox(index) {
        var box = await this.checkbox(index);
        await box.waitForDisplayed();
        return box.click();
    }
}

module.exports = new CheckboxPage();
