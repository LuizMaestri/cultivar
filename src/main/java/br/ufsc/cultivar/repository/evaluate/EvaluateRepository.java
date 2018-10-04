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

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EvaluateRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void saveTechnology(AnswerTechnology answerTechnology, Long codProject, String cpf) {
        val technology = answerTechnology.getTechnology();
        val answer = answerTechnology.getAnswer();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("answer_technology")
            .execute(
                new MapSqlParameterSource()
                    .addValue("cod_technology", technology.getCodTechnology())
                    .addValue("cod_project", codProject)
                    .addValue("cod_cpf", cpf)
                    .addValue("dsc_answer", answer.name())
            );
    }

    public void saveAnswerVolunteer(AnswerVolunteer answerVolunteer, Long codProject, String cpf) {
        val question = answerVolunteer.getQuestion();
        val answer = answerVolunteer.getAnswer();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("answer_technology")
            .execute(
                new MapSqlParameterSource()
                    .addValue("cod_question", question.getCodQuestion())
                    .addValue("cod_project", codProject)
                    .addValue("cod_cpf", cpf)
                    .addValue("dsc_answer", answer.name())
            );
    }

    public void saveExperience(Experience experience, Long codProject, String cpf) {
        val difficulty = experience.getDifficulty();
        val enjoy = experience.getFlEnjoy();
        val expectation = experience.getExpectation();
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("experience")
            .execute(
                new MapSqlParameterSource()
                    .addValue("cod_project", codProject)
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

    public List<String> getCpfs(Long codProject) {
        return jdbcTemplate.queryForList(
                "select cod_cpf from experience where cod_project=:cod_project",
                new MapSqlParameterSource("cod_project", codProject),
                String.class
        );
    }

    public List<AnswerVolunteer> getAnswersVolunteer(Long codProject, String cpf) {
        return jdbcTemplate.query(
                "select av.dsc_answer, vq.* from answer_volunteer av natural join volunteer_question vq where cod_project=:cod_project and cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_project", codProject).addValue("cod_cpf", cpf),
                (rs, i) ->
                    AnswerVolunteer.builder()
                        .question(
                            VolunteerQuestion.builder()
                                .codQuestion(rs.getLong("cod_question"))
                                .question(rs.getString("dsc_question"))
                                .build()
                        ).answer(
                            AnswerVolunteerEnum
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
}
