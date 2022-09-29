

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class KeyPressPage extends Page {

    path = 'key_presses';

    get header() {
        return $('h3')
    }

    get inputField() {
        return $('.example #target')
    }

    get result() {
        return $('#result')
    }

    async resultText() {
        var result = await this.result.getText();
        return result;
    }

    async resultKey() {
        var regex = /^You entered:\s+(\S+)$/;
        var result = await this.resultText();
        var match = result.match(regex);
        console.log(`MATCHED: [${match}]`);
        expect(match).is.not.null;
        match.should.be.an('array').with.a.lengthOf.at.least(2);
        return match[1];
    }
}

module.exports = new KeyPressPage();
