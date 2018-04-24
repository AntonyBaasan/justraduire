import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';

@Component({
    selector: 'jhi-conversation-detail',
    templateUrl: './conversation-detail.component.html'
})
export class ConversationDetailComponent implements OnInit, OnDestroy {

    conversation: Conversation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private conversationService: ConversationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConversations();
    }

    load(id) {
        this.conversationService.find(id)
            .subscribe((conversationResponse: HttpResponse<Conversation>) => {
                this.conversation = conversationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConversations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'conversationListModification',
            (response) => this.load(this.conversation.id)
        );
    }
}
