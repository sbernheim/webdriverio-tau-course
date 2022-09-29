const InternetPage = require('../pageobjects/internet.page');
const ABTestPage = require('../pageobjects/abtest.page');
const checkboxPage = require('../pageobjects/checkbox.page');
const loginPage = require('../pageobjects/login.page');
const hoversPage = require('../pageobjects/hovers.page');
const keypressPage = require('../pageobjects/keypress.page');
const multiWindowPage = require('../pageobjects/multiwindow.page');
const newWindowPage = require('../pageobjects/newwindow.page');
const iframePage = require('../pageobjects/iframe.page');
const draganddropPage = require('../pageobjects/draganddrop.page');

describe('Testing element actions', () => {
    it.skip('should click links to open the linked page', async () => {
        await InternetPage.open();
        await InternetPage.clickFirstLink(100);
        const pageUrl = await browser.getUrl();
        console.log(`PAGE URL: ${pageUrl}`);
        expect(pageUrl).to.equal(ABTestPage.url());
    });
    it.skip('should have list item text', async () => {
        await InternetPage.open();
        var index = 4;
        var itemText = await InternetPage.nthListItemText(index);
        console.log(`ITEM ${index} TEXT: ${itemText}`);
        itemText.should.equal("Broken Images");
    });
    it.skip('should scroll down to the footer', async () => {
        await InternetPage.open();
        await InternetPage.scrollToFooter();
        var pageFooter = await InternetPage.footer;
        weExpect(pageFooter).toBeDisplayedInViewport();
    });
    it.skip('should click the checkboxes to check and uncheck', async () => {
        await checkboxPage.open();
        await weExpect(checkboxPage.firstCheckbox).not.toBeSelected();
        await weExpect(checkboxPage.lastCheckbox).toBeSelected();
        var index = 1;
        await checkboxPage.clickCheckbox(index);
        var box = await checkboxPage.checkbox(index);
        var boxIsSelected = await box.isSelected();
        console.log(`BOX ${index} SELECTED: ${boxIsSelected}`);
        expect(boxIsSelected).to.be.true;
        await box.click();
        boxIsSelected = await box.isSelected();
        expect(boxIsSelected).to.be.false;
        boxIsSelected = await checkboxPage.lastCheckbox.isSelected();
        expect(boxIsSelected).to.be.true;
        await checkboxPage.lastCheckbox.click();
        expect(await checkboxPage.lastCheckbox.isSelected()).to.be.false;
    });
    it.skip('should enter values into login form fields', async () => {
        await InternetPage.open();
        await InternetPage.clickNthLink(21);
        await loginPage.toBeLoaded();
        var expectedUsername = 'tomsmith';
        await loginPage.enterUsername(expectedUsername);
        var expectedPassword = 'SuperSecretPassword!'
        await loginPage.enterPassword(expectedPassword);
        var foundUsername = await (await loginPage.usernameField).getValue();
        var foundPassword = await (await loginPage.passwordField).getValue();
        console.log(`LOGIN FORM USER[${foundUsername}] PASS[${foundPassword}]`);
        await weExpect(loginPage.usernameField).toHaveValue(expectedUsername);
        await weExpect(loginPage.passwordField).toHaveValue(expectedPassword);
    });
    it.skip('should clear values from login form fields', async () => {
        await InternetPage.open();
        await InternetPage.clickLink("Form Authentication", 3000);
        await loginPage.toBeLoaded();
        var expectedUsername = 'tomsmith';
        await loginPage.enterUsername(expectedUsername);
        var expectedPassword = 'SuperSecretPassword!'
        await loginPage.enterPassword(expectedPassword);
        var foundUsername = await (await loginPage.usernameField).getValue();
        var foundPassword = await (await loginPage.passwordField).getValue();
        console.log(`BEFORE CLEAR LOGIN FORM USER[${foundUsername}] PASS[${foundPassword}]`);
        await loginPage.clearLoginForm();
        foundUsername = await (await loginPage.usernameField).getValue();
        foundPassword = await (await loginPage.passwordField).getValue();
        console.log(`-AFTER CLEAR LOGIN FORM USER[${foundUsername}] PASS[${foundPassword}]`);
        await weExpect(loginPage.usernameField).toHaveValue('');
        await weExpect(loginPage.passwordField).toHaveValue('');
    });
    it.skip('should hover over figures', async () => {
        await hoversPage.open();
        await hoversPage.toBeLoaded();
        /*var figures = await hoversPage.figures;
        await figures.map(async (f) => {
            await f.waitForDisplayed();
            await f.moveTo();
            await browser.pause(2000);
        });*/
        for (var i = 1; i <=3; i++) {
            var fig = await hoversPage.figure(i);
            //var cap = await hoversPage.captionFor(fig);
            var cap = await hoversPage.figureCaption(i);
            var capIsDisplayed = await cap.isDisplayed();
            console.log(`HIDDN CAPTION ${i} IS DISPLAYED: ${capIsDisplayed}`)
            var name = await hoversPage.figureName(i);
            var nameIsDisplayed = await name.isDisplayed();
            console.log(`HIDDN FIGNAME ${i} IS DISPLAYED: ${nameIsDisplayed}`)
            await weExpect(cap).not.toBeDisplayed();
            //await fig.moveTo();
            await hoversPage.moveToFigure(i);
            //var capIsDisplayed = await cap.isDisplayed();
            capIsDisplayed = await hoversPage.figureCaptionIsDisplayed(i);
            console.log(`FOUND CAPTION ${i} IS DISPLAYED: ${capIsDisplayed}`)
            //var nameIsDisplayed = await name.isDisplayed();
            nameIsDisplayed = await hoversPage.figureNameIsDisplayed(i);
            console.log(`FOUND FIGNAME ${i} IS DISPLAYED: ${nameIsDisplayed}`)
            await weExpect(cap).toBeDisplayed();
            await weExpect(name).toBeDisplayed();
            var capText = await cap.getText();
            console.log(`FOUND CAPTION ${i} TEXT:\n ${capText}`);
            var nameText = await name.getText();
            console.log(`FOUND FIGNAME ${i} TEXT:\n ${nameText}`);
        }
    });
    it.skip('should display key presses', async () => {
        await keypressPage.open();
        await keypressPage.toBeLoaded();
        var result = await keypressPage.result;
        weExpect(result).not.toBeDisplayed();

        await browser.keys('Delete');
        await weExpect(result).toBeDisplayed();
        var resultKey = await keypressPage.resultKey();
        console.log(`RESULT KEY : ${resultKey}`)
        resultKey.should.equal('DELETE');

        await browser.keys('THROW');
        await weExpect(result).toBeDisplayed();
        var resultKey = await keypressPage.resultKey();
        console.log(`RESULT KEY : ${resultKey}`)
        resultKey.should.equal('W');

        await browser.keys('MAX');
        await weExpect(result).toBeDisplayed();
        var resultKey = await keypressPage.resultKey();
        console.log(`RESULT KEY : ${resultKey}`)
        resultKey.should.equal('X');

        await browser.keys('Space');
        await weExpect(result).toBeDisplayed();
        var resultKey = await keypressPage.resultKey();
        console.log(`RESULT KEY : ${resultKey}`)
        resultKey.should.equal('SPACE');
    });
    it.skip('should switch to a new browser tab', async () => {
        await multiWindowPage.open();
        await multiWindowPage.toBeLoaded();
        await browser.pause(2000);
        await multiWindowPage.clickLink('Click Here');
        await browser.pause(3000);
        await newWindowPage.switchToWindow();
        await newWindowPage.toBeLoaded();
        weExpect(newWindowPage.header).toBeDisplayed();
        var headText = await newWindowPage.headerText();
        headText.should.equal("New Window");
        await browser.pause(3000);
    });
    it.skip('should switch to an iframe', async () => {
        await iframePage.open();
        await iframePage.toBeLoaded();
        await iframePage.headerToBeDisplayed();
        await iframePage.iframeToBeDisplayed();
        weExpect(iframePage.iframe).toBeDisplayed();
        await iframePage.switchToIframe();
        await iframePage.focusOnBody();
        await iframePage.clearBodyText();
        var expectedText = "The quick brown fox jumped over the lazy dog.";
        await iframePage.sendTextToBody(expectedText);
        var foundText = await iframePage.getBodyText();
        console.log(`FOUND BODY TEXT: ${foundText}`);
        weExpect(iframePage.iframeBody).toHaveText(expectedText);
        //await browser.pause(2000);
        await iframePage.sendTextToBody("  OK....");
        await iframePage.sendTextToBody('Enter');
        await iframePage.sendTextToBody("Now this text should appear on a new line$");
        //await browser.pause(2000);
        await iframePage.sendTextToBody('Backspace');
        await iframePage.sendTextToBody("!");
        //await browser.pause(3000);
    });
    it.skip('should drag and drop', async () => {
        await draganddropPage.open();
        await draganddropPage.toBeLoaded();
        await browser.pause(2000);
        await draganddropPage.dragAtoB();
        await browser.pause(3000);
        await draganddropPage.dragBtoA();
        await browser.pause(3000);
    });
    it('should drag and drop elsewhere', async () => {
        await browser.url('https://crossbrowsertesting.github.io/drag-and-drop.html');
        var source = await $('#draggable');
        var target = await $('#droppable');
        var targetLabel = await $('#droppable p');
        await source.waitForDisplayed();
        await target.waitForDisplayed();
        await targetLabel.waitForDisplayed();
        var targetText = await targetLabel.getText();
        console.log(`TARGET TEXT START: ${targetText}`);
        await browser.pause(2000);
        weExpect(targetLabel).toHaveText('Drop here');
        await source.dragAndDrop(target);
        targetText = await targetLabel.getText();
        console.log(`TARGET TEXT END  : ${targetText}`);
        await browser.pause(2000);
        weExpect(targetLabel).toHaveText('Dropped!');
    });
});