package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.dto.ParticipationDTO;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ParticipationRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Long codEvent, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("participation")
                .execute(
                        new MapSqlParameterSource()
                            .addValue("cod_cpf", cpf)
                            .addValue("cod_event", codEvent)
                );
    }

    public List<ParticipationDTO> getVolunteerLocals(final String codCpf){
        val sql = "select a.*, nm_school from volunteer v" +
                "  natural join participation p" +
                "  join event e on p.cod_event = e.cod_event " +
                "  natural join address a" +
                "  join school s on e.cod_school = s.cod_school " +
                "where p.cod_cpf=:cod_cpf and e.dt_end_occurrence < current_date";
        return jdbcTemplate.query(
                sql,
                new MapSqlParameterSource("cod_cpf", codCpf),
                (rs, i) -> ParticipationDTO.builder()
                        .school(rs.getString("nm_school"))
                        .city(rs.getString("nm_city"))
                        .neighborhood(rs.getString("nm_neighborhood"))
                        .street(rs.getString("nm_street"))
                        .number(rs.getString("nu_street"))
                        .build()
        );
    }

    public void updateEvaluate(Long codEvent, String cpf) {
        jdbcTemplate.update(
                "update participation set fl_evaluate=true where cod_event=:cod_event and cod_cpf=:cod_cpf",
                new MapSqlParameterSource()
                    .addValue("cod_cpf", cpf)
                    .addValue("cod_event", codEvent)
        );
    }
}
