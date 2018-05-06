import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { JhiDateUtils } from 'ng-jhipster';

import { TalkService, Talk } from '../entities/talk';
import { Conversation, ConversationService } from '../entities/conversation';
import { LANGUAGES, Language } from '../shared';
import { HttpResponse } from '@angular/common/http';
import { TranslatorService } from './translator.service';

@Component({
    selector: 'jhi-translator',
    templateUrl: './translator.component.html',
    styleUrls: ['translator.css']
})
export class TranslatorComponent implements OnInit {
    allConversations: Conversation[] = [{ id: 1251 }];
    conversation: Conversation;
    inputText = '';
    sourceLanguage: Language = Language.ENGLISH;
    targetLanguage: Language = Language.FRENCH;
    availableLanguages: Language[] = [Language.ENGLISH, Language.FRENCH];
    currentLanguage: Language = Language.ENGLISH;

    constructor(private talkService: TalkService,
        private conversationService: ConversationService,
        private translatorService: TranslatorService,
        private jhiDateUtils: JhiDateUtils) { }

    ngOnInit() {
        this.getAllConversations();
        this.updateTalkHistory(this.conversation);
    }

    getAllConversations() {
        this.conversationService.query().subscribe((response) => {
            this.allConversations = response.body;
        }, () => { });
    }

    updateTalkHistory(conversation: Conversation) {
        if (!conversation) {
            return;
        }

        this.conversationService.getConversationTalks(this.conversation.id).subscribe(
            (response) => {
                const talks = response.body;
                this.conversation.talks = talks;
            }
        );
    }

    selectConversation(conversation: Conversation) {
        if (this.conversation !== conversation) {
            this.conversation = conversation;
            this.updateTalkHistory(this.conversation);
        }
    }

    keyDown(event) {
        if (event.keyCode !== 13) {
            return;
        }

        if (this.inputText && this.inputText.trim() !== '') {
            this.handleInputText();
            this.inputText = '';
        }

        event.preventDefault();
    }

    handleInputText() {
        const talk: Talk = {
            sourceText: this.inputText.trim(),
            sourceLanguage: this.sourceLanguage,
            targetLanguage: this.targetLanguage,
            date: this.ConvertJsDateToJhipster(new Date()),
            conversation: this.conversation
        };

        this.translatorService.translate({
            sourceText: talk.sourceText,
            sourceLanguage: talk.sourceLanguage,
            targetLanguage: talk.targetLanguage
        }).subscribe((translationResponse) => {
            talk.targetText = translationResponse.body.targetText;
            this.saveTalk(talk);
        }, () => {
            this.saveTalk(talk);
        });
    }

    private saveTalk(talk) {
        this.talkService
            .create(talk)
            .subscribe(
                (response) => this.onSaveSuccess(response),
                (response) => this.onSaveError(response)
            );
    }

    private ConvertJsDateToJhipster(date: any): any {
        return {
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getMonth()
        };
    }

    convertLanguageToString(l: Language) {
        if (l === Language.ENGLISH) { return 'Eng'; }
        if (l === Language.FRENCH) { return 'Fre'; }
        return 'Unknown';
    }

    onSaveSuccess(response: HttpResponse<Talk>) {
        const savedTalk = response.body;
        this.conversation.talks.push(savedTalk);
        console.log('Save success: ', JSON.stringify(response));

    }

    onSaveError(response) {
        console.log('couldn\'t save: ', JSON.stringify(response));
    }
}
