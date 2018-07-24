package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.models.Event;
import br.ufsc.cultivar.models.dto.EventUserDTO;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */
@Log
@RequestMapping("/api/event")
@RestController
public class EventResource extends Resource<Event, Long>{

    @PostMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void associate(EventUserDTO dto){
        service.associate(dto);
    }
}
