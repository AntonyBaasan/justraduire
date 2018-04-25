import { BaseEntity } from './../../shared';

export const enum Language {
    'FRENCH',
    'ENGLISH'
}

export const enum TalkType {
    'SPEECH',
    'TRANSLATION'
}

export class Talk implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public language?: Language,
        public toLanguage?: Language,
        public date?: any,
        public serverDate?: any,
        public type?: TalkType,
        public conversation?: BaseEntity,
        public translation?: BaseEntity,
    ) {
    }
}
