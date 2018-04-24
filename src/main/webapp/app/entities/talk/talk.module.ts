import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JustraduireSharedModule } from '../../shared';
import {
    TalkService,
    TalkPopupService,
    TalkComponent,
    TalkDetailComponent,
    TalkDialogComponent,
    TalkPopupComponent,
    TalkDeletePopupComponent,
    TalkDeleteDialogComponent,
    talkRoute,
    talkPopupRoute,
} from './';

const ENTITY_STATES = [
    ...talkRoute,
    ...talkPopupRoute,
];

@NgModule({
    imports: [
        JustraduireSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TalkComponent,
        TalkDetailComponent,
        TalkDialogComponent,
        TalkDeleteDialogComponent,
        TalkPopupComponent,
        TalkDeletePopupComponent,
    ],
    entryComponents: [
        TalkComponent,
        TalkDialogComponent,
        TalkPopupComponent,
        TalkDeleteDialogComponent,
        TalkDeletePopupComponent,
    ],
    providers: [
        TalkService,
        TalkPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JustraduireTalkModule {}
