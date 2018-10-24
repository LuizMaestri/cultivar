package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.Activity;
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
public class ActivityRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public Long create(final String name){
        return new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("activity")
            .usingGeneratedKeyColumns("cod_activity")
            .executeAndReturnKey(
                new MapSqlParameterSource("nm_activity", name)
            ).longValue();
    }

    public List<Activity> get(){
        return jdbcTemplate.query(
            "select * from activity",
            (rs, i) -> Activity.builder()
                .name(
                    rs.getString("nm_user")
                ).codActivity(
                    rs.getLong("cod_activity")
                ).build()
        );
    }

    public Activity get(final Long codActivity){
        return jdbcTemplate.queryForObject(
            "select nm_activity from activity where cod_activity=:cod_activity",
            new MapSqlParameterSource("cod_activity", codActivity),
            (rs, i) -> Activity.builder()
                .codActivity(codActivity)
                .name(rs.getString("nm_activity"))
                .build()
        );
    }

    public void delete(final Long codActivity){
        jdbcTemplate.update(
            "delete from activity where cod_activity=:cod_activity",
            new MapSqlParameterSource("cod_activity", codActivity)
        );
    }
}
