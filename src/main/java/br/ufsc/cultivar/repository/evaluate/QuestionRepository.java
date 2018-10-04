package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.VolunteerQuestion;
import br.ufsc.cultivar.utils.DatabaseUtils;
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

//@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(VolunteerQuestion question) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("volunteer_question")
                .usingGeneratedKeyColumns("cod_question")
                .execute(
                        new MapSqlParameterSource("dsc_question", question.getQuestion())
                );
    }

    public List<VolunteerQuestion> get() {
        return jdbcTemplate.query(
                "select * from volunteer_question",
                (rs, i) -> this.build(rs)
        );
    }

    public VolunteerQuestion get(Long codQuestion) {
        return jdbcTemplate.query(
                "select * from volunteer_question where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion),
                this::build
        );
    }

    private VolunteerQuestion build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return VolunteerQuestion.builder()
                .codQuestion(rs.getLong("cod_question"))
                .question(rs.getString("dsc_question"))
                .build();
    }

    public void delete(Long codQuestion) {
        jdbcTemplate.update(
                "delete from volunteer_question where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion)
        );
    }
}
