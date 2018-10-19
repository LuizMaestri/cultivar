package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Project;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.utils.DatabaseUtils;
import javafx.scene.chart.PieChartBuilder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeEventRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public Long create(String name) {
        return new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("type_event")
                .usingGeneratedKeyColumns("tp_event")
                .executeAndReturnKey(
                        new MapSqlParameterSource("nm_type", name)
                ).longValue();
    }

    public List<TypeEvent> get(final String filter, final Long page) {
        val sql = new StringBuilder("select * from type_event ");
        val params = new MapSqlParameterSource();
        Optional.ofNullable(filter)
            .ifPresent(
                s -> {
                    sql.append("where nm_type like :nm_type ");
                    params.addValue("nm_type", filter + "%");
                }
            );
        Optional.ofNullable(page)
            .ifPresent(
                aLong -> {
                    sql.append("limit 20 offset :offset");
                    params.addValue("offset", page*20);
                }
            );
        return jdbcTemplate.query(sql.toString(), params, (rs, i) -> this.build(rs));
    }

    public TypeEvent get(Long tpEvent) {
        return jdbcTemplate.query(
                "select * from type_event where tp_event=:tp_event",
                new MapSqlParameterSource("tp_event", tpEvent),
                this::build
        );
    }

    private TypeEvent build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return TypeEvent.builder()
                .type(rs.getLong("tp_event"))
                .name(rs.getString("nm_type"))
                .build();
    }

    public void delete(Long tpEvent) {
        jdbcTemplate.update(
                "delete from type_event where tp_event=:tp_event",
                new MapSqlParameterSource("tp_event", tpEvent)
        );
    }

    public Integer count(String filter) {
        val sql = new StringBuilder("select count(tp_event) from type_event ");
        val params = new MapSqlParameterSource();
        Optional.ofNullable(filter)
            .ifPresent(
                s -> {
                    sql.append("where nm_type like :nm_type ");
                    params.addValue("nm_type", filter + "%");
                }
            );
        return jdbcTemplate.queryForObject(sql.toString(), params, Integer.class);
    }
}
