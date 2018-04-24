package com.antonybaasan.justraduire.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.antonybaasan.justraduire.domain.Talk;

import com.antonybaasan.justraduire.repository.TalkRepository;
import com.antonybaasan.justraduire.web.rest.errors.BadRequestAlertException;
import com.antonybaasan.justraduire.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Talk.
 */
@RestController
@RequestMapping("/api")
public class TalkResource {

    private final Logger log = LoggerFactory.getLogger(TalkResource.class);

    private static final String ENTITY_NAME = "talk";

    private final TalkRepository talkRepository;

    public TalkResource(TalkRepository talkRepository) {
        this.talkRepository = talkRepository;
    }

    /**
     * POST  /talks : Create a new talk.
     *
     * @param talk the talk to create
     * @return the ResponseEntity with status 201 (Created) and with body the new talk, or with status 400 (Bad Request) if the talk has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/talks")
    @Timed
    public ResponseEntity<Talk> createTalk(@RequestBody Talk talk) throws URISyntaxException {
        log.debug("REST request to save Talk : {}", talk);
        if (talk.getId() != null) {
            throw new BadRequestAlertException("A new talk cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Talk result = talkRepository.save(talk);
        return ResponseEntity.created(new URI("/api/talks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /talks : Updates an existing talk.
     *
     * @param talk the talk to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated talk,
     * or with status 400 (Bad Request) if the talk is not valid,
     * or with status 500 (Internal Server Error) if the talk couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/talks")
    @Timed
    public ResponseEntity<Talk> updateTalk(@RequestBody Talk talk) throws URISyntaxException {
        log.debug("REST request to update Talk : {}", talk);
        if (talk.getId() == null) {
            return createTalk(talk);
        }
        Talk result = talkRepository.save(talk);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, talk.getId().toString()))
            .body(result);
    }

    /**
     * GET  /talks : get all the talks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of talks in body
     */
    @GetMapping("/talks")
    @Timed
    public List<Talk> getAllTalks() {
        log.debug("REST request to get all Talks");
        return talkRepository.findAll();
        }

    /**
     * GET  /talks/:id : get the "id" talk.
     *
     * @param id the id of the talk to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the talk, or with status 404 (Not Found)
     */
    @GetMapping("/talks/{id}")
    @Timed
    public ResponseEntity<Talk> getTalk(@PathVariable Long id) {
        log.debug("REST request to get Talk : {}", id);
        Talk talk = talkRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(talk));
    }

    /**
     * DELETE  /talks/:id : delete the "id" talk.
     *
     * @param id the id of the talk to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/talks/{id}")
    @Timed
    public ResponseEntity<Void> deleteTalk(@PathVariable Long id) {
        log.debug("REST request to delete Talk : {}", id);
        talkRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
