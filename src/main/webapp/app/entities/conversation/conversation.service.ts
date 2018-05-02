import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Conversation } from './conversation.model';
import { createRequestOption } from '../../shared';
import { Talk } from '../talk';

export type EntityResponseType = HttpResponse<Conversation>;

@Injectable()
export class ConversationService {

    private resourceUrl = SERVER_API_URL + 'api/conversations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(conversation: Conversation): Observable<EntityResponseType> {
        const copy = this.convert(conversation);
        return this.http.post<Conversation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(conversation: Conversation): Observable<EntityResponseType> {
        const copy = this.convert(conversation);
        return this.http.put<Conversation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Conversation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Conversation[]>> {
        const options = createRequestOption(req);
        return this.http.get<Conversation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Conversation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getConversationTalks(id: number): Observable<HttpResponse<Talk[]>> {
        const options = createRequestOption(id);
        return this.http.get<Talk[]>(this.resourceUrl + '/' + id + '/talks', { params: options, observe: 'response' })
            .map((res: HttpResponse<Talk[]>) => this.convertTalkArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Conversation = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Conversation[]>): HttpResponse<Conversation[]> {
        const jsonResponse: Conversation[] = res.body;
        const body: Conversation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    private convertTalkArrayResponse(res: HttpResponse<Talk[]>): HttpResponse<Talk[]> {
        const jsonResponse: Talk[] = res.body;
        const body: Talk[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Conversation.
     */
    private convertItemFromServer(conversation: Conversation): Conversation {
        const copy: Conversation = Object.assign({}, conversation);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(conversation.date);
        return copy;
    }

    /**
     * Convert a Conversation to a JSON which can be sent to the server.
     */
    private convert(conversation: Conversation): Conversation {
        const copy: Conversation = Object.assign({}, conversation);
        copy.date = this.dateUtils
            .convertLocalDateToServer(conversation.date);
        return copy;
    }
}
