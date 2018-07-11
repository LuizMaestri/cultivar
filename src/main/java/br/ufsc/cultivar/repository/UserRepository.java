package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.models.Role;
import br.ufsc.cultivar.models.Status;
import br.ufsc.cultivar.models.User;
import br.ufsc.cultivar.repository.base.StringRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRepository extends StringRepository<User> {

    @Override
    protected User build(final ResultSet rs){
        try {
            if(rs.isBeforeFirst()){
                rs.first();
            }
            return User.builder()
                    .id(rs.getString("cod_cpf"))
                    .name(rs.getString("nm_user"))
                    .email(rs.getString("dsc_email"))
                    .password(rs.getString("dsc_password"))
                    .phone(rs.getString("nu_phone"))
                    .birth(rs.getDate("dt_birth"))
                    .createAt(rs.getDate("dt_create"))
                    .role(
                            Role.valueOf(
                                    rs.getString("nm_role")
                            )
                    )
                    .status(
                            Status.valueOf(
                                    rs.getString("sta_user")
                            )
                    )
                    .build();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected String getInsertQuery() {
        return "INSERT INTO Users ("
                +"cod_cpf, nm_user, nm_role, sta_user, dt_birth, nu_phone, dsc_email, dsc_password"
                + ") VALUES("
                + ":cod_cpf, :nm_user, :nm_role, :sta_user, :dt_birth, :nu_phone, :dsc_email, :dsc_password);";
    }

    @Override
    protected MapSqlParameterSource getInsertParams(User entity) {
        return getUpdateParams(entity.getId(), entity);
    }

    @Override
    protected String getSelectAllQuery() {
        return "SELECT cod_cpf, nm_user, nm_role, sta_user, dt_birth, "
                + "nu_phone, dsc_email, dsc_password, dt_create FROM Users ";
    }

    @Override
    protected String getIdFieldName() {
        return "cod_cpf";
    }

    @Override
    protected String getDeleteQuery() {
        return "DELETE FROM Users WHERE cod_cpf=:cod_cpf";
    }

    @Override
    protected String getUpdateQuery() {
        return "UPDATE Users SET "
                + "nm_user=:nm_user, nm_role=:nm_role, sta_user=:sta_user, dt_birth=:dt_birth, nu_phone=:nu_phone, "
                + "dsc_email=:dsc_email, dsc_password=:dsc_password WHERE cod_cpf=:cod_cpf;";
    }

    @Override
    protected MapSqlParameterSource getUpdateParams(final String id, final User entity) {
        return new MapSqlParameterSource()
                .addValue(getIdFieldName(), id)
                .addValue("nm_user", entity.getName())
                .addValue("nm_role", entity.getRole().name())
                .addValue("sta_user", entity.getStatus().name())
                .addValue("dt_birth", entity.getBirth())
                .addValue("nu_phone", entity.getPhone())
                .addValue("dsc_email", entity.getEmail())
                .addValue("dsc_password", entity.getPassword());
    }
}
