package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Question;
import br.ufsc.cultivar.model.Role;
import br.ufsc.cultivar.service.QuestionService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/question")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionResource {

    QuestionService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final Question question) throws ServiceException {
        service.create(question);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Question> get() throws ServiceException{
        return service.get();
    }

    @GetMapping(path = "/{responds}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Question> get(@PathVariable final Role responds) throws ServiceException{
        return service.get(responds);
    }

    @DeleteMapping(path = "/{codQuestion}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Question delete(@PathVariable final Long codQuestion) throws ServiceException{
        return service.delete(codQuestion);
    }

    @PutMapping(path = "/{codQuestion}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@RequestBody final Question question, @PathVariable final Long codQuestion)throws ServiceException{
        service.update(question, codQuestion);
    }
}
