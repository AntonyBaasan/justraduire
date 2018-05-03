import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';

import { TranslationInfo } from './translationinfo.model';

export type EntityResponseType = HttpResponse<TranslationInfo>;

@Injectable()
export class TranslatorService {

    private resourceUrl =  SERVER_API_URL + 'api/translate';

    constructor(private http: HttpClient) { }

    translate(translationInfo: TranslationInfo): Observable<EntityResponseType> {
        return this.http.post<TranslationInfo>(this.resourceUrl, translationInfo, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        return res.clone({body: res.body});
    }
}
