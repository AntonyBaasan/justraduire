package com.antonybaasan.justraduire.web.rest;

import com.antonybaasan.justraduire.JustraduireApp;

import com.antonybaasan.justraduire.domain.Talk;
import com.antonybaasan.justraduire.repository.TalkRepository;
import com.antonybaasan.justraduire.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.antonybaasan.justraduire.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.antonybaasan.justraduire.domain.enumeration.Language;
import com.antonybaasan.justraduire.domain.enumeration.Language;
/**
 * Test class for the TalkResource REST controller.
 *
 * @see TalkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JustraduireApp.class)
public class TalkResourceIntTest {

    private static final String DEFAULT_SOURCE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_TARGET_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TARGET_TEXT = "BBBBBBBBBB";

    private static final Language DEFAULT_SOURCE_LANGUAGE = Language.FRENCH;
    private static final Language UPDATED_SOURCE_LANGUAGE = Language.ENGLISH;

    private static final Language DEFAULT_TARGET_LANGUAGE = Language.FRENCH;
    private static final Language UPDATED_TARGET_LANGUAGE = Language.ENGLISH;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_SERVER_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SERVER_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TalkRepository talkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTalkMockMvc;

    private Talk talk;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TalkResource talkResource = new TalkResource(talkRepository);
        this.restTalkMockMvc = MockMvcBuilders.standaloneSetup(talkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Talk createEntity(EntityManager em) {
        Talk talk = new Talk()
            .sourceText(DEFAULT_SOURCE_TEXT)
            .targetText(DEFAULT_TARGET_TEXT)
            .sourceLanguage(DEFAULT_SOURCE_LANGUAGE)
            .targetLanguage(DEFAULT_TARGET_LANGUAGE)
            .date(DEFAULT_DATE)
            .serverDate(DEFAULT_SERVER_DATE);
        return talk;
    }

    @Before
    public void initTest() {
        talk = createEntity(em);
    }

    @Test
    @Transactional
    public void createTalk() throws Exception {
        int databaseSizeBeforeCreate = talkRepository.findAll().size();

        // Create the Talk
        restTalkMockMvc.perform(post("/api/talks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(talk)))
            .andExpect(status().isCreated());

        // Validate the Talk in the database
        List<Talk> talkList = talkRepository.findAll();
        assertThat(talkList).hasSize(databaseSizeBeforeCreate + 1);
        Talk testTalk = talkList.get(talkList.size() - 1);
        assertThat(testTalk.getSourceText()).isEqualTo(DEFAULT_SOURCE_TEXT);
        assertThat(testTalk.getTargetText()).isEqualTo(DEFAULT_TARGET_TEXT);
        assertThat(testTalk.getSourceLanguage()).isEqualTo(DEFAULT_SOURCE_LANGUAGE);
        assertThat(testTalk.getTargetLanguage()).isEqualTo(DEFAULT_TARGET_LANGUAGE);
        assertThat(testTalk.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTalk.getServerDate()).isEqualTo(DEFAULT_SERVER_DATE);
    }

    @Test
    @Transactional
    public void createTalkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = talkRepository.findAll().size();

        // Create the Talk with an existing ID
        talk.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTalkMockMvc.perform(post("/api/talks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(talk)))
            .andExpect(status().isBadRequest());

        // Validate the Talk in the database
        List<Talk> talkList = talkRepository.findAll();
        assertThat(talkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTalks() throws Exception {
        // Initialize the database
        talkRepository.saveAndFlush(talk);

        // Get all the talkList
        restTalkMockMvc.perform(get("/api/talks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(talk.getId().intValue())))
            .andExpect(jsonPath("$.[*].sourceText").value(hasItem(DEFAULT_SOURCE_TEXT.toString())))
            .andExpect(jsonPath("$.[*].targetText").value(hasItem(DEFAULT_TARGET_TEXT.toString())))
            .andExpect(jsonPath("$.[*].sourceLanguage").value(hasItem(DEFAULT_SOURCE_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].targetLanguage").value(hasItem(DEFAULT_TARGET_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].serverDate").value(hasItem(DEFAULT_SERVER_DATE.toString())));
    }

    @Test
    @Transactional
    public void getTalk() throws Exception {
        // Initialize the database
        talkRepository.saveAndFlush(talk);

        // Get the talk
        restTalkMockMvc.perform(get("/api/talks/{id}", talk.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(talk.getId().intValue()))
            .andExpect(jsonPath("$.sourceText").value(DEFAULT_SOURCE_TEXT.toString()))
            .andExpect(jsonPath("$.targetText").value(DEFAULT_TARGET_TEXT.toString()))
            .andExpect(jsonPath("$.sourceLanguage").value(DEFAULT_SOURCE_LANGUAGE.toString()))
            .andExpect(jsonPath("$.targetLanguage").value(DEFAULT_TARGET_LANGUAGE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.serverDate").value(DEFAULT_SERVER_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTalk() throws Exception {
        // Get the talk
        restTalkMockMvc.perform(get("/api/talks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTalk() throws Exception {
        // Initialize the database
        talkRepository.saveAndFlush(talk);
        int databaseSizeBeforeUpdate = talkRepository.findAll().size();

        // Update the talk
        Talk updatedTalk = talkRepository.findOne(talk.getId());
        // Disconnect from session so that the updates on updatedTalk are not directly saved in db
        em.detach(updatedTalk);
        updatedTalk
            .sourceText(UPDATED_SOURCE_TEXT)
            .targetText(UPDATED_TARGET_TEXT)
            .sourceLanguage(UPDATED_SOURCE_LANGUAGE)
            .targetLanguage(UPDATED_TARGET_LANGUAGE)
            .date(UPDATED_DATE)
            .serverDate(UPDATED_SERVER_DATE);

        restTalkMockMvc.perform(put("/api/talks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTalk)))
            .andExpect(status().isOk());

        // Validate the Talk in the database
        List<Talk> talkList = talkRepository.findAll();
        assertThat(talkList).hasSize(databaseSizeBeforeUpdate);
        Talk testTalk = talkList.get(talkList.size() - 1);
        assertThat(testTalk.getSourceText()).isEqualTo(UPDATED_SOURCE_TEXT);
        assertThat(testTalk.getTargetText()).isEqualTo(UPDATED_TARGET_TEXT);
        assertThat(testTalk.getSourceLanguage()).isEqualTo(UPDATED_SOURCE_LANGUAGE);
        assertThat(testTalk.getTargetLanguage()).isEqualTo(UPDATED_TARGET_LANGUAGE);
        assertThat(testTalk.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTalk.getServerDate()).isEqualTo(UPDATED_SERVER_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTalk() throws Exception {
        int databaseSizeBeforeUpdate = talkRepository.findAll().size();

        // Create the Talk

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTalkMockMvc.perform(put("/api/talks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(talk)))
            .andExpect(status().isCreated());

        // Validate the Talk in the database
        List<Talk> talkList = talkRepository.findAll();
        assertThat(talkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTalk() throws Exception {
        // Initialize the database
        talkRepository.saveAndFlush(talk);
        int databaseSizeBeforeDelete = talkRepository.findAll().size();

        // Get the talk
        restTalkMockMvc.perform(delete("/api/talks/{id}", talk.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Talk> talkList = talkRepository.findAll();
        assertThat(talkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Talk.class);
        Talk talk1 = new Talk();
        talk1.setId(1L);
        Talk talk2 = new Talk();
        talk2.setId(talk1.getId());
        assertThat(talk1).isEqualTo(talk2);
        talk2.setId(2L);
        assertThat(talk1).isNotEqualTo(talk2);
        talk1.setId(null);
        assertThat(talk1).isNotEqualTo(talk2);
    }
}
