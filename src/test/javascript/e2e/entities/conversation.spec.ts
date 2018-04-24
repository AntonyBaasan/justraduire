import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Conversation e2e test', () => {

    let navBarPage: NavBarPage;
    let conversationDialogPage: ConversationDialogPage;
    let conversationComponentsPage: ConversationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Conversations', () => {
        navBarPage.goToEntity('conversation');
        conversationComponentsPage = new ConversationComponentsPage();
        expect(conversationComponentsPage.getTitle())
            .toMatch(/justraduireApp.conversation.home.title/);

    });

    it('should load create Conversation dialog', () => {
        conversationComponentsPage.clickOnCreateButton();
        conversationDialogPage = new ConversationDialogPage();
        expect(conversationDialogPage.getModalTitle())
            .toMatch(/justraduireApp.conversation.home.createOrEditLabel/);
        conversationDialogPage.close();
    });

    it('should create and save Conversations', () => {
        conversationComponentsPage.clickOnCreateButton();
        conversationDialogPage.setLocationInput('location');
        expect(conversationDialogPage.getLocationInput()).toMatch('location');
        conversationDialogPage.setDateInput('2000-12-31');
        expect(conversationDialogPage.getDateInput()).toMatch('2000-12-31');
        conversationDialogPage.setUserLoginInput('userLogin');
        expect(conversationDialogPage.getUserLoginInput()).toMatch('userLogin');
        conversationDialogPage.save();
        expect(conversationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ConversationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-conversation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ConversationDialogPage {
    modalTitle = element(by.css('h4#myConversationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    locationInput = element(by.css('input#field_location'));
    dateInput = element(by.css('input#field_date'));
    userLoginInput = element(by.css('input#field_userLogin'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLocationInput = function(location) {
        this.locationInput.sendKeys(location);
    };

    getLocationInput = function() {
        return this.locationInput.getAttribute('value');
    };

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setUserLoginInput = function(userLogin) {
        this.userLoginInput.sendKeys(userLogin);
    };

    getUserLoginInput = function() {
        return this.userLoginInput.getAttribute('value');
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
