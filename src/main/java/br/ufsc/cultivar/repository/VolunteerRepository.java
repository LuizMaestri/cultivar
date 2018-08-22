package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.models.Address;
import br.ufsc.cultivar.models.Place;
import br.ufsc.cultivar.models.Status;
import br.ufsc.cultivar.models.Volunteer;
import br.ufsc.cultivar.models.dto.FileDTO;
import br.ufsc.cultivar.repository.base.StringRepository;
import br.ufsc.cultivar.utils.DateUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class VolunteerRepository extends StringRepository<Volunteer> {

    @Override
    public Volunteer build(final ResultSet rs) {
        try {
            if(rs.isBeforeFirst()){
                rs.first();
            }
            return Volunteer.builder()
                    .id(rs.getString("cod_cpf"))
                    .name(rs.getString("nm_user"))
                    .email(rs.getString("dsc_email"))
                    .password(rs.getString("dsc_password"))
                    .phone(rs.getString("nu_phone"))
                    .job(rs.getString("dsc_job"))
                    .birth(
                            DateUtils.toLocaldate(rs.getDate("dt_birth"))
                    )
                    .createAt(
                            DateUtils.toLocalDateTime(rs.getDate("dt_create"))
                    )
                    .status(
                            Status.valueOf(
                                    rs.getString("sta_user")
                            )
                    )
                    .address(
                            Address.builder()
                                    .id(rs.getLong("cod_address"))
                                    .build()
                    )
                    .company(
                            Place.builder()
                                    .id(rs.getString("cod_cnpj"))
                                    .build()
                    )
                    .pathTV(rs.getString("dsc_path_tv"))
                    .pathTR(rs.getString("dsc_path_tr"))
                    .build();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected String getInsertQuery() {
        return "INSERT INTO users ("
                + "cod_cpf, nm_user, nm_role, sta_user, dt_birth, nu_phone, "
                + "dsc_email, dsc_password, cod_address, cod_cnpj, dsc_job"
                + ") VALUES("
                + ":cod_cpf, :nm_user, 'VOLUNTEER', :sta_user, :dt_birth, :nu_phone, "
                + ":dsc_email, :dsc_password, :cod_address, :cod_cnpj, dsc_job);";
    }

    @Override
    protected MapSqlParameterSource getInsertParams(final Volunteer entity) {
        return getUpdateParams(entity.getId(), entity);
    }

    @Override
    protected String getSelectAllQuery() {
        return "SELECT * FROM (SELECT * FROM users WHERE nm_role = 'VOLUNTEER') as v ";
    }

    @Override
    protected String getIdFieldName() {
        return "cod_cpf";
    }

    @Override
    protected String getDeleteQuery() {
        return "DELETE FROM users WHERE cod_cpf=:cod_cpf";
    }

    @Override
    protected String getUpdateQuery() {
        return "UPDATE users SET "
                + "nm_user=:nm_user, sta_user=:sta_user, dt_birth=:dt_birth, nu_phone=:nu_phone, dsc_email=:dsc_email, "
                + "dsc_password=:dsc_password, cod_address=:cod_address, cod_cnpj=:cod_cnpj, dsc_job=:dsc_job WHERE cod_cpf=:cod_cpf;";
    }

    @Override
    protected MapSqlParameterSource getUpdateParams(final String id, final Volunteer entity) {
        return new MapSqlParameterSource()
                .addValue(getIdFieldName(), id)
                .addValue("nm_user", entity.getName())
                .addValue("sta_user", entity.getStatus().name())
                .addValue("dt_birth", entity.getBirth())
                .addValue("nu_phone", entity.getPhone())
                .addValue("dsc_email", entity.getEmail())
                .addValue("dsc_password", entity.getPassword())
                .addValue("cod_address", entity.getAddress().getId())
                .addValue("cod_cnpj", entity.getCompany().getId())
                .addValue("dsc_job", entity.getJob());
    }

    @Override
    @SuppressWarnings("unchecked")
    public void associate(Object associations) {
        if (associations instanceof FileDTO){
            FileDTO<String> fileDTO = (FileDTO<String>) associations;
            String sql = String.format("UPDATE users SET dsc_path_%s=:path", fileDTO.getType());
            jdbcTemplate.update(sql, new MapSqlParameterSource("path", fileDTO.getFilename()));
        }
    }
}
