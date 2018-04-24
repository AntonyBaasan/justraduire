import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ConversationComponent } from './conversation.component';
import { ConversationDetailComponent } from './conversation-detail.component';
import { ConversationPopupComponent } from './conversation-dialog.component';
import { ConversationDeletePopupComponent } from './conversation-delete-dialog.component';

export const conversationRoute: Routes = [
    {
        path: 'conversation',
        component: ConversationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'conversation/:id',
        component: ConversationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conversationPopupRoute: Routes = [
    {
        path: 'conversation-new',
        component: ConversationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conversation/:id/edit',
        component: ConversationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'conversation/:id/delete',
        component: ConversationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
