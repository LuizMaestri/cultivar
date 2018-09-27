package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.model.Project;
import br.ufsc.cultivar.service.ProjectService;
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

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody final Project project){
        projectService.create(project);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Project> get(){
        return projectService.get();
    }

    @GetMapping(path = "/{codProject}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Project get(@PathVariable final Long codProject){
        return projectService.get(codProject);
    }

    @DeleteMapping(path = "/{codProject}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Project delete(@PathVariable final Long codProject){
        return projectService.delete(codProject);
    }
}
