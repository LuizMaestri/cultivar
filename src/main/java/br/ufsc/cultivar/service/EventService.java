package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Event;
import br.ufsc.cultivar.models.dto.EventUsersDTO;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Logger;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */
@Log
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class EventService extends AbstractService<Event, Long> {

    PlaceService placeService;
    UserService userService;

    @Override
    @Transactional(readOnly = true)
    public Event get(Long id) throws ServiceException {
        final Event event = super.get(id);
        return event
                .withPlace(placeService.get(event.getPlace().getId()))
                .withInvolved(userService.list(event.getInvolvedCpf()));
    }

    @Override
    @Transactional
    public void associate(Long id, EventUsersDTO dto) {
        if (id.equals(dto.getCodEvent())){
            repository.dassociete(id);
            repository.associate(dto.associations());
        }
    }

    @Override
    String getMessageErrorFindOne(Long id) {
        return "Não foi possível recuperar o evento";
    }

    @Override
    String getMessageErrorList() {
        return "Não foi possível recuperar a lista de eventos.";
    }

    @Override
    Logger getLog() {
        return log;
    }
}
