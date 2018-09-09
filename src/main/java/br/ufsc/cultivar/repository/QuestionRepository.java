package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Question;
import br.ufsc.cultivar.model.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
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
public class QuestionRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(final Question question) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("question")
                .usingGeneratedKeyColumns("cod_question")
                .execute(
                        new MapSqlParameterSource("dsc_question", question.getQuestion())
                            .addValue("dsc_responds", question.getResponds().name())
                );
    }

    public List<Question> get() {
        return jdbcTemplate.query(
                "select * from question",
                (rs, i) -> this.build(rs)
        );
    }

    public List<Question> get(final Role responds) {
        return jdbcTemplate.query(
                "select * from question where dsc_responds=:dsc_responds",
                new MapSqlParameterSource("dsc_responds", responds.name()),
                (rs, i) -> this.build(rs)
        );
    }

    public Question get(final Long codQuestion) {
        return jdbcTemplate.query(
                "select * from question where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion),
                this::build
        );
    }

    public void delete(Long codQuestion) {
        jdbcTemplate.update(
                "delete from question where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion)
        );
    }

    public void update(Question question) {
        jdbcTemplate.update(
                "update question set dsc_question=:dsc_question where cod_question=:cod_question",
                new MapSqlParameterSource("dsc_question", question.getQuestion())
                        .addValue("cod_question", question.getQuestion())
        );
    }

    private Question build(ResultSet rs) throws SQLException {
        if (rs.isBeforeFirst()){
            rs.first();
        }
        return Question.builder()
                .codQuestion(rs.getLong("cod_question"))
                .question(rs.getString("dsc_question"))
                .responds(
                        Role.valueOf(rs.getString("dsc_responds"))
                )
                .build();
    }
}
