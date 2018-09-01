package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.service.AttachmentService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/attachment")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttachmentResource {

    AttachmentService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@RequestBody final Attachment attachment) throws ServiceException {
        service.create(attachment);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Attachment> get() throws ServiceException{
        return service.get();
    }

    @DeleteMapping(path = "/{codAttachment}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Attachment delete(@PathVariable final Long codAttachment) throws ServiceException{
        return service.delete(codAttachment);
    }

    @PutMapping(path = "/{codAttachment}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@RequestBody final Attachment attachment, @PathVariable final Long codAttachment)throws ServiceException{
        service.update(attachment, codAttachment);
    }
}
