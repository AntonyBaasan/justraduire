import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Talk } from './talk.model';
import { TalkPopupService } from './talk-popup.service';
import { TalkService } from './talk.service';
import { Conversation, ConversationService } from '../conversation';

@Component({
    selector: 'jhi-talk-dialog',
    templateUrl: './talk-dialog.component.html'
})
export class TalkDialogComponent implements OnInit {

    talk: Talk;
    isSaving: boolean;

    conversations: Conversation[];

    translations: Talk[];
    dateDp: any;
    serverDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private talkService: TalkService,
        private conversationService: ConversationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.conversationService.query()
            .subscribe((res: HttpResponse<Conversation[]>) => { this.conversations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.talkService
            .query({filter: 'talk-is-null'})
            .subscribe((res: HttpResponse<Talk[]>) => {
                if (!this.talk.translation || !this.talk.translation.id) {
                    this.translations = res.body;
                } else {
                    this.talkService
                        .find(this.talk.translation.id)
                        .subscribe((subRes: HttpResponse<Talk>) => {
                            this.translations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.talk.id !== undefined) {
            this.subscribeToSaveResponse(
                this.talkService.update(this.talk));
        } else {
            this.subscribeToSaveResponse(
                this.talkService.create(this.talk));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Talk>>) {
        result.subscribe((res: HttpResponse<Talk>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Talk) {
        this.eventManager.broadcast({ name: 'talkListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackConversationById(index: number, item: Conversation) {
        return item.id;
    }

    trackTalkById(index: number, item: Talk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-talk-popup',
    template: ''
})
export class TalkPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private talkPopupService: TalkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.talkPopupService
                    .open(TalkDialogComponent as Component, params['id']);
            } else {
                this.talkPopupService
                    .open(TalkDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
