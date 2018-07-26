package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Volunteer;
import br.ufsc.cultivar.service.FileService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Log
@RequestMapping("/api/volunteer")
@RestController
public class VolunteerResource extends Resource<Volunteer, String> {

    @Autowired
    private FileService fileService;

    @PutMapping(value = "/{id}/tv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadTV(@PathVariable String id, @RequestParam MultipartFile file) throws ServiceException {
        String fileName = fileService.save(id, "tv", file);
        service.associate(id, fileName);
    }

    @PutMapping(value = "/{id}/tr", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void uploadTR(@PathVariable String id, @RequestParam MultipartFile file)throws ServiceException {
        String fileName = fileService.save(id, "tr", file);
        service.associate(id, fileName);
    }
}
