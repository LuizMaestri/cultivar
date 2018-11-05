package br.ufsc.cultivar.repository.report;

import br.ufsc.cultivar.dto.EventDTO;
import br.ufsc.cultivar.dto.ReportDTO;
import br.ufsc.cultivar.model.Rating;
import br.ufsc.cultivar.model.TypeEvent;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportRepository {
    NamedParameterJdbcTemplate jdbcTemplate;

    private String baseQuery(){
        return "select " +
                "  u.cod_cpf, u.nm_user, p.nm_project, te.nm_type, e.dt_start_occurrence, e.dt_end_occurrence, e.fl_all_day, " +
                "  r.vl_rating, r.dsc_rating, c.cod_cnpj, c.nm_company, s.nm_school " +
                "from users u " +
                "  natural join rating r " +
                "  natural join volunteer v " +
                "  join school s on v.cod_school = s.cod_school " +
                "  join company c on v.cod_cnpj = c.cod_cnpj " +
                "  left join project p on r.cod_project = p.cod_project " +
                "  left join event e on r.cod_event = e.cod_event " +
                "  left join type_event te on e.tp_event = te.tp_event ";
    }

    public List<ReportDTO> getAll(){
        return jdbcTemplate.query(
                baseQuery(),
                this::build
        );
    }

    private ReportDTO build(ResultSet rs, int i) throws SQLException {
        return ReportDTO.builder()
            .cpf(rs.getString("cod_cpf"))
            .user(rs.getString("nm_user"))
            .project(rs.getString("nm_project"))
            .cnpj(rs.getString("cod_cnpj"))
            .company(rs.getString("nm_company"))
            .school(rs.getString("nm_school"))
            .rating(
                Rating.builder()
                    .grade(rs.getInt("vl_rating"))
                    .comment(rs.getString("dsc_rating"))
                    .build()
            ).event(
                EventDTO.builder()
                    .startOccurrence(rs.getTimestamp("dt_start_occurrence"))
                    .endOccurrence(rs.getTimestamp("dt_end_occurrence"))
                    .allDay(rs.getBoolean("fl_all_day"))
                    .type(
                        TypeEvent.builder()
                            .name(rs.getString("nm_type"))
                            .build()
                    ).build()
            ).build();
    }
}
