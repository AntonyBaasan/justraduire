import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-conversation',
    templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit, OnDestroy {
conversations: Conversation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private conversationService: ConversationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.conversationService.query().subscribe(
            (res: HttpResponse<Conversation[]>) => {
                this.conversations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInConversations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Conversation) {
        return item.id;
    }
    registerChangeInConversations() {
        this.eventSubscriber = this.eventManager.subscribe('conversationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
