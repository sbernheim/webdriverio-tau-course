

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class JavascriptAlertsPage extends Page {

    path = 'javascript_alerts';

    get header() {
        return $('h3')
    }

    get buttons() {
        return $$('.example button')
    }

    get result() {
        return $('.example #result')
    }

    async resultText() {
        return (await this.result).getText();
    }

    button(index) {
        return $(`.example li:nth-of-type(${index}) button`)
    }

    /**
     * Returns the selected button for the passed onclick handler starting with 'js'.
     *  
     * @param {String} action the button's JavaScript onclick hander [Alert|Confirm|Prompt]
     * @returns 
     */
    buttonFor(action) {
        return $(`.example button[onclick="js${action}()"]`)
    }

    /**
     * Click the button at the passed index.
     * @param {int} index 
     */
    async clickButton(index) {
        await this.button(index).click();
    }

    /**
     * Click the button to call the passed onclick handler starting with 'js'.
     * 
     * @param {String} action the button's JavaScript onclick hander [Alert|Confirm|Prompt]
     */
    async clickButtonFor(action) {
        await this.buttonFor(action).click();
    }

    async logButtons() {
        console.log(await this.allButtonsMessage());
    }

    async logButtonFor(action) {
        const m = await this.buttonMessage(this.buttonFor(action));
        console.log(`BUTTON ${m}`);
    }

    async logButton(index) {
        const m = await this.buttonMessage(this.button(index));
        console.log(`BUTTON[${index}] ${m}`);
    }

    async allButtonsMessage() {
        const buttons = await this.buttons;
        console.log(buttons);
        const messages = buttons.map((b) => this.buttonMessage(b));
        console.log(messages);
        return await Promise.all(messages).then((r) => {
            return r.reduce((m, b, i, l) => {
                return m.concat("\n(", i+1, " of ", l.length, ") ", b);
            }, "ALL BUTTONS:");
        });
    }

    async buttonMessage(buttonElement) {
        const b = await buttonElement;
        const t = await b.getText();
        const h = await b.getAttribute('onclick');
        return `for(${h}) '${t}'`;
    }

}

module.exports = new JavascriptAlertsPage();
