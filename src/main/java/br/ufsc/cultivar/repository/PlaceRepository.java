package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.models.Address;
import br.ufsc.cultivar.models.Place;
import br.ufsc.cultivar.models.User;
import br.ufsc.cultivar.repository.base.StringRepository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class PlaceRepository extends StringRepository<Place> {
    @Override
    protected Place build(ResultSet rs) {
        try {
            if(rs.isBeforeFirst()){
                rs.first();
            }
            return Place.builder()
                    .id(rs.getString("cod_cnpj"))
                    .name(rs.getString("nm_company"))
                    .phone(rs.getString("nu_phone"))
                    .school(rs.getBoolean("fl_school"))
                    .address(
                            Address.builder()
                                    .id(rs.getLong("cod_address"))
                                    .build()
                    )
                    .responsible(
                            User.builder()
                                    .id(rs.getString("cod_cpf"))
                                    .build()
                    )
                    .build();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected String getInsertQuery() {
        return "INSERT INTO Place ("
                + "cod_cnpj, nm_company, nu_phone, fl_school, cod_address, cod_cpf"
                + ") VALUES ("
                + ":cod_cnpj, :nm_company, :nu_phone, :fl_school, :cod_address, :cod_cpf);";
    }

    @Override
    protected MapSqlParameterSource getInsertParams(Place entity) {
        return getUpdateParams(entity.getId(), entity)
                .addValue("cod_address", entity.getAddress().getId());
    }

    @Override
    protected String getSelectAllQuery() {
        return "SELECT * FROM Place ";
    }

    @Override
    protected String getIdFieldName() {
        return "cod_cnpj";
    }

    @Override
    protected String getDeleteQuery() {
        return "DELETE FROM Place WHERE cod_cnpj=:cod_cnpj";
    }

    @Override
    protected String getUpdateQuery() {
        return "UPDATE Place SET nm_company:=nm_company, nu_phone:=nu_phone, "
                + "fl_school:=fl_school, cod_cpf=:cod_cpf WHERE cod_cnpj=:cod_cnpj";
    }

    @Override
    protected MapSqlParameterSource getUpdateParams(String id, Place entity) {
        return new MapSqlParameterSource()
                .addValue("cod_cnpj", entity.getId())
                .addValue("nm_company", entity.getName())
                .addValue("nu_phone", entity.getPhone())
                .addValue("fl_school", entity.getSchool())
                .addValue("cod_cpf", entity.getResponsible().getId());
    }
}
