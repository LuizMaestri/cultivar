package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.User;
import br.ufsc.cultivar.service.CompanyService;
import br.ufsc.cultivar.service.UserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/user")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserResource {

    UserService service;

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<User> get(@RequestParam final Map<String, Object> filter) throws ServiceException{
        return service.get(filter);
    }

    @GetMapping(path = "/{cpf}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User get(@PathVariable final String cpf) throws ServiceException{
        return service.get(cpf);
    }

    @DeleteMapping(path = "/{cpf}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public User delete(@PathVariable final String cpf) throws ServiceException{
        return service.delete(cpf);
    }

    @PutMapping(path = "/{cpf}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@Valid @RequestBody final User user, @PathVariable final String cpf)throws ServiceException{
        service.update(user, cpf);
    }
}
