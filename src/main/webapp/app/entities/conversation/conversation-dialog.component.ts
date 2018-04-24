import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Conversation } from './conversation.model';
import { ConversationPopupService } from './conversation-popup.service';
import { ConversationService } from './conversation.service';

@Component({
    selector: 'jhi-conversation-dialog',
    templateUrl: './conversation-dialog.component.html'
})
export class ConversationDialogComponent implements OnInit {

    conversation: Conversation;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private conversationService: ConversationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conversation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conversationService.update(this.conversation));
        } else {
            this.subscribeToSaveResponse(
                this.conversationService.create(this.conversation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Conversation>>) {
        result.subscribe((res: HttpResponse<Conversation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Conversation) {
        this.eventManager.broadcast({ name: 'conversationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-conversation-popup',
    template: ''
})
export class ConversationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conversationPopupService: ConversationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conversationPopupService
                    .open(ConversationDialogComponent as Component, params['id']);
            } else {
                this.conversationPopupService
                    .open(ConversationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
