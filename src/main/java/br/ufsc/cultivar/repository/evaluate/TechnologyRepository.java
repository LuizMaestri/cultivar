package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.Technology;
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
public class TechnologyRepository {
    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Technology technology) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("technology")
                .usingGeneratedKeyColumns("cod_technology")
                .execute(
                        new MapSqlParameterSource("nm_technology", technology.getName())
                );
    }

    public List<Technology> get() {
        return jdbcTemplate.query("select * from technology", (rs, i) -> this.build(rs));
    }

    private Technology build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Technology.builder()
                .codTechnology(rs.getLong("cod_technology"))
                .name(rs.getString("nm_technology"))
                .build();
    }

    public void delete(Long codTechnology) {
        jdbcTemplate.update(
                "delete from technology where cod_technology=:cod_technology",
                new MapSqlParameterSource("cod_technology", codTechnology)
        );
    }

    public Technology get(Long codTechnology) {
        return jdbcTemplate.query(
                "select * from technology where cod_technology=:cod_technology",
                new MapSqlParameterSource("cod_technology", codTechnology),
                this::build
        );
    }
}
