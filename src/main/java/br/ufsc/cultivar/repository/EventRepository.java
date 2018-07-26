package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.models.Event;
import br.ufsc.cultivar.models.Place;
import br.ufsc.cultivar.models.Type;
import br.ufsc.cultivar.models.User;
import br.ufsc.cultivar.models.dto.EventUsersDTO;
import br.ufsc.cultivar.repository.base.LongRepository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */
@Repository
public class EventRepository extends LongRepository<Event> {
    @Override
    protected Event build(ResultSet rs) {
        try {
            if (rs.isBeforeFirst()) {
                rs.first();
            }
            return Event.builder()
                    .id(rs.getLong("cod_event"))
                    .createdAt(rs.getDate("dt_create"))
                    .type(
                            Type.valueOf(rs.getString("tp_event"))
                    )
                    .occurrence(rs.getDate("dt_occurrence"))
                    .place(
                            Place.builder()
                                    .id(rs.getString("cod_cpnj"))
                                    .build()
                    )
                    .involved(
                            Arrays.stream(
                                    rs.getString("involved").split(",")
                            ).map(
                                    cpf -> User.builder().id(cpf).build()
                            ).collect(Collectors.toList())
                    )
                    .build();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected String getInsertQuery() {
        return "INSERT INTO Event (cod_cnpj, dt_occurrence, tp_event)"
                + " VALUES (:codCnpj, :dtOccurrence, :tpEvent)";
    }

    @Override
    protected MapSqlParameterSource getInsertParams(Event entity) {
        return new MapSqlParameterSource()
                .addValue("codCnpj", entity.getPlace().getId())
                .addValue("dtOccurrence", entity.getOccurrence())
                .addValue("tpEvent", entity.getType());
    }

    @Override
    protected String getSelectAllQuery() {
        return "SELECT * FROM ("
                + "SELECT e.*, group_concat(eu.cod_cpf SEPARATOR ',') as involved"
                + " FROM Event e NATURAL JOIN Event_User eu GROUP BY e.cod_event"
                + ") x ";
    }

    @Override
    protected String getIdFieldName() {
        return "cod_event";
    }

    @Override
    protected String getDeleteQuery() {
        return "DELETE FROM event WHERE cod_event=:cod_event";
    }

    @Override
    protected String getUpdateQuery() {
        return "UPDATE Event SET cod_cnpj=:codCnpj, dt_occurrence=:dtOccurrence, "
                + "tp_event:=tpEvent WHERE cod_event=:" + getIdFieldName();
    }

    @Override
    protected MapSqlParameterSource getUpdateParams(Long id, Event entity) {
        return getInsertParams(entity).addValue(getIdFieldName(), id);
    }

    @Override
    public void dissociate(Long codEvent){
        jdbcTemplate.update(
                "DELETE FROM Event_User WHERE cod_event=:codevent",
                new MapSqlParameterSource("codEvent", codEvent)
        );
    }

    @Override
    @SuppressWarnings("unchecked")
    public void associate(Object associations) {
        if (associations instanceof List) {

            List<EventUsersDTO.EventUser> list = (List) associations;
            jdbcTemplate.batchUpdate(
                    "INSERT INTO Event_User (cod_event, cod_cpf) VALUES (:codEvent, :codCpf)",
                    list.stream()
                            .map(
                                    eventUser -> new MapSqlParameterSource()
                                            .addValue("codEvent", eventUser.getCodEvent())
                                            .addValue("codCpf", eventUser.getCodCpf())
                            ).collect(Collectors.toList())
                            .toArray(new MapSqlParameterSource[list.size()])
            );
        }
    }
}
