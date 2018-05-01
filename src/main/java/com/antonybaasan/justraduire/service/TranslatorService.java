package com.antonybaasan.justraduire.service;

import com.antonybaasan.justraduire.service.dto.TranslationInfo;

public class TranslatorService {

    public String translate(TranslationInfo translationInfo){
        String translation = "\"" + translationInfo.getSourceText() +"\" is translated!!";

        return translation;
    }
}
