/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JustraduireTestModule } from '../../../test.module';
import { ConversationComponent } from '../../../../../../main/webapp/app/entities/conversation/conversation.component';
import { ConversationService } from '../../../../../../main/webapp/app/entities/conversation/conversation.service';
import { Conversation } from '../../../../../../main/webapp/app/entities/conversation/conversation.model';

describe('Component Tests', () => {

    describe('Conversation Management Component', () => {
        let comp: ConversationComponent;
        let fixture: ComponentFixture<ConversationComponent>;
        let service: ConversationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JustraduireTestModule],
                declarations: [ConversationComponent],
                providers: [
                    ConversationService
                ]
            })
            .overrideTemplate(ConversationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConversationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConversationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Conversation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.conversations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
