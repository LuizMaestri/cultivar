package br.ufsc.cultivar.resource;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Status;
import br.ufsc.cultivar.service.AttachmentService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/attachment")
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttachmentResource {

    AttachmentService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void create(@Valid @RequestPart final Attachment attachment, @RequestPart(required=false) final MultipartFile file) throws ServiceException {
        service.create(attachment, file);
    }

    @GetMapping(path = "/{status}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Attachment> get(@PathVariable final Status status) throws ServiceException{
        return service.get(status);
    }

    @GetMapping(path = "/{codAttachment}/download", produces = MediaType.APPLICATION_PDF_VALUE)
    public Resource get(@PathVariable final Long codAttachment) throws ServiceException{
        return service.getAsFile(codAttachment);
    }

    @GetMapping(path = "/page/{page}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public PaginateList get(@RequestParam(required = false) final String filter, @PathVariable final Long page) throws ServiceException{
        return service.get(filter, page);
    }

    @DeleteMapping(path = "/{codAttachment}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Attachment delete(@PathVariable final Long codAttachment) throws ServiceException{
        return service.delete(codAttachment);
    }

    @PutMapping(path = "/{codAttachment}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void update(@Valid @RequestBody final Attachment attachment, @PathVariable final Long codAttachment)throws ServiceException{
        service.update(attachment, codAttachment);
    }
}
