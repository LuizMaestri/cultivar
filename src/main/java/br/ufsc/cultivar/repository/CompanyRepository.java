package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Address;
import br.ufsc.cultivar.model.Company;
import br.ufsc.cultivar.model.User;
import br.ufsc.cultivar.utils.DatabaseUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
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
public class CompanyRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(final Company company) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("company")
                .execute(getParams(company));
    }

    public List<Company> get(final Map<String, Object> filter) {
        val sql = new StringBuilder("select * from company where 1=1");
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

    public Company get(final String cnpj) {
        return jdbcTemplate.query(
                "select * from company where cod_cnpj=:cod_cnpj",
                new MapSqlParameterSource("cod_cnpj", cnpj),
                this::build
        );
    }

    public void delete(final String cnpj) {
        jdbcTemplate.update(
                "delete from company where cod_cnpj=:cod_cnpj",
                new MapSqlParameterSource("cod_cnpj", cnpj)
        );
    }

    public void update(final Company company) {
        jdbcTemplate.update(
                "update company set nm_company=:nm_company, dsc_phone=:dsc_phone, cod_address=:cod_address," +
                        "cod_cpf=:cod_cpf where cod_cnpj=:cod_cnpj",
                getParams(company)
        );
    }

    private SqlParameterSource getParams(final Company company) {
        return new MapSqlParameterSource()
                .addValue("cod_cnpj", company.getCnpj())
                .addValue("nm_company", company.getName())
                .addValue("dsc_phone", company.getPhone())
                .addValue("cod_address", company.getAddress().getCodAddress())
                .addValue("cod_cpf", company.getResponsible().getCpf());
    }

    private Company build(final ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Company.builder()
                .cnpj(rs.getString("cod_cnpj"))
                .name(rs.getString("nm_company"))
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
