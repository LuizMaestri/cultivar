package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EvaluateRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void saveTechnology(AnswerTechnology answerTechnology, Long codEvent, Long codProject, String cpf) {
        val technology = answerTechnology.getTechnology();
        val answer = answerTechnology.getAnswer();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("answer_technology")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_technology", technology.getCodTechnology())
                                .addValue("cod_project", codProject)
                                .addValue("cod_event", codEvent)
                                .addValue("cod_cpf", cpf)
                                .addValue("dsc_answer", answer.name())
                );
    }

    public void savePersonality(AnswerPersonality answerPersonality, Long codEvent, Long codProject, String cpf) {
        val personality = answerPersonality.getPersonality();
        val answer = answerPersonality.getAnswer();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("answer_personality")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_question", personality.getCodQuestion())
                                .addValue("cod_event", codEvent)
                                .addValue("cod_cpf", cpf)
                                .addValue("dsc_answer", answer.name())
                );
    }

    public void saveExperience(Experience experience, Long codEvent, Long codProject, String cpf) {
        val difficulty = experience.getDifficulty();
        val enjoy = experience.getFlEnjoy();
        val expectation = experience.getExpectation();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("experience")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_project", codProject)
                                .addValue("cod_event", codEvent)
                                .addValue("cod_cpf", cpf)
                                .addValue("dsc_experience", experience.getExperience())
                                .addValue("dsc_difficulty", difficulty.name())
                                .addValue("fl_enjoy", enjoy.name())
                                .addValue("dsc_enjoy", experience.getEnjoy())
                                .addValue("dsc_not_enjoy", experience.getNotEnjoy())
                                .addValue("dsc_suggest", experience.getSuggest())
                                .addValue("dsc_expectation", expectation.name())
                );
    }

    public void saveSkill(Long codSkill, Long codEvent, Long codProject, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("skill_volunteer")
                .execute(
                        new MapSqlParameterSource()
                            .addValue("cod_skill", codSkill)
                            .addValue("cod_event", codEvent)
                            .addValue("cod_project", codProject)
                            .addValue("cod_cpf", cpf)
                );
    }

    public void saveMentoring(AnswerMentoring answerMentoring, Long codEvent, Long codProject, String cpf) {
        val mentoring = answerMentoring.getMentoring();
        val answer = answerMentoring.getAnswer();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("answer_mentoring")
                .usingColumns(
                        "cod_question",
                        "cod_event",
                        "cod_cpf",
                        "dsc_answer"
                ).execute(
                        new MapSqlParameterSource()
                                .addValue("cod_question", mentoring.getCodQuestion())
                                .addValue("cod_event", codEvent)
                                .addValue("cod_project", codProject)
                                .addValue("cod_cpf", cpf)
                                .addValue("dsc_answer", answer.name())
                );
    }

    public void saveMentoring(AnswerMentoring answerMentoring, Long codEvent, Long codProject, Long codSchool) {
        val mentoring = answerMentoring.getMentoring();
        val answer = answerMentoring.getAnswer();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("answer_mentoring")
                .usingColumns(
                        "cod_question",
                        "cod_event",
                        "cod_project",
                        "dsc_answer",
                        "cod_school"
                ).execute(
                        new MapSqlParameterSource()
                                .addValue("cod_question", mentoring.getCodQuestion())
                                .addValue("cod_event", codEvent)
                                .addValue("cod_project", codProject)
                                .addValue("cod_school", codSchool)
                                .addValue("dsc_answer", answer.name())
                );
    }

    public void saveAgain(Continue again, Long codEvent, Long codProject, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("continues")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("txt_comment", again.getComment())
                                .addValue("fl_interest", again.getInterest())
                                .addValue("cod_event", codEvent)
                                .addValue("cod_project", codProject)
                                .addValue("cod_cpf", cpf)
                );

    }

    public void saveActivity(Long codActivity, Long codEvent, Long codProject, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("activity_volunteer")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_activity", codActivity)
                                .addValue("cod_event", codEvent)
                                .addValue("cod_project", codProject)
                                .addValue("cod_cpf", cpf)
                );
    }

    public void saveActivity(Long codActivity, Long codEvent, Long codProject, Long codSchool) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("activity_school")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_activity", codActivity)
                                .addValue("cod_event", codEvent)
                                .addValue("cod_project", codProject)
                                .addValue("cod_school", codSchool)
                );
    }



    public List<String> getCpfs(Long codProject) {
        return jdbcTemplate.queryForList(
                "select cod_cpf from experience where cod_project=:cod_project",
                new MapSqlParameterSource("cod_project", codProject),
                String.class
        );
    }

    public List<AnswerPersonality> getAnswersVolunteer(Long codProject, String cpf) {
        return jdbcTemplate.query(
                "select av.dsc_answer, vq.* from answer_personality av natural join personality vq where cod_project=:cod_project and cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_project", codProject).addValue("cod_cpf", cpf),
                (rs, i) ->
                        AnswerPersonality.builder()
                                .personality(
                                        Personality.builder()
                                                .codQuestion(rs.getLong("cod_question"))
                                                .question(rs.getString("dsc_question"))
                                                .build()
                                ).answer(
                                AnswerAgreeEnum
                                        .valueOf(rs.getString("dsc_answer"))
                        ).build()
        );
    }

    public List<AnswerTechnology> getAnswersTechnologies(Long codProject, String cpf) {
        return jdbcTemplate.query(
                "select at.dsc_answer ,t.* from answer_technology at natural join technology t where cod_project=:cod_project and cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_project", codProject).addValue("cod_cpf", cpf),
                (rs, i) ->
                        AnswerTechnology.builder()
                                .technology(
                                        Technology.builder()
                                                .name("")
                                                .build()
                                )
                                .build()
        );
    }

    public void saveSuggest(String suggest, Long codSchool, Long codProject, Long codEvent) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("suggest_school")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("dsc_suggest", suggest)
                                .addValue("cod_event", codEvent)
                                .addValue("cod_project", codProject)
                                .addValue("cod_school", codSchool)
                );
    }
}
