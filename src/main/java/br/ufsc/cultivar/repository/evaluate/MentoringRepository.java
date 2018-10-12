package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.Mentoring;
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
public class MentoringRepository {
    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Mentoring mentoring){
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("mentoring")
            .usingGeneratedKeyColumns("cod_question")
            .execute(
                new MapSqlParameterSource("dsc_question", mentoring.getQuestion())
            );
    }

    public List<Mentoring> get(){
        return jdbcTemplate.query(
                "select * from mentoring",
                (rs, i) -> this.build(rs)
        );
    }

    public Mentoring get(Long codQuestion){
        return jdbcTemplate.query(
                "select * from mentoring where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion),
                this::build
        );
    }

    public void delete(Long codQuestion){
        jdbcTemplate.update(
                "delete from mentoring where cod_question=:cod_question",
                new MapSqlParameterSource("cod_question", codQuestion)
        );
    }

    private Mentoring build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Mentoring.builder()
                .codQuestion(rs.getLong("cod_question"))
                .question(rs.getString("dsc_question"))
                .build();
    }
}
