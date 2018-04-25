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
        talkDialogPage.setTextInput('text');
        expect(talkDialogPage.getTextInput()).toMatch('text');
        talkDialogPage.languageSelectLastOption();
        talkDialogPage.toLanguageSelectLastOption();
        talkDialogPage.setDateInput('2000-12-31');
        expect(talkDialogPage.getDateInput()).toMatch('2000-12-31');
        talkDialogPage.setServerDateInput('2000-12-31');
        expect(talkDialogPage.getServerDateInput()).toMatch('2000-12-31');
        talkDialogPage.typeSelectLastOption();
        talkDialogPage.conversationSelectLastOption();
        talkDialogPage.translationSelectLastOption();
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
    textInput = element(by.css('input#field_text'));
    languageSelect = element(by.css('select#field_language'));
    toLanguageSelect = element(by.css('select#field_toLanguage'));
    dateInput = element(by.css('input#field_date'));
    serverDateInput = element(by.css('input#field_serverDate'));
    typeSelect = element(by.css('select#field_type'));
    conversationSelect = element(by.css('select#field_conversation'));
    translationSelect = element(by.css('select#field_translation'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    };

    getTextInput = function() {
        return this.textInput.getAttribute('value');
    };

    setLanguageSelect = function(language) {
        this.languageSelect.sendKeys(language);
    };

    getLanguageSelect = function() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    };

    languageSelectLastOption = function() {
        this.languageSelect.all(by.tagName('option')).last().click();
    };
    setToLanguageSelect = function(toLanguage) {
        this.toLanguageSelect.sendKeys(toLanguage);
    };

    getToLanguageSelect = function() {
        return this.toLanguageSelect.element(by.css('option:checked')).getText();
    };

    toLanguageSelectLastOption = function() {
        this.toLanguageSelect.all(by.tagName('option')).last().click();
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

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
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

    translationSelectLastOption = function() {
        this.translationSelect.all(by.tagName('option')).last().click();
    };

    translationSelectOption = function(option) {
        this.translationSelect.sendKeys(option);
    };

    getTranslationSelect = function() {
        return this.translationSelect;
    };

    getTranslationSelectedOption = function() {
        return this.translationSelect.element(by.css('option:checked')).getText();
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
