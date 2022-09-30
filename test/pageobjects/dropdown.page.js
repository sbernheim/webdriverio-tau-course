

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DropdownPage extends Page {

    path = 'dropdown';

    get header() {
        return $('h3')
    }

    get dropdownMenu() {
        return $('#dropdown')
    }

    get dropdownMenuOptions() {
        return $$('#dropdown option')
    }

    get defaultDropdownMenuOption() {
        return $('#dropdown option:nth-of-type(1)')
    }

    get selectedDropdownMenuOption() {
        return $('#dropdown option[selected=selected]')
    }

    dropdownMenuOption(index) {
        return $(`#dropdown option:nth-of-type(${index})`)
    }

    dropdownMenuOptionFor(optionText) {
        return $(`#dropdown`).$(`option=${optionText}`)
    }

    async clickDropdownMenu() {
        const menu = await this.dropdownMenu;
        await menu.waitForDisplayed();
        await menu.click();
    }

    async clickDropdownMenuOption(index) {
        const menuOption = await this.dropdownMenuOption(index);
        await menuOption.waitForDisplayed();
        await menuOption.click();
    }

    async clickDropdownMenuOptionFor(optionText) {
        const menuOption = await this.dropdownMenuOptionFor(optionText);
        await menuOption.waitForDisplayed();
        await menuOption.click();
    }

    async dropdownMenuSelectionShouldBe(elem) {
        var e = await elem;
        var msg = await this.menuOptionMessage(e);
        console.log(`SHOULD BE SELECTED ${msg}`);
        await weExpect(e).toBeSelected();
    }

    async logSelectedMenuOption() {
        var e = await this.selectedDropdownMenuOption;
        var msg = await this.menuOptionMessage(e);
        console.log(`SELECTED ${msg}`);
    }

    async logAllMenuOptions() {
        console.log(await this.allMenuOptionsMessage());
    }

    async allMenuOptionsMessage() {
        var opts = await this.dropdownMenuOptions;
        var msgs = opts.map((o) => this.menuOptionMessage(o) );
        return await Promise.all(msgs).then((r) => {
            return r.reduce((m, o, i, l) => {
                return m.concat("\n(", i+1, " of ", l.length, ") ", o);
            }, "ALL MENU OPTIONS:");
        });
    }

    async menuOptionMessage(elem) {
        var e = await elem;
        var val = await e.getValue();
        var txt = await e.getText();
        var isSelected = await e.isSelected();
        return `MENU OPTION [ val='${val}', text='${txt}', selected=${isSelected}]`
    }

}

module.exports = new DropdownPage();
