package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Role;
import br.ufsc.cultivar.model.evaluate.Mentoring;
import br.ufsc.cultivar.model.evaluate.Personality;
import br.ufsc.cultivar.service.evaluate.MentoringService;
import br.ufsc.cultivar.service.evaluate.PersonalityService;
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
@RequestMapping(path = "/mentoring")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MentoringResource {
    MentoringService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@Valid @RequestBody final Mentoring question){
        service.create(question);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Mentoring> get() throws ServiceException{
        return service.get();
    }

    @GetMapping(path="/{responds}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Mentoring> get(@PathVariable Role responds) throws ServiceException{
        return service.get(responds);
    }

    @DeleteMapping(path = "/{codQuestion}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Mentoring delete(@PathVariable final Long codQuestion) throws ServiceException{
        return service.delete(codQuestion);
    }
}