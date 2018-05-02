import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { TalkService, Talk, Language } from '../entities/talk';
import { Conversation, ConversationService } from '../entities/conversation';
import { LANGUAGES } from '../shared';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-translator',
    templateUrl: './translator.component.html',
    styleUrls: ['translator.css']
})
export class TranslatorComponent implements OnInit {
    conversation: Conversation = { id: 1251 };
    inputText = '';
    sourceLanguage: Language = Language.ENGLISH;
    targetLanguage: Language = Language.FRENCH;

    talkHistory = [];

    constructor(private talkService: TalkService,
        private conversationService: ConversationService) { }

    ngOnInit() {
        this.getPreviousTalkHistory();
    }

    getPreviousTalkHistory() {
        this.conversationService.getConversationTalks(this.conversation.id).subscribe(
            (response) => {
                const talks = response.body;
                this.talkHistory = this.talkHistory.concat(talks);
            }
        );
    }

    keyDown(event) {
        if (event.keyCode === 13) {
            if (this.inputText) {
                this.handleInputText();
                this.inputText = '';
            }
        }
    }

    handleInputText() {
        const talk: Talk = {
            sourceText: this.inputText,
            sourceLanguage: this.sourceLanguage,
            targetLanguage: this.targetLanguage,
            date: this.getCurrentDate(),
            conversation: this.conversation
        };

        this.talkService
            .create(talk)
            .subscribe(
                (response) => this.onSaveSuccess(response),
                (response) => this.onSaveError(response)
            );
    }

    private getCurrentDate(): any {
        const date = new Date();
        return {
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getMonth()
        };
    }

    onSaveSuccess(response: HttpResponse<Talk>) {
        this.talkHistory.push(response.body);
        console.log('Save success: ', JSON.stringify(response));
    }

    onSaveError(response) {
        console.log('couldn\'t save: ', JSON.stringify(response));
    }
}
