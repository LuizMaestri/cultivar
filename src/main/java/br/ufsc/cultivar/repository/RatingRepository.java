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

    public void create(Rating rating, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("rating")
                .usingColumns("vl_rating", "dsc_rating", "cod_cpf")
                .execute(getParams(rating, cpf));
    }

    public void create(Rating rating, Long codEvent) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("rating")
                .usingColumns("vl_rating", "dsc_rating", "cod_event")
                .execute(getParams(rating, codEvent));
    }

    private SqlParameterSource getParams(Rating rating, Object cod) {
        return new MapSqlParameterSource()
                .addValue("vl_rating", rating.getGrade())
                .addValue("dsc_rating", rating.getComment())
                .addValue("cod_cpf", cod)
                .addValue("cod_event", cod);
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

    public List<Rating> get(Long codEvent) {
        return jdbcTemplate.query(
                "select * from rating where cod_event=:cod_event",
                new MapSqlParameterSource("cod_event", codEvent),
                (rs, i) -> Rating.builder()
                        .comment(rs.getString("dsc_rating"))
                        .grade(rs.getInt("vl_rating"))
                        .build()
        );
    }
}
