package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Company;
import br.ufsc.cultivar.service.CompanyService;
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
@RequestMapping(path = "/company")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyResource {

    CompanyService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final Company company) throws ServiceException {
        service.create(company);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Company> get(@RequestParam final Map<String, Object> filter) throws ServiceException{
        return service.get(filter);
    }

    @GetMapping(path = "/{cnpj}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Company get(@PathVariable final String cnpj) throws ServiceException{
        return service.get(cnpj);
    }

    @DeleteMapping(path = "/{cnpj}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Company delete(@PathVariable final String cnpj) throws ServiceException{
        return service.delete(cnpj);
    }

    @PutMapping(path = "/{cnpj}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@RequestBody final Company company, @PathVariable final String cnpj)throws ServiceException{
        service.update(company, cnpj);
    }
}