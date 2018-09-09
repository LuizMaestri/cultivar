package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Company;
import br.ufsc.cultivar.model.Schooling;
import br.ufsc.cultivar.model.User;
import br.ufsc.cultivar.model.Volunteer;
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

    public List<Volunteer> get(Map<String, Object> filter) {
        val sql = new StringBuilder("select * from volunteer where 1=1");
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
                        "cod_rg=:cod_rg where cod_cpf=:cod_cpf",
                getParams(volunteer)
        );
    }

    private MapSqlParameterSource getParams(Volunteer volunteer) {
        val user = volunteer.getUser();
        return new MapSqlParameterSource()
                .addValue("cod_cpf", user.getCpf())
                .addValue("nm_volunteer", user.getName())
                .addValue("cod_cnpj", volunteer.getCompany().getCnpj())
                .addValue("dsc_schooling", volunteer.getSchooling().name())
                .addValue("fl_conclusion", volunteer.getConclusion())
                .addValue("cod_rg", volunteer.getRg());
    }

    private Volunteer build(ResultSet rs) throws SQLException {
        if (rs.isBeforeFirst()){
            rs.first();
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
                )
                .schooling(
                        Schooling.valueOf(rs.getString("dsc_schooling"))
                )
                .conclusion(rs.getBoolean("fl_conclusion"))
                .rg(rs.getString("cod_rg"))
                .build();
    }
}
