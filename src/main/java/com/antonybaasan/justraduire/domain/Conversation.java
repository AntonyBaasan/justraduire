package com.antonybaasan.justraduire.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Conversation.
 */
@Entity
@Table(name = "conversation")
public class Conversation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "location")
    private String location;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "user_login")
    private String userLogin;

    @OneToMany(mappedBy = "conversation")
    @JsonIgnore
    private Set<Talk> talks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public Conversation location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getDate() {
        return date;
    }

    public Conversation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public Conversation userLogin(String userLogin) {
        this.userLogin = userLogin;
        return this;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Set<Talk> getTalks() {
        return talks;
    }

    public Conversation talks(Set<Talk> talks) {
        this.talks = talks;
        return this;
    }

    public Conversation addTalks(Talk talk) {
        this.talks.add(talk);
        talk.setConversation(this);
        return this;
    }

    public Conversation removeTalks(Talk talk) {
        this.talks.remove(talk);
        talk.setConversation(null);
        return this;
    }

    public void setTalks(Set<Talk> talks) {
        this.talks = talks;
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
        Conversation conversation = (Conversation) o;
        if (conversation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conversation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Conversation{" +
            "id=" + getId() +
            ", location='" + getLocation() + "'" +
            ", date='" + getDate() + "'" +
            ", userLogin='" + getUserLogin() + "'" +
            "}";
    }
}
