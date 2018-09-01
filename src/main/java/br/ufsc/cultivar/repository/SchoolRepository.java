package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Address;
import br.ufsc.cultivar.model.School;
import br.ufsc.cultivar.model.User;
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
public class SchoolRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public Long create(final School school) {
        return new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("school")
                .usingGeneratedKeyColumns("cod_school")
                .executeAndReturnKey(getParams(school))
                .longValue();
    }

    public List<School> get(final Map<String, Object> filter) {
        val sql = new StringBuilder("select * from school where 1=1");
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

    public School get(final Long codSchool) {
        return jdbcTemplate.query(
                "select * from school where cod_school=:cod_school",
                new MapSqlParameterSource("cod_school", codSchool),
                this::build
        );
    }

    public void delete(final Long codSchool) {
        jdbcTemplate.update(
                "delete from school where cod_school=:cod_school",
                new MapSqlParameterSource("cod_school", codSchool)
        );
    }

    public void update(final School school) {
        jdbcTemplate.update(
                "update school set nm_school=:nm_school, dsc_phone=:dsc_phone, cod_address=:cod_address," +
                        "cod_cpf=:cod_cpf where cod_school=:cod_school",
                getParams(school).addValue("cod_school", school.getCodSchool())
        );
    }

    private MapSqlParameterSource getParams(final School school) {
        return new MapSqlParameterSource()
                .addValue("nm_school", school.getName())
                .addValue("dsc_phone", school.getPhone())
                .addValue("cod_address", school.getAddress().getCodAddress())
                .addValue("cod_cpf", school.getResponsible().getCpf());
    }

    private School build(final ResultSet rs) throws SQLException {
        if(rs.isBeforeFirst()){
            rs.first();
        }
        return School.builder()
                .codSchool(rs.getLong("cod_school"))
                .name(rs.getString("nm_school"))
                .phone(rs.getString("dsc_phone"))
                .address(
                        Address.builder()
                                .codAddress(rs.getLong("cod_address"))
                                .build()
                )
                .responsible(
                        User.builder()
                                .cpf(rs.getString("cod_cpf"))
                                .build()
                )
                .build();
    }
}
