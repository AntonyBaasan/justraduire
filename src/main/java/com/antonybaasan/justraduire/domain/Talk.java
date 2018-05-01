package com.antonybaasan.justraduire.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.antonybaasan.justraduire.domain.enumeration.Language;

/**
 * A Talk.
 */
@Entity
@Table(name = "talk")
public class Talk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "source_text")
    private String sourceText;

    @Column(name = "target_text")
    private String targetText;

    @Enumerated(EnumType.STRING)
    @Column(name = "source_language")
    private Language sourceLanguage;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_language")
    private Language targetLanguage;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "server_date")
    private LocalDate serverDate;

    @ManyToOne
    private Conversation conversation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceText() {
        return sourceText;
    }

    public Talk sourceText(String sourceText) {
        this.sourceText = sourceText;
        return this;
    }

    public void setSourceText(String sourceText) {
        this.sourceText = sourceText;
    }

    public String getTargetText() {
        return targetText;
    }

    public Talk targetText(String targetText) {
        this.targetText = targetText;
        return this;
    }

    public void setTargetText(String targetText) {
        this.targetText = targetText;
    }

    public Language getSourceLanguage() {
        return sourceLanguage;
    }

    public Talk sourceLanguage(Language sourceLanguage) {
        this.sourceLanguage = sourceLanguage;
        return this;
    }

    public void setSourceLanguage(Language sourceLanguage) {
        this.sourceLanguage = sourceLanguage;
    }

    public Language getTargetLanguage() {
        return targetLanguage;
    }

    public Talk targetLanguage(Language targetLanguage) {
        this.targetLanguage = targetLanguage;
        return this;
    }

    public void setTargetLanguage(Language targetLanguage) {
        this.targetLanguage = targetLanguage;
    }

    public LocalDate getDate() {
        return date;
    }

    public Talk date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getServerDate() {
        return serverDate;
    }

    public Talk serverDate(LocalDate serverDate) {
        this.serverDate = serverDate;
        return this;
    }

    public void setServerDate(LocalDate serverDate) {
        this.serverDate = serverDate;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public Talk conversation(Conversation conversation) {
        this.conversation = conversation;
        return this;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Talk talk = (Talk) o;
        if (talk.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), talk.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Talk{" +
            "id=" + getId() +
            ", sourceText='" + getSourceText() + "'" +
            ", targetText='" + getTargetText() + "'" +
            ", sourceLanguage='" + getSourceLanguage() + "'" +
            ", targetLanguage='" + getTargetLanguage() + "'" +
            ", date='" + getDate() + "'" +
            ", serverDate='" + getServerDate() + "'" +
            "}";
    }
}
