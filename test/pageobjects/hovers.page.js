

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HoversPage extends Page {

    path = 'hovers';

    get header() {
        return $('h3')
    }

    get figures() {
        return $$('.example div.figure')
    }

    get figureCaptions() {
        return $$('.example div.figcaption')
    }

    figure(index) {
        return $(`.example div.figure:nth-of-type(${index})`)
    }

    figureCaption(index) {
        return $(`.example div.figure:nth-of-type(${index}) .figcaption`)
    }

    figureName(index) {
        return $(`.example div.figure:nth-of-type(${index}) .figcaption h5`)
    }

    captionFor(figure) {
        return figure.$('div.figcaption')
    }

    async moveToFigure(index) {
        var fig = await this.figure(index);
        await fig.moveTo();
        return fig.waitForDisplayed();
    }

    async figureCaptionIsDisplayed(index) {
        var figCap = await this.figureCaption(index);
        var isDisplayed = await figCap.isDisplayed();
        console.log(`FOUND CAPTION ${index} DISPLAYED: ${isDisplayed}`);
        await weExpect(figCap).toBeDisplayed();
        return isDisplayed;
    }

    async figureNameIsDisplayed(index) {
        var figName = await this.figureName(index);
        var isDisplayed = await figName.isDisplayed();
        console.log(`FOUND CAPTION ${index} DISPLAYED: ${isDisplayed}`);
        await weExpect(figName).toBeDisplayed();
        return isDisplayed;
    }
}

module.exports = new HoversPage();
