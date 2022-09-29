

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DragAndDropPage extends Page {

    path = 'drag_and_drop';

    get header() {
        return $('h3')
    }

    get columnA() {
        return $('#column-a')
    }

    get columnAHeader() {
        return $('#column-a header')
    }

    get columnB() {
        return $('#column-b')
    }

    get columnBHeader() {
        return $('#column-b header')
    }

    async dragAtoB() {
        var colA = await this.columnA;
        var colB = await this.columnB;
        await colA.waitForDisplayed();
        await colA.dragAndDrop(colB);
        await colB.moveTo();
    }

    async dragBtoA() {
        var colA = await this.columnA;
        var colB = await this.columnB;
        await colB.waitForDisplayed();
        await colB.dragAndDrop(colA);
        await colA.moveTo();
    }

}

module.exports = new DragAndDropPage();
