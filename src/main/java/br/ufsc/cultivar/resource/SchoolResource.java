package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.model.School;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.service.EventService;
import br.ufsc.cultivar.service.SchoolService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/school")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SchoolResource {
    SchoolService service;
    EventService eventService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final School school) throws ServiceException {
        service.create(school);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List get(@RequestParam final Map<String, Object> filter) throws ServiceException{
        return service.get(filter, null).getData();
    }

    @GetMapping(path = "/page/{page}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PaginateList get(@RequestParam final Map<String, Object> filter, @PathVariable final Long page) throws ServiceException{
        return service.get(filter, page);
    }

    @GetMapping(path = "/{codSchool}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public School get(@PathVariable final Long codSchool) throws ServiceException{
        return service.get(codSchool);
    }

    @GetMapping(path = {"/{codSchool}/event", "/{codSchool}/event/{type}"}, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Event> getEvents(@PathVariable final Long codSchool, @PathVariable(required = false) final Long type){
        return eventService.eventsBySchool(codSchool, type);
    }

    @DeleteMapping(path = "/{codSchool}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public School delete(@PathVariable final Long codSchool) throws ServiceException{
        return service.delete(codSchool);
    }

    @PutMapping(path = "/{codSchool}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@RequestBody final School school, @PathVariable final Long codSchool)throws ServiceException{
        service.update(school, codSchool);
    }
}
