package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.service.TypeEventService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/typeEvent")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeEventResource {

    TypeEventService typeEventService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final TypeEvent typeEvent) throws ServiceException {
        typeEventService.create(typeEvent);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<TypeEvent> get() throws ServiceException{
        return typeEventService.get();
    }

    @GetMapping(path = "/{tpEvent}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public TypeEvent get(@PathVariable final Long tpEvent) throws ServiceException{
        return typeEventService.get(tpEvent);
    }

    @DeleteMapping(path = "/{tpEvent}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public TypeEvent delete(@PathVariable final Long tpEvent) throws ServiceException{
        return typeEventService.delete(tpEvent);
    }

    @GetMapping(path = "/{tpEvent}/trainings", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Training> getTrainings(@PathVariable final Long tpEvent) throws ServiceException{
        return typeEventService.getTrainings(tpEvent);
    }
}
