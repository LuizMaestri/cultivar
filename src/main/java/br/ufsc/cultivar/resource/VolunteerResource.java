package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.dto.ParticipationDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.*;
import br.ufsc.cultivar.service.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/volunteer")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VolunteerResource {

    VolunteerService volunteerService;
    DispatchService dispatchService;
    EventService eventService;
    ProjectService projectService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final Volunteer volunteer) throws ServiceException {
        volunteerService.create(volunteer);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List get(
            @RequestParam(value = "cod_cnpj", required = false) final List<String> filterCompany,
            @RequestParam(value = "cod_school", required = false) final List<Long> filterSchool,
            @RequestParam(required = false) final String filter) throws ServiceException{
        return volunteerService.get(filterCompany, filterSchool, filter, null).getData();
    }

    @GetMapping(path = "/page/{page}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PaginateList get(
            @RequestParam(value = "cod_cnpj", required = false) final List<String> filterCompany,
            @RequestParam(value = "cod_school", required = false) final List<Long> filterSchool,
            @RequestParam(required = false) final String filter,
            @PathVariable final Integer page) throws ServiceException{
        return volunteerService.get(filterCompany, filterSchool, filter, page);
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

    @GetMapping(path = "/{cpf}/event/evaluate")
    public List<Event> evaluateEvent(@PathVariable final String cpf) throws ServiceException {
        return eventService.getEventsToEvaluateByVolunteer(cpf);
    }

    @GetMapping(path = "/{cpf}/project/evaluate")
    public List<Project> evaluateProject(@PathVariable final String cpf) throws ServiceException {
        return projectService.getProjectToEvaluateByVolunteer(cpf);
    }

    @GetMapping(path = "/{cpf}/participations", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Set<ParticipationDTO> getVolunteerLocals(@PathVariable final String cpf){
        return eventService.getVolunteerLocals(cpf);
    }
}
