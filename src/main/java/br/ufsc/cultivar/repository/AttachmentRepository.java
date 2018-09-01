package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Attachment;
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
public class AttachmentRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(final Attachment attachment) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("attachment")
                .usingGeneratedKeyColumns("cod_attachment")
                .execute(getParams(attachment));
    }

    public List<Attachment> get() {
        return jdbcTemplate.query(
                "select * from attachment",
                (rs, i) -> this.build(rs)
        );
    }

    public Attachment get(final Long codAttachment) {
        return jdbcTemplate.query(
                "select * from attachment where cod_attachment=:cod_attachment",
                new MapSqlParameterSource("cod_attachment", codAttachment),
                this::build
        );
    }

    public void delete(Long codAttachment) {
        jdbcTemplate.update(
                "delete from attachment where cod_attachment=:cod_attachment",
                new MapSqlParameterSource("cod_attachment", codAttachment)
        );
    }

    public void update(final Attachment attachment) {
        jdbcTemplate.update(
                "update attachment set nm_attachment=:nm_attachment, fl_required=:fl_required " +
                        "where cod_attachment=:cod_attachment",
                getParams(attachment).addValue("cod_attachment", attachment.getCodAttachment())
        );
    }

    private Attachment build(ResultSet rs) throws SQLException {
        if(rs.isBeforeFirst()){
            rs.first();
        }
        return Attachment.builder()
                .codAttachment(rs.getLong("cod_attachment"))
                .name(rs.getString("nm_attachment"))
                .required(rs.getBoolean("fl_required"))
                .build();
    }

    private MapSqlParameterSource getParams(final Attachment attachment) {
        return new MapSqlParameterSource()
                .addValue("nm_attachment", attachment.getName())
                .addValue("fl_required", attachment.getRequired());
    }
}
