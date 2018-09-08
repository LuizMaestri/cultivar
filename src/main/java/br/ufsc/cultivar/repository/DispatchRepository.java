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
        return jdbcTemplate.query(
            "select * from dispatch where cod_cpf=:cod_cpf and cod_attachment=:cod_attachment",
            new MapSqlParameterSource()
                .addValue("cod_cpf", cpf)
                .addValue("cod_attachment", codAttachment),
            rs -> {
                if(rs.next()){
                    return Dispatch.builder()
                        .attachment(
                            Attachment.builder()
                                .codAttachment(codAttachment)
                                .build()
                        ).send(rs.getBoolean("fl_dispatch"))
                        .build();
                }
                return Dispatch.builder().build();
            }
        );
    }
}
