package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.model.Rating;
import br.ufsc.cultivar.service.EventService;
import br.ufsc.cultivar.service.RatingService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path = "/event")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventResource {

    EventService eventService;
    RatingService ratingService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final Event event) throws ServiceException {
        eventService.create(event);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Set<Event> get(
            @RequestParam(value = "cod_cpf", required = false) final List<String> filterVolunteer,
           @RequestParam(value = "cod_school", required = false) final List<Long> filterSchool) throws ServiceException{
        return eventService.get(filterVolunteer, filterSchool);
    }

    @GetMapping(path = "/{codEvent}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Event get(@PathVariable final Long codEvent) throws ServiceException{
        return eventService.get(codEvent);
    }

    @DeleteMapping(path = "/{codEvent}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Event delete(@PathVariable final Long codEvent) throws ServiceException{
        return eventService.delete(codEvent);
    }

    @PutMapping(path = "/{codEvent}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@RequestBody final Event event, @PathVariable final Long codEvent)throws ServiceException{
        eventService.update(event, codEvent);
    }

    @PostMapping(path="/{codEvent}/upload", consumes = MediaType.APPLICATION_PDF_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String upload(@RequestPart final MultipartFile file, @PathVariable final Long codEvent) throws ServiceException {
        return eventService.upload(file, codEvent);
    }

    @PutMapping(path = "/{codEvent}/evaluate", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void evaluate(@RequestBody final Rating rating, @PathVariable Long codEvent){
        ratingService.create(rating, codEvent);
    }
}
