import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TalkComponent } from './talk.component';
import { TalkDetailComponent } from './talk-detail.component';
import { TalkPopupComponent } from './talk-dialog.component';
import { TalkDeletePopupComponent } from './talk-delete-dialog.component';

export const talkRoute: Routes = [
    {
        path: 'talk',
        component: TalkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.talk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'talk/:id',
        component: TalkDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.talk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const talkPopupRoute: Routes = [
    {
        path: 'talk-new',
        component: TalkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.talk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'talk/:id/edit',
        component: TalkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.talk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'talk/:id/delete',
        component: TalkDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'justraduireApp.talk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
