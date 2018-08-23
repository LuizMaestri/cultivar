package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Volunteer;
import br.ufsc.cultivar.service.FileService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Log
@RequestMapping("/api/volunteer")
@RestController
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VolunteerResource extends Resource<Volunteer, String> {

    FileService fileService;

    @PutMapping(value = "/{id}/tv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadTV(@PathVariable String id, @RequestParam MultipartFile file) throws ServiceException {
        fileService.save(id, "tv", file);
    }

    @PutMapping(value = "/{id}/tr", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadTR(@PathVariable String id, @RequestParam MultipartFile file)throws ServiceException {
        fileService.save(id, "tr", file);
        service.associate(id, "tr");
    }

    @GetMapping(value = "/{id}/tv", produces = MediaType.APPLICATION_PDF_VALUE)
    public FileSystemResource getTV(@PathVariable String id) {
        return fileService.get(id, "tv");
    }

    @GetMapping(value = "/{id}/tr", produces = MediaType.APPLICATION_PDF_VALUE)
    public FileSystemResource getTR(@PathVariable String id) {
        return fileService.get(id, "tr");
    }
}
