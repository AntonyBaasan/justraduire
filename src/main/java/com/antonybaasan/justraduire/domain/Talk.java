package com.antonybaasan.justraduire.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.antonybaasan.justraduire.domain.enumeration.Language;

import com.antonybaasan.justraduire.domain.enumeration.TalkType;

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

    @Column(name = "text")
    private String text;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @Enumerated(EnumType.STRING)
    @Column(name = "to_language")
    private Language toLanguage;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "server_date")
    private LocalDate serverDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TalkType type;

    @ManyToOne
    private Conversation conversation;

    @OneToOne
    @JoinColumn(unique = true)
    private Talk translation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Talk text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Language getLanguage() {
        return language;
    }

    public Talk language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Language getToLanguage() {
        return toLanguage;
    }

    public Talk toLanguage(Language toLanguage) {
        this.toLanguage = toLanguage;
        return this;
    }

    public void setToLanguage(Language toLanguage) {
        this.toLanguage = toLanguage;
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

    public TalkType getType() {
        return type;
    }

    public Talk type(TalkType type) {
        this.type = type;
        return this;
    }

    public void setType(TalkType type) {
        this.type = type;
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

    public Talk getTranslation() {
        return translation;
    }

    public Talk translation(Talk talk) {
        this.translation = talk;
        return this;
    }

    public void setTranslation(Talk talk) {
        this.translation = talk;
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
            ", text='" + getText() + "'" +
            ", language='" + getLanguage() + "'" +
            ", toLanguage='" + getToLanguage() + "'" +
            ", date='" + getDate() + "'" +
            ", serverDate='" + getServerDate() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
