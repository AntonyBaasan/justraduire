import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';

@Injectable()
export class ConversationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private conversationService: ConversationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.conversationService.find(id)
                    .subscribe((conversationResponse: HttpResponse<Conversation>) => {
                        const conversation: Conversation = conversationResponse.body;
                        if (conversation.date) {
                            conversation.date = {
                                year: conversation.date.getFullYear(),
                                month: conversation.date.getMonth() + 1,
                                day: conversation.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.conversationModalRef(component, conversation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.conversationModalRef(component, new Conversation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    conversationModalRef(component: Component, conversation: Conversation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.conversation = conversation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
