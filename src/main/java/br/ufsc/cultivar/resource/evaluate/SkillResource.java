package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.evaluate.Skill;
import br.ufsc.cultivar.service.evaluate.SkillService;
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
@RequestMapping(path = "/skill")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SkillResource {
    SkillService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@Valid @RequestBody final Skill skill){
        service.create(skill);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Skill> get() throws ServiceException{
        return service.get();
    }

    @DeleteMapping(path = "/{codSkill}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Skill delete(@PathVariable final Long codSkill) throws ServiceException{
        return service.delete(codSkill);
    }
}
