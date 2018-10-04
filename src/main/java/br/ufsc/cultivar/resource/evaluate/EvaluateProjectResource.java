package br.ufsc.cultivar.resource.evaluate;

import br.ufsc.cultivar.dto.EvaluateDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.service.evaluate.EvaluateService;
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
@RequestMapping(path = "/evaluate/project")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EvaluateProjectResource {

    EvaluateService evaluateService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody @Valid final EvaluateDTO dto) throws ServiceException {
        evaluateService.create(dto);
    }

    @GetMapping(path = "/{codProject}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<EvaluateDTO> get(@PathVariable final Long codProject){
        return evaluateService.get(codProject);
    }
}
