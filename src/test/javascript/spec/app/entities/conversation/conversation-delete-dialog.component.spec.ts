/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JustraduireTestModule } from '../../../test.module';
import { ConversationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/conversation/conversation-delete-dialog.component';
import { ConversationService } from '../../../../../../main/webapp/app/entities/conversation/conversation.service';

describe('Component Tests', () => {

    describe('Conversation Management Delete Component', () => {
        let comp: ConversationDeleteDialogComponent;
        let fixture: ComponentFixture<ConversationDeleteDialogComponent>;
        let service: ConversationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JustraduireTestModule],
                declarations: [ConversationDeleteDialogComponent],
                providers: [
                    ConversationService
                ]
            })
            .overrideTemplate(ConversationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConversationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConversationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
