/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JustraduireTestModule } from '../../../test.module';
import { ConversationDetailComponent } from '../../../../../../main/webapp/app/entities/conversation/conversation-detail.component';
import { ConversationService } from '../../../../../../main/webapp/app/entities/conversation/conversation.service';
import { Conversation } from '../../../../../../main/webapp/app/entities/conversation/conversation.model';

describe('Component Tests', () => {

    describe('Conversation Management Detail Component', () => {
        let comp: ConversationDetailComponent;
        let fixture: ComponentFixture<ConversationDetailComponent>;
        let service: ConversationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JustraduireTestModule],
                declarations: [ConversationDetailComponent],
                providers: [
                    ConversationService
                ]
            })
            .overrideTemplate(ConversationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConversationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConversationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Conversation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.conversation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
