package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Address;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.model.School;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.utils.DatabaseUtils;
import br.ufsc.cultivar.utils.DateUtils;
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
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public Long create(final Event event) {
        return new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("event")
                .usingGeneratedKeyColumns("cod_event")
                .usingColumns("dt_start_occurrence", "dt_end_occurrence", "fl_all_day", "tp_event", "cod_address")
                .executeAndReturnKey(getParams(event))
                .longValue();
    }

    public List<Event> get(final Map<String, Object> filter) {
        val sql = new StringBuilder("select * from event where 1=1");
        val params = new MapSqlParameterSource();
        Optional.ofNullable(filter)
                .ifPresent(
                        map -> map.forEach(
                                (key, value) -> {
                                    sql.append(" and ")
                                            .append(key)
                                            .append("=:")
                                            .append(key);
                                    params.addValue(key, value);
                                }
                        )
                );
        return jdbcTemplate.query(
                sql.toString(),
                params,
                (rs, i) -> this.build(rs)
        );
    }

    public Event get(final Long codEvent) {
        return jdbcTemplate.query(
                "select * from event where cod_event=:cod_event",
                new MapSqlParameterSource("cod_event", codEvent),
                this::build
        );
    }

    public void delete(final Long codEvent) {
        jdbcTemplate.update(
                "delete from event where cod_event=:cod_event",
                new MapSqlParameterSource("cod_event", codEvent)
        );
    }

    public void update(final Event event) {
        jdbcTemplate.update(
                "update event set dt_start_occurrence=:dt_start_occurrence, dt_end_occurrence=:dt_end_occurrence," +
                        "tp_event=:tp_event, fl_all_day=:fl_all_day, cod_address=:cod_address where cod_event=:cod_event",
                getParams(event)
        );
    }

    private Event build(final ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Event.builder()
                .codEvent(rs.getLong("cod_event"))
                .startOccurrence(DateUtils.toDate(rs.getTimestamp("dt_start_occurrence")))
                .endOccurrence(DateUtils.toDate(rs.getTimestamp("dt_end_occurrence")))
                .allDay(rs.getBoolean("fl_all_day"))
                .createAt(DateUtils.toDate(rs.getTimestamp("dt_create")))
                .type(
                        TypeEvent.valueOf(rs.getString("tp_event"))
                )
                .address(
                        Address.builder()
                                .codAddress(rs.getLong("cod_address"))
                                .build()
                ).school(
                        School.builder()
                                .codSchool(rs.getLong("cod_school"))
                                .build()
                ).build();
    }

    private MapSqlParameterSource getParams(final Event event) {
        return new MapSqlParameterSource()
                .addValue("dt_start_occurrence", event.getStartOccurrence())
                .addValue("dt_end_occurrence",  event.getEndOccurrence())
                .addValue("fl_all_day", event.getAllDay())
                .addValue("tp_event", event.getType().name())
                .addValue("cod_address", event.getAddress().getCodAddress())
                .addValue("cod_school", event.getSchool().getCodSchool())
                .addValue("cod_event", event.getCodEvent());
    }

    public List<Event> eventsByVolunteer(final String cpf, final TypeEvent type) {
        val sb = new StringBuilder("select e.* from event e natural join participation p where cod_cpf=:cod_cpf");
        val params = new MapSqlParameterSource("cod_cpf", cpf);
        if (Objects.nonNull(type)){
            sb.append(" and tp_event=:tp_event");
            params.addValue("tp_event", type.name());
        }

        return jdbcTemplate.query(sb.toString(), params, (rs, i) -> this.build(rs));
    }
}
