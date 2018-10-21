package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.service.TypeEventService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "/typeEvent")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeEventResource {

    TypeEventService typeEventService;

    @PostMapping(consumes = MediaType.ALL_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void create(@RequestPart final TypeEvent typeEvent, @RequestPart final List<MultipartFile> files) throws ServiceException {
        typeEventService.create(typeEvent, files);
    }

    @GetMapping(path = "/page/{page}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PaginateList get(@RequestParam(required = false) final String filter, @PathVariable final Long page) throws ServiceException {
        return typeEventService.get(filter, page);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List get() throws ServiceException{
        return typeEventService.get(null, null).getData();
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
