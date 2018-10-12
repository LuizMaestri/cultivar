package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.Personality;
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

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PersonalityRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Personality question) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("personality")
                .usingGeneratedKeyColumns("cod_question")
                .execute(
                        new MapSqlParameterSource("dsc_question", question.getQuestion())
                );
    }

    public List<Personality> get() {
        return jdbcTemplate.query(
                "select * from personality",
                (rs, i) -> this.build(rs)
        );
    }

    public Personality get(Long codQuestion) {
        return jdbcTemplate.query(
                "select * from personality where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion),
                this::build
        );
    }

    private Personality build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Personality.builder()
                .codQuestion(rs.getLong("cod_question"))
                .question(rs.getString("dsc_question"))
                .build();
    }

    public void delete(Long codQuestion) {
        jdbcTemplate.update(
                "delete from personality where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion)
        );
    }
}
