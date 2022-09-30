const internetPage = require('../pageobjects/internet.page');

describe('Page title test', () => {
    it('should find the expected page title', async () => {
        await internetPage.open();
        await internetPage.toBeLoaded();
        await browser.debug();

        const title = await browser.getTitle();
        console.log(`TITLE : '${title}'`);
        console.log(`EXPECT: '${testenv.title}'`);
        title.should.not.be.undefined;
        title.should.equal(testenv.title);
    });
});


