package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.models.Address;
import br.ufsc.cultivar.repository.base.LongRepository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class AddressRepository extends LongRepository<Address> {
    @Override
    protected Address build(final ResultSet rs) {
        try {
            return Address.builder()
                    .id(rs.getLong(getIdFieldName()))
                    .city(rs.getString("nm_city"))
                    .neighborhood(rs.getString("nm_neighborhood"))
                    .street(rs.getString("nm_street"))
                    .number(rs.getString("nu_address"))
                    .build();
        } catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    protected String getInsertQuery() {
        return "INSERT INTO Address ("
                + "nm_city, nm_neighborhood, nm_street, nu_address"
                + ") VALUES("
                + ":nm_city, :nm_neighborhood, :nm_street, :nu_address);";
    }

    @Override
    protected MapSqlParameterSource getInsertParams(final Address entity) {
        return new MapSqlParameterSource()
                .addValue("nm_city", entity.getCity())
                .addValue("nm_neighborhood", entity.getNeighborhood())
                .addValue("nm_street", entity.getStreet())
                .addValue("nu_address", entity.getNumber());
    }

    @Override
    protected String getSelectAllQuery() {
        return "SELECT * FROM Address ";
    }

    @Override
    protected String getIdFieldName() {
        return "cod_address";
    }

    @Override
    protected String getDeleteQuery() {
        return "DELETE FROM Address WHERE cod_address=:" + getIdFieldName();
    }

    @Override
    protected String getUpdateQuery() {
        return "UPDATE Address SET nm_city=:nm_city nm_neighborhood=:nm_neighborhood, "
                + "nm_street=:nm_street, nu_address=:nu_address WHERE cod_address=:cod_address";
    }

    @Override
    protected MapSqlParameterSource getUpdateParams(final Long id, final Address entity) {
        return getInsertParams(entity).addValue(getIdFieldName(), id);
    }
}
