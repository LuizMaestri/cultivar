package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Address;
import br.ufsc.cultivar.model.Role;
import br.ufsc.cultivar.model.Status;
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
public class UserRepository {
    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(final User user) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("users")
            .usingColumns("cod_cpf", "nm_user", "dsc_email", "dsc_password", "dsc_role",
                    "sta_user", "dt_birth", "cod_address", "dsc_job", "dsc_phone")
            .execute(getParams(user));
    }

    public List<User> get(final Map<String, Object> filter) {
        val sql = new StringBuilder("select * from users where 1=1");
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
        return jdbcTemplate.query(sql.toString(), params, this::build);
    }

    public User get(final String cpf) {
        return jdbcTemplate.queryForObject(
            "select * from users where cod_cpf=:cod_cpf",
            new MapSqlParameterSource("cod_cpf", cpf),
            this::build
        );
    }

    public void delete(final String cpf) {
        jdbcTemplate.update(
            "delete from users where cod_cpf=:cod_cpf",
            new MapSqlParameterSource("cod_cpf", cpf)
        );
    }

    public void update(final User user) {
        val sql = "update users " +
            "set nm_user=:nm_user, dsc_email=:dsc_email, dsc_password=:dsc_password, dsc_role=:dsc_role," +
            "sta_user=:sta_user, dt_birth=:dt_birth, cod_address=:cod_address, dsc_job=:dsc_job," +
            "dsc_phone=:dsc_phone where cod_cpf=:cod_cpf;";
        jdbcTemplate.update(sql, getParams(user));
    }

    public List<User> getParticipants(final Long codEvent) {
        return jdbcTemplate.query(
                "select u.* from users u join participation p on u.cod_cpf=p.cod_cpf where p.cod_event=:cod_event",
                new MapSqlParameterSource("cod_event", codEvent),
                this::build
        );
    }

    private MapSqlParameterSource getParams(final User user){
        return new MapSqlParameterSource()
            .addValue("cod_cpf", user.getCpf())
            .addValue("nm_user", user.getName())
            .addValue("dsc_email", user.getEmail())
            .addValue("dsc_password", user.getPassword())
            .addValue("dsc_role", user.getRole().name())
            .addValue("sta_user", user.getStatus().name())
            .addValue("dt_birth", user.getBirth())
            .addValue("cod_address", user.getAddress().getCodAddress())
            .addValue("dsc_job", user.getJob())
            .addValue("dsc_phone", user.getPhone());
    }

    private User build(final ResultSet rs, int i) throws SQLException {
        return User.builder()
                .cpf(rs.getString("cod_cpf"))
                .name(rs.getString("nm_user"))
                .email(rs.getString("dsc_email"))
                .password(rs.getString("dsc_password"))
                .role(Role.valueOf(rs.getString("dsc_role")))
                .status(Status.valueOf(rs.getString("sta_user")))
                .birth(rs.getDate("dt_birth"))
                .address(
                    Address.builder()
                        .codAddress(rs.getLong("cod_address"))
                        .build()
                )
                .job(rs.getString("dsc_job"))
                .phone(rs.getString("dsc_phone"))
                .build();
    }
}
