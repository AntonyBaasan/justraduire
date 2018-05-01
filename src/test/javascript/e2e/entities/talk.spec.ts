import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Talk e2e test', () => {

    let navBarPage: NavBarPage;
    let talkDialogPage: TalkDialogPage;
    let talkComponentsPage: TalkComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Talks', () => {
        navBarPage.goToEntity('talk');
        talkComponentsPage = new TalkComponentsPage();
        expect(talkComponentsPage.getTitle())
            .toMatch(/justraduireApp.talk.home.title/);

    });

    it('should load create Talk dialog', () => {
        talkComponentsPage.clickOnCreateButton();
        talkDialogPage = new TalkDialogPage();
        expect(talkDialogPage.getModalTitle())
            .toMatch(/justraduireApp.talk.home.createOrEditLabel/);
        talkDialogPage.close();
    });

    it('should create and save Talks', () => {
        talkComponentsPage.clickOnCreateButton();
        talkDialogPage.setSourceTextInput('sourceText');
        expect(talkDialogPage.getSourceTextInput()).toMatch('sourceText');
        talkDialogPage.setTargetTextInput('targetText');
        expect(talkDialogPage.getTargetTextInput()).toMatch('targetText');
        talkDialogPage.sourceLanguageSelectLastOption();
        talkDialogPage.targetLanguageSelectLastOption();
        talkDialogPage.setDateInput('2000-12-31');
        expect(talkDialogPage.getDateInput()).toMatch('2000-12-31');
        talkDialogPage.setServerDateInput('2000-12-31');
        expect(talkDialogPage.getServerDateInput()).toMatch('2000-12-31');
        talkDialogPage.conversationSelectLastOption();
        talkDialogPage.save();
        expect(talkDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TalkComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-talk div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TalkDialogPage {
    modalTitle = element(by.css('h4#myTalkLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sourceTextInput = element(by.css('input#field_sourceText'));
    targetTextInput = element(by.css('input#field_targetText'));
    sourceLanguageSelect = element(by.css('select#field_sourceLanguage'));
    targetLanguageSelect = element(by.css('select#field_targetLanguage'));
    dateInput = element(by.css('input#field_date'));
    serverDateInput = element(by.css('input#field_serverDate'));
    conversationSelect = element(by.css('select#field_conversation'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSourceTextInput = function(sourceText) {
        this.sourceTextInput.sendKeys(sourceText);
    };

    getSourceTextInput = function() {
        return this.sourceTextInput.getAttribute('value');
    };

    setTargetTextInput = function(targetText) {
        this.targetTextInput.sendKeys(targetText);
    };

    getTargetTextInput = function() {
        return this.targetTextInput.getAttribute('value');
    };

    setSourceLanguageSelect = function(sourceLanguage) {
        this.sourceLanguageSelect.sendKeys(sourceLanguage);
    };

    getSourceLanguageSelect = function() {
        return this.sourceLanguageSelect.element(by.css('option:checked')).getText();
    };

    sourceLanguageSelectLastOption = function() {
        this.sourceLanguageSelect.all(by.tagName('option')).last().click();
    };
    setTargetLanguageSelect = function(targetLanguage) {
        this.targetLanguageSelect.sendKeys(targetLanguage);
    };

    getTargetLanguageSelect = function() {
        return this.targetLanguageSelect.element(by.css('option:checked')).getText();
    };

    targetLanguageSelectLastOption = function() {
        this.targetLanguageSelect.all(by.tagName('option')).last().click();
    };
    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setServerDateInput = function(serverDate) {
        this.serverDateInput.sendKeys(serverDate);
    };

    getServerDateInput = function() {
        return this.serverDateInput.getAttribute('value');
    };

    conversationSelectLastOption = function() {
        this.conversationSelect.all(by.tagName('option')).last().click();
    };

    conversationSelectOption = function(option) {
        this.conversationSelect.sendKeys(option);
    };

    getConversationSelect = function() {
        return this.conversationSelect;
    };

    getConversationSelectedOption = function() {
        return this.conversationSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
