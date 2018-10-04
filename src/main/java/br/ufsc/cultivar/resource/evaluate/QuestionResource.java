package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.evaluate.VolunteerQuestion;
import br.ufsc.cultivar.service.evaluate.QuestionService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
@RequestMapping(path = "/volunteerQuestion")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionResource {
    QuestionService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@RequestBody final VolunteerQuestion question) throws ServiceException {
        service.create(question);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<VolunteerQuestion> get() throws ServiceException{
        return service.get();
    }

    @DeleteMapping(path = "/{codQuestion}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public VolunteerQuestion delete(@PathVariable final Long codQuestion) throws ServiceException{
        return service.delete(codQuestion);
    }
}
