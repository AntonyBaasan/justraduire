import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Talk } from './talk.model';
import { TalkService } from './talk.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-talk',
    templateUrl: './talk.component.html'
})
export class TalkComponent implements OnInit, OnDestroy {
talks: Talk[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private talkService: TalkService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.talkService.query().subscribe(
            (res: HttpResponse<Talk[]>) => {
                this.talks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTalks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Talk) {
        return item.id;
    }
    registerChangeInTalks() {
        this.eventSubscriber = this.eventManager.subscribe('talkListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
