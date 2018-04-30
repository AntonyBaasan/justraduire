import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JustraduireSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { TranslatorComponent } from '../translator';

@NgModule({
    imports: [
        JustraduireSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        TranslatorComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JustraduireHomeModule {}
