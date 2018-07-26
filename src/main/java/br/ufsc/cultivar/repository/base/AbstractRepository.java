package br.ufsc.cultivar.repository.base;

import br.ufsc.cultivar.models.User;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public abstract class AbstractRepository<T, K> {

    @Autowired
    protected NamedParameterJdbcTemplate jdbcTemplate;

    @SuppressWarnings("unchecked")
    public K insert(final T entity) {
        val sql = getInsertQuery();
        val params = getInsertParams(entity);
        val keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(sql, params, keyHolder);
        return (K) Optional.of(keyHolder)
                .map(GeneratedKeyHolder::getKey)
                .map(Number::longValue)
                .filter(newId -> newId.getClass().equals(this.getIdClass()))
                .orElse(null);
    }

    public List<T> findAll() throws SQLException{
        try {
            return jdbcTemplate.query(getSelectAllQuery(), (rs, i) -> this.build(rs));
        } catch (RuntimeException e){
            throw (SQLException) e.getCause();
        }
    }

    public T findOne(final K id) throws SQLException {
        val sql = getSelectOneQuery();
        val params = new MapSqlParameterSource("id", id);
        try {
            return jdbcTemplate.query(sql, params, this::build);
        } catch (RuntimeException e){
            throw (SQLException) e.getCause();
        }
    }

    public void delete(final K id) {
        val params = new MapSqlParameterSource(getIdFieldName(), id);
        jdbcTemplate.update(getDeleteQuery(), params);
    }

    public void update(final K id, final T entity){
        val sql = getUpdateQuery();
        val params = getUpdateParams(id, entity);
        jdbcTemplate.update(sql, params);
    }

    private String getSelectOneQuery() {
        return getSelectAllQuery() + "WHERE " + getIdFieldName() + "=:id";
    }

    protected abstract T build(final ResultSet rs);
    protected abstract String getInsertQuery();
    protected abstract MapSqlParameterSource getInsertParams(final T entity);
    protected abstract String getSelectAllQuery();
    protected abstract String getIdFieldName();
    protected abstract String getDeleteQuery();
    protected abstract String getUpdateQuery();
    protected abstract MapSqlParameterSource getUpdateParams(final K id, final T entity);
    abstract Class<K> getIdClass();

    public List<User> find(List<K> ids) {
        throw new NotImplementedException();
    }

    public void associate(Object associations) {
        throw new NotImplementedException();
    }

    public void dissociate(K id){
        throw new NotImplementedException();
    }
}
