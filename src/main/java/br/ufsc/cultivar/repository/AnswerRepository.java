package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Answer;
import br.ufsc.cultivar.model.Question;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AnswerRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(final Answer answer, final String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("answer")
                .execute(
                        new MapSqlParameterSource()
                            .addValue("cod_cpf", cpf)
                            .addValue("cod_question", answer.getQuestion().getCodQuestion())
                            .addValue("fl_answer", answer.getAnswer())
                            .addValue("dsc_answer", answer.getComment())
                );
    }

    public List<Answer> get(final String cpf) {
        return jdbcTemplate.query(
                "select * from answer where cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_cpf", cpf),
                (rs, i) -> Answer.builder()
                        .answer(rs.getBoolean("fl_answer"))
                        .comment(rs.getString("dsc_answer"))
                        .question(
                                Question.builder()
                                        .codQuestion(rs.getLong("cod_question"))
                                        .build()
                        )
                        .build()
        );
    }
}
