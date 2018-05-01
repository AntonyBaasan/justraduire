package com.antonybaasan.justraduire.web.rest;

import com.antonybaasan.justraduire.service.TranslatorService;
import com.antonybaasan.justraduire.service.dto.TranslationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class TranslatorResource {

    private final Logger log = LoggerFactory.getLogger(TranslatorResource.class);

    private final TranslatorService translatorService;

    public TranslatorResource(TranslatorService translatorService) {
        this.translatorService = translatorService;
    }

    @RequestMapping("/translate")
    public String translate(@RequestBody TranslationInfo translationInfo) {
        log.debug("REST request to save Translator : {}", translationInfo);

        return translatorService.translate(translationInfo);
    }
}
