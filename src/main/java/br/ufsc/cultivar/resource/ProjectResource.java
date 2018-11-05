package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.dto.EvaluateDTO;
import br.ufsc.cultivar.dto.EvaluateVolunteerDTO;
import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Project;
import br.ufsc.cultivar.service.ProjectService;
import br.ufsc.cultivar.service.evaluate.EvaluateService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/project")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProjectResource {

    ProjectService projectService;
    EvaluateService evaluateService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody final Project project){
        projectService.create(project);
    }

    @GetMapping(path = "/page/{page}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PaginateList get(@RequestParam(required = false) final String filter, @PathVariable final Long page) throws ServiceException {
        return projectService.get(filter, page);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List get(){
        return projectService.get((String)null, null).getData();
    }

    @GetMapping(path = "/{codProject}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Project get(@PathVariable final Long codProject, @RequestParam(required = false) Boolean withParticipants) throws ServiceException {
        return projectService.get(codProject, withParticipants);
    }

    @DeleteMapping(path = "/{codProject}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Project delete(@PathVariable final Long codProject) throws ServiceException {
        return projectService.delete(codProject);
    }

    @PostMapping(path = "/{codProject}/evaluate", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void evaluate(@Valid @RequestBody final EvaluateDTO evaluate, @PathVariable final Long codProject) throws ServiceException {
        evaluateService.createEvaluate(evaluate, null, codProject);
    }
}
