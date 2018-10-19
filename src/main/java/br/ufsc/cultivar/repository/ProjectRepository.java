package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Project;
import br.ufsc.cultivar.utils.DatabaseUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProjectRepository {

    NamedParameterJdbcTemplate jdbcTemplate;

    public void create(Project project) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
            .withTableName("project")
            .usingGeneratedKeyColumns("cod_project")
            .execute(
                new MapSqlParameterSource()
                    .addValue("nm_project", project.getName())
                    .addValue("dt_start", project.getStart())
                    .addValue("dt_end", project.getEnd())
            );
    }

    public List<Project> get(final String filter, final Long page) {
        val sql = new StringBuilder("select * from project ");
        val params = new MapSqlParameterSource();
        Optional.ofNullable(filter)
            .ifPresent(
                s -> {
                    sql.append("where nm_project like :nm_project ");
                    params.addValue("nm_project", filter + "%");
                }
            );
        sql.append("order by dt_start desc ");
        Optional.ofNullable(page)
            .ifPresent(
                aLong -> {
                    sql.append("limit 20 offset :offset");
                    params.addValue("offset", page*20);
                }
            );
        return jdbcTemplate.query(sql.toString(), params, (rs, i) -> this.build(rs));
    }

    public Integer count(final String filter) {
        val sql = new StringBuilder("select * from project ");
        val params = new MapSqlParameterSource();
        Optional.ofNullable(filter)
                .ifPresent(
                        s -> {
                            sql.append("where nm_project like :nm_project ");
                            params.addValue("nm_project", filter + "%");
                        }
                );
        return jdbcTemplate.queryForObject(sql.toString(), params, Integer.class);
    }

    public Project get(Long codProject) {
        return jdbcTemplate.query(
            "select * from project where cod_project=:cod_project",
            new MapSqlParameterSource("cod_project", codProject),
            this::build
        );
    }

    public void delete(Long codProject) {
        jdbcTemplate.update(
            "delete from project where cod_project=:cod_project",
            new MapSqlParameterSource("cod_project", codProject)
        );
    }

    private Project build(ResultSet rs) throws SQLException {
        if(!DatabaseUtils.isNotEmpty(rs)){
            return null;
        }
        return Project.builder()
            .codProject(rs.getLong("cod_project"))
            .name(rs.getString("nm_project"))
            .start(rs.getDate("dt_start"))
            .end(rs.getDate("dt_end"))
            .build();
    }
}
