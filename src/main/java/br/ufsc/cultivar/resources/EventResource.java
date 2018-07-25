package br.ufsc.cultivar.resources;

import br.ufsc.cultivar.models.Event;
import br.ufsc.cultivar.models.dto.EventUsersDTO;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */
@Log
@RequestMapping("/api/event")
@RestController
public class EventResource extends Resource<Event, Long>{

    @PutMapping(value = "/{id}/associete",consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void associate(@PathVariable Long id,@RequestBody @Valid EventUsersDTO dto){
        service.associate(id, dto);
    }
}
