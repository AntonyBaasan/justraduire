import { BaseEntity } from './../../shared';

export class Conversation implements BaseEntity {
    constructor(
        public id?: number,
        public location?: string,
        public date?: any,
        public userLogin?: string,
        public talks?: BaseEntity[],
    ) {
    }
}
