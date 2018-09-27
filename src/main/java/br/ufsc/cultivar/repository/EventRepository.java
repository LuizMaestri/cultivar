package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.*;
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
import java.util.*;

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

    public List<Event> get(final List<String> filterVolunteer,  final List<Long> filterSchool, final Long filterProject) {
        val sql = new StringBuilder("select e.* from event e natural join participation where 1=1");
        val params = new MapSqlParameterSource();
        if (!Optional.ofNullable(filterVolunteer)
                .orElseGet(ArrayList::new)
                .isEmpty()
                ){
            sql.append(" and cod_cpf in(:cod_cpf)");
            params.addValue("cod_cpf", filterVolunteer);
        }
        if (!Optional.ofNullable(filterSchool)
                .orElseGet(ArrayList::new)
                .isEmpty()
                ){
            sql.append(" and cod_school in(:cod_school)");
            params.addValue("cod_school", filterSchool);
        }
        if (Objects.nonNull(filterProject)){
            sql.append(" and cod_project in(:cod_project)");
            params.addValue("cod_project", filterProject);
        }
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
        val codProject = rs.getLong("cod_project");
        val isNull = rs.wasNull();
        return Event.builder()
                .codEvent(rs.getLong("cod_event"))
                .startOccurrence(DateUtils.toDate(rs.getTimestamp("dt_start_occurrence")))
                .endOccurrence(DateUtils.toDate(rs.getTimestamp("dt_end_occurrence")))
                .allDay(rs.getBoolean("fl_all_day"))
                .createAt(DateUtils.toDate(rs.getTimestamp("dt_create")))
                .type(
                        TypeEvent.builder()
                                .type(rs.getLong("tp_event"))
                                .build()
                )
                .address(
                        Address.builder()
                                .codAddress(rs.getLong("cod_address"))
                                .build()
                ).school(
                        School.builder()
                                .codSchool(rs.getLong("cod_school"))
                                .build()
                ).project(
                        isNull ?
                                Project.builder()
                                        .codProject(codProject)
                                        .build() :
                                null
                ).build();
    }

    private MapSqlParameterSource getParams(final Event event) {
        return new MapSqlParameterSource()
                .addValue("dt_start_occurrence", event.getStartOccurrence())
                .addValue("dt_end_occurrence",  event.getEndOccurrence())
                .addValue("fl_all_day", event.getAllDay())
                .addValue("tp_event", event.getType().getType())
                .addValue("cod_address", event.getAddress().getCodAddress())
                .addValue("cod_school", event.getSchool().getCodSchool())
                .addValue("cod_event", event.getCodEvent());
    }

    public List<Event> eventsByVolunteer(final String cpf, final Long type) {
        val sb = new StringBuilder("select e.* from event e natural join participation p where cod_cpf=:cod_cpf");
        val params = new MapSqlParameterSource("cod_cpf", cpf);
        if (Objects.nonNull(type)){
            sb.append(" and tp_event=:tp_event");
            params.addValue("tp_event", type);
        }

        return jdbcTemplate.query(sb.toString(), params, (rs, i) -> this.build(rs));
    }

    public List<Event> eventsBySchool(Long codSchool, Long type) {
        val sb = new StringBuilder("select e.* from event e where cod_school=:cod_school");
        val params = new MapSqlParameterSource("cod_school", codSchool);
        if (Objects.nonNull(type)){
            sb.append(" and tp_event=:tp_event");
            params.addValue("tp_event", type);
        }

        return jdbcTemplate.query(sb.toString(), params, (rs, i) -> this.build(rs));
    }
}
