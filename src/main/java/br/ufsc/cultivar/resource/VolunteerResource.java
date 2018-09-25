package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.*;
import br.ufsc.cultivar.service.DispatchService;
import br.ufsc.cultivar.service.EventService;
import br.ufsc.cultivar.service.RatingService;
import br.ufsc.cultivar.service.VolunteerService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "/volunteer")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VolunteerResource {

    VolunteerService volunteerService;
    RatingService ratingService;
    DispatchService dispatchService;
    EventService eventService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final Volunteer volunteer) throws ServiceException {
        volunteerService.create(volunteer);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Volunteer> get(
            @RequestParam(value = "cod_cnpj", required = false) final List<String> filterCompany,
            @RequestParam(value = "cod_school", required = false) final List<Long> filterSchool) throws ServiceException{
        return volunteerService.get(filterCompany, filterSchool);
    }

    @GetMapping(path = "/{cpf}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Volunteer get(@PathVariable final String cpf) throws ServiceException{
        return volunteerService.get(cpf);
    }

    @DeleteMapping(path = "/{cpf}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Volunteer delete(@PathVariable final String cpf) throws ServiceException{
        return volunteerService.delete(cpf);
    }

    @PutMapping(path = "/{cpf}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@RequestBody final Volunteer volunteer, @PathVariable final String cpf)throws ServiceException{
        volunteerService.update(volunteer, cpf);
    }

    @GetMapping(path = {"/{cpf}/event", "/{cpf}/event/{type}"})
    public List<Event> getEvents(@PathVariable final String cpf, @PathVariable(required = false) final Long type){
        return eventService.eventsByVolunteer(cpf, type);
    }

    @GetMapping(path = "/{cpf}/attachment/{codAttachment}")
    public Dispatch getDispatch(@PathVariable final String cpf, @PathVariable Long codAttachment){
        return dispatchService.get(cpf, codAttachment);
    }

    @PostMapping(path="/{cpf}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void upload(@RequestPart final Attachment attachment, @RequestPart final MultipartFile file,
                           @PathVariable final String cpf) throws ServiceException {
        dispatchService.save(attachment, file, cpf);
    }
    
    @PutMapping(path = "/{cpf}/evaluate", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void evaluate(@RequestBody final Rating rating, @PathVariable String cpf) throws ServiceException {
        ratingService.create(rating, cpf);
    }
}
