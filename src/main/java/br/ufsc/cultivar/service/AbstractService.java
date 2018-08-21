package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.models.AbstractModel;
import br.ufsc.cultivar.repository.base.AbstractRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import javax.validation.Validation;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

public abstract class AbstractService<T extends AbstractModel<K>, K> {

    @Autowired
    AbstractRepository<T, K> repository;

//    @Transactional
    public K save(final T entity) throws ServiceException{
        return repository.insert(entity);
    }

    public T get(final K id) throws ServiceException {
        try {
            return repository.findOne(id);
        } catch (SQLException e) {
            getLog().severe(getMessageErrorFindOne(id));
            throw new ServiceException(getMessageErrorFindOne(id), e, Type.NOT_FOUND);
        }
    }

    public List<T> list() throws ServiceException{
        try {
            return repository.findAll();
        } catch (SQLException e) {
            getLog().severe(this::getMessageErrorList);
            throw new ServiceException(getMessageErrorList(), e);
        }
    }

    public List<T> list(Map<String, Object> map) throws ServiceException{
        try {
            return repository.findWithFilter(map);
        } catch (SQLException e) {
            getLog().severe(this::getMessageErrorList);
            throw new ServiceException(getMessageErrorList(), e);
        }
    }

    public void delete(final K id) throws ServiceException{
        repository.delete(id);
    }

    @Transactional
    public void update(final K id, final T entity) {
        repository.update(id, entity);
    }

    public void associate(final K id, Object dto) throws ServiceException{
        throw new NotImplementedException();
    }

    Boolean isValid(T entity){
        val factory = Validation.buildDefaultValidatorFactory();
        val validator = factory.getValidator();
        val validate = validator.validate(entity);
        return validate.isEmpty();
    }

    abstract String getMessageErrorFindOne(final K id);
    abstract String getMessageErrorList();
    abstract Logger getLog();

}
