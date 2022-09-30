const InternetPage = require('../../pageobjects/internet.page');
const ABTestPage = require('../../pageobjects/abtest.page');
const checkboxPage = require('../../pageobjects/checkbox.page');
const loginPage = require('../../pageobjects/login.page');
const hoversPage = require('../../pageobjects/hovers.page');
const keypressPage = require('../../pageobjects/keypress.page');
const multiWindowPage = require('../../pageobjects/multiwindow.page');
const newWindowPage = require('../../pageobjects/newwindow.page');
const iframePage = require('../../pageobjects/iframe.page');
const draganddropPage = require('../../pageobjects/draganddrop.page');
const dropdownPage = require('../../pageobjects/dropdown.page');
const jsalertsPage = require('../../pageobjects/jsalerts.page');
const logindata = require('../../../data/logindata');

describe('Testing element actions', () => {
    const noPause = true;
    const pauseMillis = 2000;

    const pause = async function(millis=pauseMillis) {
        if (noPause) return;
        await browser.pause(millis);
    }

    it('should click links to open the linked page', async () => {
        await InternetPage.open();
        await InternetPage.clickFirstLink(100);
        const pageUrl = await browser.getUrl();
        console.log(`PAGE URL: ${pageUrl}`);
        expect(pageUrl).to.equal(ABTestPage.url());
    });
    it('should have list item text', async () => {
        await InternetPage.open();
        var index = 4;
        var itemText = await InternetPage.nthListItemText(index);
        console.log(`ITEM ${index} TEXT: ${itemText}`);
        itemText.should.equal("Broken Images");
    });
    it('should scroll down to the footer', async () => {
        await InternetPage.open();
        await InternetPage.scrollToFooter();
        var pageFooter = await InternetPage.footer;
        weExpect(pageFooter).toBeDisplayedInViewport();
    });
    it('should click the checkboxes to check and uncheck', async () => {
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
    it.only('should enter values into login form fields', async () => {
        await InternetPage.open();
        await InternetPage.clickNthLink(21);
        await loginPage.toBeLoaded();
        var expectedUsername = logindata.username;
        await loginPage.enterUsername(expectedUsername);
        var expectedPassword = logindata.password;
        await loginPage.enterPassword(expectedPassword);
        var foundUsername = await (await loginPage.usernameField).getValue();
        var foundPassword = await (await loginPage.passwordField).getValue();
        console.log(`LOGIN FORM USER[${foundUsername}] PASS[${foundPassword}]`);
        await weExpect(loginPage.usernameField).toHaveValue(expectedUsername);
        await weExpect(loginPage.passwordField).toHaveValue(expectedPassword);
    });
    it('should clear values from login form fields', async () => {
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
    it('should hover over figures', async () => {
        await hoversPage.open();
        await hoversPage.toBeLoaded();
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
    it('should display key presses', async () => {
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
    it('should switch to a new browser tab', async () => {
        await multiWindowPage.open();
        await multiWindowPage.toBeLoaded();
        await multiWindowPage.clickLink('Click Here');
        await newWindowPage.switchWindow();
        await newWindowPage.toBeLoaded();
        weExpect(newWindowPage.header).toBeDisplayed();
        var headText = await newWindowPage.headerText();
        headText.should.equal(newWindowPage.expectedHeader);
        await multiWindowPage.switchWindow();
        await weExpect(multiWindowPage.header).toHaveText(multiWindowPage.expectedHeader);
    });
    it('should switch to an iframe', async () => {
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
        //await pause();
        await iframePage.sendTextToBody("  OK....");
        await iframePage.sendTextToBody('Enter');
        await iframePage.sendTextToBody("Now this text should appear on a new line$");
        //await pause();
        await iframePage.sendTextToBody('Backspace');
        await iframePage.sendTextToBody("!");
        //await pause(3000);
    });
    it.skip('should drag and drop', async () => {
        await draganddropPage.open();
        await draganddropPage.toBeLoaded();
        await pause();
        await draganddropPage.dragAtoB();
        await pause();
        await draganddropPage.dragBtoA();
        await pause(3000);
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
        await pause();
        weExpect(targetLabel).toHaveText('Drop here');
        await source.dragAndDrop(target);
        targetText = await targetLabel.getText();
        console.log(`TARGET TEXT END  : ${targetText}`);
        await pause();
        weExpect(targetLabel).toHaveText('Dropped!');
    });
    it('should select a choice in a drop-down menu', async () => {
        await dropdownPage.open();
        await dropdownPage.toBeLoaded();
        await dropdownPage.logAllMenuOptions();
        await dropdownPage.dropdownMenuSelectionShouldBe(dropdownPage.defaultDropdownMenuOption);
        await pause();
        await dropdownPage.clickDropdownMenu();
        await dropdownPage.logAllMenuOptions();
        await dropdownPage.logSelectedMenuOption();
        await dropdownPage.dropdownMenuSelectionShouldBe(dropdownPage.defaultDropdownMenuOption);
        await pause();
        await dropdownPage.clickDropdownMenuOption(2);
        await dropdownPage.logAllMenuOptions();
        await dropdownPage.logSelectedMenuOption();
        await dropdownPage.dropdownMenuSelectionShouldBe(dropdownPage.dropdownMenuOptionFor('Option 1'));
        await pause();
        await dropdownPage.clickDropdownMenuOptionFor('Option 2');
        await dropdownPage.logAllMenuOptions();
        await dropdownPage.logSelectedMenuOption();
        await dropdownPage.dropdownMenuSelectionShouldBe(dropdownPage.dropdownMenuOption(3));
        await pause();
        await dropdownPage.clickDropdownMenuOption(1);
        await dropdownPage.logAllMenuOptions();
        await dropdownPage.logSelectedMenuOption();
        await dropdownPage.dropdownMenuSelectionShouldBe(dropdownPage.dropdownMenuOptionFor('Option 2'));
        await pause(5000);
    });
    it('should show alerts', async () => {
        await jsalertsPage.open();
        await jsalertsPage.toBeLoaded();
        await jsalertsPage.logButtons();
        await jsalertsPage.logButtonFor('Alert');
        await jsalertsPage.logButton(2);
        await jsalertsPage.clickButtonFor('Alert');
        var alertText = await browser.getAlertText();
        console.log(`ALERT TEXT  : '${alertText}'`);
        alertText.should.equal('I am a JS Alert');
        await browser.acceptAlert();
        var resultText = await jsalertsPage.resultText();
        console.log(`RESULT TEXT : '${resultText}'`);
        resultText.should.equal('You successfully clicked an alert');
        await jsalertsPage.clickButtonFor('Confirm');
        var alertText = await browser.getAlertText();
        console.log(`CONFIRM TEXT: '${alertText}'`);
        alertText.should.equal('I am a JS Confirm');
        await browser.acceptAlert();
        var resultText = await jsalertsPage.resultText();
        console.log(`RESULT TEXT : '${resultText}'`);
        resultText.should.equal('You clicked: Ok');
        await jsalertsPage.clickButtonFor('Confirm');
        var alertText = await browser.getAlertText();
        console.log(`CONFIRM TEXT: '${alertText}'`);
        alertText.should.equal('I am a JS Confirm');
        await browser.dismissAlert();
        var resultText = await jsalertsPage.resultText();
        console.log(`RESULT TEXT : '${resultText}'`);
        resultText.should.equal('You clicked: Cancel');
        await jsalertsPage.clickButtonFor('Prompt');
        var alertText = await browser.getAlertText();
        console.log(`PROMPT TEXT : '${alertText}'`);
        alertText.should.equal('I am a JS prompt');
        var expectedText = "The quick brown fox jumped over the lazy dog.";
        await browser.sendAlertText(expectedText);
        await browser.acceptAlert();
        var resultText = await jsalertsPage.resultText();
        console.log(`RESULT TEXT : '${resultText}'`);
        resultText.should.equal(`You entered: ${expectedText}`);
        await jsalertsPage.clickButtonFor('Prompt');
        var alertText = await browser.getAlertText();
        console.log(`PROMPT TEXT : '${alertText}'`);
        alertText.should.equal('I am a JS prompt');
        var expectedText = "There once was a man from Nantucket.";
        await browser.dismissAlert();
        var resultText = await jsalertsPage.resultText();
        console.log(`RESULT TEXT : '${resultText}'`);
        resultText.should.equal('You entered: null');
    });
});