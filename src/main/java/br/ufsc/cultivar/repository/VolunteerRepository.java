package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.*;
import br.ufsc.cultivar.utils.DatabaseUtils;
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
public class VolunteerRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Volunteer volunteer) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("volunteer")
                .execute(getParams(volunteer));
    }

    public List<Volunteer> get(final List<String> filterCompany, final List<Long> filterSchool) {
        val sql = new StringBuilder("select * from volunteer where 1=1");
        val params = new MapSqlParameterSource();
        if (!filterCompany.isEmpty()){
            sql.append(" and cod_cnpj in(:cod_cnpj)");
            params.addValue("cod_cpnj", filterCompany);
        }
        if (!filterSchool.isEmpty()){
            sql.append(" and cod_school in(:cod_school)");
            params.addValue("cod_school", filterSchool);
        }
        return jdbcTemplate.query(
                sql.toString(),
                params,
                (rs, i) -> this.build(rs)
        );
    }

    public Volunteer get(String cpf) {
        return jdbcTemplate.query(
                "select * from volunteer where cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_cpf", cpf),
                this::build
        );
    }

    public void delete(String cpf) {
        jdbcTemplate.update(
                "delete from volunteer where cod_cpf=:cod_cpf",
                new MapSqlParameterSource("cod_cpf", cpf)
        );
    }

    public void update(Volunteer volunteer) {
        jdbcTemplate.update(
                "update volunteer set dsc_schooling=:dsc_schooling, fl_conclusion=:fl_conclusion, " +
                        "cod_rg=:cod_rg, cod_school=:cod_school where cod_cpf=:cod_cpf",
                getParams(volunteer)
        );
    }

    private MapSqlParameterSource getParams(Volunteer volunteer) {
        val user = volunteer.getUser();
        val school = volunteer.getSchool();
        return new MapSqlParameterSource()
                .addValue("cod_cpf", user.getCpf())
                .addValue("nm_volunteer", user.getName())
                .addValue("cod_cnpj", volunteer.getCompany().getCnpj())
                .addValue("cod_school", Objects.nonNull(school) ? school.getCodSchool() : null)
                .addValue("dsc_schooling", volunteer.getSchooling().name())
                .addValue("fl_conclusion", volunteer.getConclusion())
                .addValue("cod_rg", volunteer.getRg())
                .addValue("dsc_course", volunteer.getCourse());
    }

    private Volunteer build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Volunteer.builder()
                .user(
                        User.builder()
                                .cpf(rs.getString("cod_cpf"))
                                .build()
                )
                .company(
                        Company.builder()
                                .cnpj(rs.getString("cod_cnpj"))
                                .build()
                ).school(
                        School.builder()
                                .codSchool(rs.getLong("cod_school"))
                                .build()
                ).schooling(
                        Schooling.valueOf(rs.getString("dsc_schooling"))
                ).course(rs.getString("dsc_course"))
                .conclusion(rs.getBoolean("fl_conclusion"))
                .rg(rs.getString("cod_rg"))
                .build();
    }
}
