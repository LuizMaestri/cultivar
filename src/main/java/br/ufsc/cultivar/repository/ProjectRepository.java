package br.ufsc.cultivar.repository;

import br.ufsc.cultivar.model.Project;
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
        return jdbcTemplate.query(sql.toString(), params, this::build);
    }

    public Integer count(final String filter) {
        val sql = new StringBuilder("select count(cod_project) from project ");
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
        return jdbcTemplate.queryForObject(
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

    private Project build(ResultSet rs, int i) throws SQLException {
        return Project.builder()
            .codProject(rs.getLong("cod_project"))
            .name(rs.getString("nm_project"))
            .start(rs.getDate("dt_start"))
            .end(rs.getDate("dt_end"))
            .build();
    }

    public List<Project> getProjectToEvaluateByVolunteer(String cpf) {
        val sql = "select p.* from project p" +
                "  natural join event e" +
                "  natural join participation p2" +
                "  join project_volunteer pv on p.cod_project = pv.cod_project " +
                "where p.dt_end < current_date" +
                "      and p2.cod_cpf=:cod_cpf" +
                "      and fl_school_evaluate = true" +
                "      and pv.fl_evaluate = false;";
        return jdbcTemplate.query(sql, new MapSqlParameterSource("cod_cpf", cpf), this::build);
    }

    public void updateEvaluate(Long codProject, String cpf) {
        jdbcTemplate.update(
                "update project_volunteer set fl_evaluate=true where cod_project=:cod_project and cod_cpf=:cod_cpf",
                new MapSqlParameterSource()
                        .addValue("cod_cpf", cpf)
                        .addValue("cod_project", codProject)
        );
    }

    public void updateEvaluate(Long codProject, Long codSchool) {
        jdbcTemplate.update(
                "update project_school set fl_evaluate=true where cod_project=:cod_project and cod_school=:cod_school",
                new MapSqlParameterSource()
                        .addValue("cod_school", codSchool)
                        .addValue("cod_project", codProject)
        );
    }

    public void associate(Long codProject, String cpf) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("project_volunteer")
                .usingColumns("cod_project", "cod_cpf")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_project",codProject)
                                .addValue("cod_cpf", cpf)
                );
    }

    public void associate(Long codProject, Long codSchool) {
        new SimpleJdbcInsert(jdbcTemplate.getJdbcTemplate())
                .withTableName("project_school")
                .usingColumns("cod_project", "cod_school")
                .execute(
                        new MapSqlParameterSource()
                                .addValue("cod_project",codProject)
                                .addValue("cod_school", codSchool)
                );
    }

    public Boolean alreadyAssociate(Long codProject, String cpf) {
        val sql = "select" +
                "  case" +
                "    when exists(select 1 from project_volunteer where cod_cpf=:cod_cpf and cod_project=:cod_project) then true" +
                "    else false" +
                "  end " +
                "from dual;";
        return jdbcTemplate.queryForObject(
                sql,
                new MapSqlParameterSource("cod_cpf", cpf).addValue("cod_project", codProject),
                Boolean.class
        );
    }

    public Boolean alreadyAssociate(Long codProject, Long codSchool) {
        String sql = "select" +
                "  case" +
                "    when exists(select 1 from project_school where cod_school=:cod_school and cod_project=:cod_project) then true" +
                "    else false" +
                "  end " +
                "from dual;";
        return jdbcTemplate.queryForObject(
                sql,
                new MapSqlParameterSource("cod_school", codSchool).addValue("cod_project", codProject),
                Boolean.class
        );
    }

    public List<Project> getProjectToEvaluateBySchool(Long codSchool) {
        val sql = "select p.* from project p" +
                "  natural join project_school " +
                "where p.dt_end < current_date" +
                "      and cod_school=:cod_school" +
                "      and fl_evaluate = false";
        return jdbcTemplate.query(
                sql,
                new MapSqlParameterSource("cod_school", codSchool),
                this::build
        );
    }
}
