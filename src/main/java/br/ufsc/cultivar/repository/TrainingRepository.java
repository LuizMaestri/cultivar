package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Training;
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
public class TrainingRepository {

    NamedParameterJdbcTemplate jdbcTemplate;


    public Long create(final Training training) {
        return new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("training")
                .usingGeneratedKeyColumns("cod_training")
                .executeAndReturnKey(
                        new MapSqlParameterSource()
                                .addValue("nm_training", training.getName())
                                .addValue("dsc_path", training.getPath())
                                .addValue("dsc_link", training.getLink())
                ).longValue();
    }

    public void associateTypeEvent(final Long codTraining, final Long tpEvent){
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("type_event_training")
            .execute(
                new MapSqlParameterSource("cod_training", codTraining)
                    .addValue("tp_event", tpEvent)
            );
    }

    public List<Training> getByTypeEvent(final Long tpEvent) {
        return jdbcTemplate.query(
                "select t.* from training t natural join type_event_training where tp_event=:tp_event",
                new MapSqlParameterSource("tp_event", tpEvent),
                (rs, i) -> this.build(rs)
        );
    }

    public List<Training> getByEvent(final Long codEvent) {
        return jdbcTemplate.query(
                "select t.* from training t natural join event_training where cod_event=:cod_event",
                new MapSqlParameterSource("cod_event", codEvent),
                (rs, i) -> this.build(rs)
        );
    }

    public Training get(final Long codTraining) {
        return jdbcTemplate.query(
                "select * from training where cod_training=:cod_training",
                new MapSqlParameterSource("cod_training", codTraining),
                this::build
        );
    }

    public void deleteByEvent(final Long tpEvent) {
        jdbcTemplate.update(
                "select * from training where tp_event=:tp_event",
                new MapSqlParameterSource("tp_event", tpEvent)
        );
    }



    private Training build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Training.builder()
                .codTraining(rs.getLong("cod_training"))
                .name(rs.getString("nm_training"))
                .path(rs.getString("dsc_path"))
                .link(rs.getString("dsc_link"))
                .build();
    }
}
