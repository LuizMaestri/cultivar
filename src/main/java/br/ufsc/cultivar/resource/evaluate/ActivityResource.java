package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.evaluate.Activity;
import br.ufsc.cultivar.model.evaluate.Mentoring;
import br.ufsc.cultivar.service.evaluate.ActivityService;
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
@RequestMapping(path = "/activity")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ActivityResource {

    ActivityService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@Valid @RequestBody final Activity activity) {
        service.create(activity);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Activity> get() throws ServiceException{
        return service.get();
    }

    @DeleteMapping(path = "/{codQuestion}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Activity delete(@PathVariable final Long codQuestion) throws ServiceException{
        return service.delete(codQuestion);
    }
}
