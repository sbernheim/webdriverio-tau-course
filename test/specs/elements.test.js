const InternetPage = require('../pageobjects/internet.page');
const ABTestPage = require('../pageobjects/abtest.page');

describe('Interacting with elements', () => {
    it('should get the text content of an element', async () => {
        const page = await InternetPage.open();

        await InternetPage.getListItems();

        const basicAuthText = await InternetPage.nthListItemText(3);
        console.log(`BASIC AUTH LINK TEXT: ${basicAuthText}`);

        const heading = await InternetPage.heading;
        let headingtext = await heading.getText();
        console.log(`HEAD TEXT: ${headingtext}`);

        let h2text = await $("h2").getText();
        console.log(`H2 TEXT: ${h2text}`);

        const foot = await InternetPage.footer;
        await weExpect(foot).toExist();
        let footText = await foot.getText();
        console.log(`FOOT TEXT: ${footText}`);
        weExpect(foot).toHaveTextContaining("Selenium");

        const xFoot = await InternetPage.xpFoot;
        await weExpect(xFoot).toExist();
        let xFootText = await xFoot.getText();
        console.log(`XFOOT TEXT: ${xFootText}`);
        weExpect(xFoot).toHaveTextContaining("Elemental Selenium");

        footText.should.equal(xFootText);
        expect(footText).to.equal(xFootText);
        assert.equal(footText, xFootText);
    });
    it("should display a page footer", async () => {
        const footerIsDisplayed = await InternetPage.footer.isDisplayed();
        console.log(`FOOTER IS DISPLAYED: ${footerIsDisplayed}`);
        footerIsDisplayed.should.be.true;
    });
    it("should have an exising header", async () => {
        const head = await InternetPage.heading;
        (await head.isExisting()).should.be.true;
    });
    it("should have an enabled subheader", async () => {
        const subhead = await InternetPage.subheading;
        (await subhead.isEnabled()).should.be.true;
    });
    it("should display the header in the viewport", async () =>{
        const head = await InternetPage.heading;
        var headIsInViewport = await head.isDisplayedInViewport();
        expect(headIsInViewport).to.be.true;
    });
    it("should display the footer outside of the viewport", async () =>{
        const foot = await InternetPage.footer;
        var footIsInViewport = await foot.isDisplayedInViewport();
        expect(footIsInViewport).to.be.false;
        foot.scrollIntoView();
        footIsInViewport = await foot.isDisplayedInViewport();
        expect(footIsInViewport).to.be.true;
    });
    it("should be able to click the first link", async () => {
        await InternetPage.clickFirstLink();
        await weExpect(browser).toHaveUrl(ABTestPage.url());
    });
});