package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.*;
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
import java.util.ArrayList;
import java.util.List;
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

    public List<Volunteer> get(final List<String> filterCompany, final List<Long> filterSchool,
                               final String filter, final Integer page) {
        val sql = new StringBuilder("select * from volunteer where 1=1");
        val params = new MapSqlParameterSource();

        if (!Optional.ofNullable(filterCompany)
                .orElseGet(ArrayList::new)
                .isEmpty()
                ){
            sql.append(" and cod_cnpj in(:cod_cnpj)");
            params.addValue("cod_cnpj", filterCompany);
        }
        if (!Optional.ofNullable(filterSchool)
                .orElseGet(ArrayList::new)
                .isEmpty()
                ){
            sql.append(" and cod_school in(:cod_school)");
            params.addValue("cod_school", filterSchool);
        }
        Optional.ofNullable(filter)
            .ifPresent(
                s -> {
                    sql.append(" and nm_volunteer like :nm_volunteer");
                    params.addValue("nm_volunteer", filter + "%");
                }
            );
        Optional.ofNullable(page)
            .ifPresent(
                aLong -> {
                    sql.append(" limit 5 offset :offset");
                    params.addValue("offset", page * 5);
                }
            );
        return jdbcTemplate.query(sql.toString(), params, this::build);
    }

    public Volunteer get(String cpf) {
        return jdbcTemplate.queryForObject(
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
        StringBuilder sql = new StringBuilder();
        sql.append("update volunteer set dsc_schooling=:dsc_schooling, fl_conclusion=:fl_conclusion, cod_rg=:cod_rg");
        if(volunteer.getSchool().getCodSchool() != 0){
            sql.append(", cod_school=:cod_school");
        }
        sql.append(" where cod_cpf=:cod_cpf");
        jdbcTemplate.update(sql.toString(), getParams(volunteer));
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

    private Volunteer build(ResultSet rs, int i) throws SQLException {
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

    public Integer count(final List<String> filterCompany, final List<Long> filterSchool, final String filter) {
        val sql = new StringBuilder("select count(cod_cpf) from volunteer where 1=1");
        val params = new MapSqlParameterSource();

        if (!Optional.ofNullable(filterCompany)
                .orElseGet(ArrayList::new)
                .isEmpty()
                ){
            sql.append(" and cod_cnpj in(:cod_cnpj)");
            params.addValue("cod_cnpj", filterCompany);
        }
        if (!Optional.ofNullable(filterSchool)
                .orElseGet(ArrayList::new)
                .isEmpty()
                ){
            sql.append(" and cod_school in(:cod_school)");
            params.addValue("cod_school", filterSchool);
        }
        Optional.ofNullable(filter)
                .ifPresent(
                        s -> {
                            sql.append(" and nm_volunteer like :nm_volunteer");
                            params.addValue("nm_volunteer", filter + "%");
                        }
                );
        return jdbcTemplate.queryForObject(sql.toString(), params, Integer.class);
    }
}
