package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Event;
import br.ufsc.cultivar.models.dto.EventUsersDTO;
import br.ufsc.cultivar.models.dto.FileDTO;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    @SuppressWarnings("unchecked")
    public void associate(Long id, Object dto) throws ServiceException {
        if(dto instanceof EventUsersDTO) {
            EventUsersDTO associations = (EventUsersDTO) dto;
            if (id.equals(associations.getCodEvent())) {
                repository.dissociate(id);
                repository.associate(associations.associations());
                return;
            }
            throw new ServiceException("", null);
        }
        if (dto instanceof List){
            List<String> list = (List<String>) dto;
            repository.associate(list.stream().map(filename -> new FileDTO(id, filename, null)));
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
