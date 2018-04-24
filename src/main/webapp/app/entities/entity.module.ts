import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JustraduireConversationModule } from './conversation/conversation.module';
import { JustraduireTalkModule } from './talk/talk.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JustraduireConversationModule,
        JustraduireTalkModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JustraduireEntityModule {}
