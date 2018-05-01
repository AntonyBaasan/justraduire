package com.antonybaasan.justraduire.web.rest;

import com.antonybaasan.justraduire.domain.TranslationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TranslatorResource {

    @RequestMapping("/translate")
    public String translate(@RequestBody TranslationInfo translationInfo) {

        String translation = "\"" + translationInfo.getSourceText() +"\" is translated!!";

        return translation;
    }
}
