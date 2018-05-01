import { BaseEntity } from './../../shared';

export const enum Language {
    'FRENCH',
    'ENGLISH'
}

export class Talk implements BaseEntity {
    constructor(
        public id?: number,
        public sourceText?: string,
        public targetText?: string,
        public sourceLanguage?: Language,
        public targetLanguage?: Language,
        public date?: any,
        public serverDate?: any,
        public conversation?: BaseEntity,
    ) {
    }
}
