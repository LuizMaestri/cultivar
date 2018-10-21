package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Address;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.Objects;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public Long create(final Address address) {
        val insert = new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("address")
                .usingGeneratedKeyColumns("cod_address");
        if (Objects.isNull(address.getNumber())){
            insert.usingColumns("nm_city", "nm_neighborhood", "nm_street");
        }
        return insert.executeAndReturnKey(getParams(address)).longValue();
    }

    public Address get(final Long codAddress) {
        return jdbcTemplate.query(
            "select * from address where cod_address=:cod_address",
            new MapSqlParameterSource("cod_address", codAddress),
            rs -> {
                if(rs.isBeforeFirst()){
                    rs.first();
                }
                return Address.builder()
                        .codAddress(codAddress)
                        .city(rs.getString("nm_city"))
                        .neighborhood(rs.getString("nm_neighborhood"))
                        .street(rs.getString("nm_street"))
                        .number(rs.getString("nu_street"))
                        .build();
            }
        );
    }

    public void update(final Address address) {
        jdbcTemplate.update(
                "update address set nm_city=:nm_city, nm_neighborhood=:nm_neighborhood, nm_street=:nm_street," +
                        "nu_street=:nu_street where cod_address=:cod_address",
                getParams(address)
                        .addValue("cod_address", address.getCodAddress())
        );
    }

    private MapSqlParameterSource getParams(final Address address) {
        return new MapSqlParameterSource()
                .addValue("nm_city", address.getCity())
                .addValue("nm_neighborhood", address.getNeighborhood())
                .addValue("nm_street", address.getStreet())
                .addValue("nu_street", address.getNumber());
    }

    public void delete(final Long codAddress) {
        jdbcTemplate.update(
                "delete from address where cod_address=:cod_address",
                new MapSqlParameterSource("cod_address", codAddress)
        );
    }
}
