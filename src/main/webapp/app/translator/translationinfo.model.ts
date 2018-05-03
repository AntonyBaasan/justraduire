import { Language } from './../shared';

export class TranslationInfo {
    constructor(
        public sourceText: string,
        public targetText?: string,
        public sourceLanguage?: Language,
        public targetLanguage?: Language,
    ) {
    }
}
