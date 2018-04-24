/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JustraduireTestModule } from '../../../test.module';
import { TalkDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/talk/talk-delete-dialog.component';
import { TalkService } from '../../../../../../main/webapp/app/entities/talk/talk.service';

describe('Component Tests', () => {

    describe('Talk Management Delete Component', () => {
        let comp: TalkDeleteDialogComponent;
        let fixture: ComponentFixture<TalkDeleteDialogComponent>;
        let service: TalkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JustraduireTestModule],
                declarations: [TalkDeleteDialogComponent],
                providers: [
                    TalkService
                ]
            })
            .overrideTemplate(TalkDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TalkDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TalkService);
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
