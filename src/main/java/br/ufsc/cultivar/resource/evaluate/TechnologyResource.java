package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.evaluate.Technology;
import br.ufsc.cultivar.service.evaluate.TechnologyService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/technology")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TechnologyResource {
    TechnologyService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@RequestBody final Technology technology) throws ServiceException {
        service.create(technology);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Technology> get() throws ServiceException{
        return service.get();
    }

    @DeleteMapping(path = "/{codTechnology}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Technology delete(@PathVariable final Long codTechnology) throws ServiceException{
        return service.delete(codTechnology);
    }
}
