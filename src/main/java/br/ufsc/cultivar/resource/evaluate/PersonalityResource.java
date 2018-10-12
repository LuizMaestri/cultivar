package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.evaluate.Personality;
import br.ufsc.cultivar.service.evaluate.PersonalityService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/personality")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PersonalityResource {
    PersonalityService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@RequestBody final Personality question) throws ServiceException {
        service.create(question);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Personality> get() throws ServiceException{
        return service.get();
    }

    @DeleteMapping(path = "/{codQuestion}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Personality delete(@PathVariable final Long codQuestion) throws ServiceException{
        return service.delete(codQuestion);
    }
}
