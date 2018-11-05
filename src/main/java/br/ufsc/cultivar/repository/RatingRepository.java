package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Rating;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void createRatingOnEvent(Rating rating, String cpf, Long codEvent) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("rating")
                .usingColumns("vl_rating", "dsc_rating", "cod_cpf", "cod_event")
                .execute(getParams(rating, cpf, codEvent));
    }

    public void createRatingOnProject(Rating rating, String cpf, Long codProject) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("rating")
                .usingColumns("vl_rating", "dsc_rating", "cod_cpf", "cod_project")
                .execute(getParams(rating, cpf, codProject));
    }

    private SqlParameterSource getParams(Rating rating, String cpf, Long code) {
        return new MapSqlParameterSource()
                .addValue("vl_rating", rating.getGrade())
                .addValue("dsc_rating", rating.getComment())
                .addValue("cod_cpf", cpf)
                .addValue("cod_event", code)
                .addValue("cod_project", code);
    }

    public List<Rating> get(String cpf) {
        return jdbcTemplate.query(
                "select * from rating where cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_cpf", cpf),
                (rs, i) -> Rating.builder()
                        .comment(rs.getString("dsc_rating"))
                        .grade(rs.getInt("vl_rating"))
                        .build()
        );
    }
}
