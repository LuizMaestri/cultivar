package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Event;
import br.ufsc.cultivar.models.dto.EventUsersDTO;
import br.ufsc.cultivar.service.FileService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */
@Log
@RequestMapping("/api/event")
@RestController
public class EventResource extends Resource<Event, Long>{

    @Autowired
    private FileService fileService;

    @PutMapping(value = "/{id}/associate",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void associate(@PathVariable Long id,@RequestBody @Valid EventUsersDTO dto) throws ServiceException {
        service.associate(id, dto);
    }

    @PutMapping(value = "/{id}/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void upload(@PathVariable Long id, @RequestParam MultipartFile[] files) throws ServiceException {
        try {
            service.associate(id,
                    Arrays.stream(files).map(file -> {
                        try {
                            return fileService.save(String.valueOf(id), file);
                        } catch (ServiceException e) {
                            throw new RuntimeException(e);
                        }
                    }).collect(Collectors.toList())
            );
        } catch (RuntimeException e){
            if (e.getCause() instanceof ServiceException) {
                throw (ServiceException) e.getCause();
            }
            e.printStackTrace();
        }
    }
}
