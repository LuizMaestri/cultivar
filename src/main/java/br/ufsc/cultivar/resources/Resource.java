package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.AbstractModel;
import br.ufsc.cultivar.service.AbstractService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

public class Resource<T extends AbstractModel<K>,K> {

    @Autowired
    AbstractService<T,K> service;

    @SuppressWarnings("unchecked")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public T  create(@Valid @RequestBody final T entity) throws ServiceException{
        val id = service.save(entity);
        if (id == null){
            return entity;
        }
        return (T) entity.withId(id);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<T> list() throws ServiceException {
        return service.list();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public T get(@PathVariable final K id) throws ServiceException {
        return service.get(id);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable final K id){
        service.delete(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable final K id, @Valid @RequestBody final T entity){
        if (!id.equals(entity.getId())){
            throw new IllegalArgumentException();
        }
        service.update(id, entity);
    }
}
