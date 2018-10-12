package br.ufsc.cultivar.repository.evaluate;

import br.ufsc.cultivar.model.evaluate.Skill;
import br.ufsc.cultivar.utils.DatabaseUtils;
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
public class SkillRepository {
    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Skill skill){
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("skill")
            .usingGeneratedKeyColumns("cod_skill")
            .execute(
                new MapSqlParameterSource("nm_skill", skill.getName())
            );
    }

    public Skill get(Long codSkill){
        return jdbcTemplate.query(
                "select * from skill where cod_skill=:cod_skill",
                new MapSqlParameterSource("cod_skill", codSkill),
                this::build
        );
    }

    public List<Skill> get(){
        return jdbcTemplate.query(
                "select * from skill",
                (rs, i) -> this.build(rs)
        );
    }

    public void delete(Long codSkill){
        jdbcTemplate.update(
                "delete from skill where cod_skill=:cod_skill",
                new MapSqlParameterSource("cod_skill", codSkill)
        );
    }

    private Skill build(ResultSet rs) throws SQLException {
        if (!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Skill.builder()
                .codSkill(rs.getLong("cod_skill"))
                .name(rs.getString("nm_skill"))
                .build();
    }
}
