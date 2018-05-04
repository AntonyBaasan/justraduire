import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';

import { JustraduireSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { TranslatorComponent, TranslatorService } from '../translator';

@NgModule({
    imports: [
        JustraduireSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatRadioModule
    ],
    declarations: [
        HomeComponent,
        TranslatorComponent,
    ],
    entryComponents: [
    ],
    providers: [
        TranslatorService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JustraduireHomeModule {}
