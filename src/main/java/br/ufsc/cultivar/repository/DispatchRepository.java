package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Dispatch;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DispatchRepository {

    NamedParameterJdbcTemplate jdbcTemplate;


    public void save(Dispatch dispatch, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("dispatch")
                .execute(
                        new MapSqlParameterSource()
                            .addValue("cod_cpf", cpf)
                            .addValue("cod_attachment", dispatch.getAttachment().getCodAttachment())
                            .addValue("fl_dispatch", dispatch.getSend())
                );
    }

    public Dispatch get(String cpf, Long codAttachment) {
        return jdbcTemplate.queryForObject(
            "select * from dispatch where cod_cpf=:cod_cpf and cod_attachment=:cod_attachment",
            new MapSqlParameterSource()
                .addValue("cod_cpf", cpf)
                .addValue("cod_attachment", codAttachment),
            (rs, i) -> this.build(rs)
        );
    }

    public List<Dispatch> get(String cpf) {
        return jdbcTemplate.query(
                "select * from dispatch where cod_cpf=:cod_cpf",
                new MapSqlParameterSource()
                        .addValue("cod_cpf", cpf),
                (rs, i) -> this.build(rs)
        );
    }

    private Dispatch build(ResultSet rs) throws SQLException {
        return Dispatch.builder()
                .attachment(
                        Attachment.builder()
                                .codAttachment(rs.getLong("cod_attachment"))
                                .build()
                ).send(rs.getBoolean("fl_dispatch"))
                .build();
    }
}
