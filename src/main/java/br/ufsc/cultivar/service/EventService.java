package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.repository.EventRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventService {

    EventRepository repository;
    AddressService addressService;
    TrainingService trainingService;
    RatingService ratingService;
    UserService userService;
    ParticipationService participationService;

    public void create(final Event event) throws ServiceException {
        val codEvent = repository.create(
                event.withAddress(
                        addressService.create(event.getAddress())
                )
        );
        Optional.ofNullable(event.getParticipants())
                .orElseGet(ArrayList::new)
                .forEach(
                        user -> participationService.create(codEvent, user.getCpf())
                );
        Optional.ofNullable(event.getTrainings())
                .orElseGet(ArrayList::new)
                .forEach(
                        training -> trainingService.create(training, codEvent)
                );
    }

    public List<Event> get(final Map<String, Object> filter) throws ServiceException {
        return repository.get(filter);
    }

    public Event get(final Long codEvent) throws ServiceException {
        val event = repository.get(codEvent);
        if (Objects.isNull(event)){
            throw new ServiceException(null, null, null);
        }
        return event.withAddress(
                addressService.get(
                        event.getAddress().getCodAddress()
                )
        ).withParticipants(
                userService.getParticipants(codEvent)
        ).withRatings(
                ratingService.get(codEvent)
        ).withTrainings(
                trainingService.getByEvent(codEvent)
        );
    }

    public Event delete(final Long codEvent) throws ServiceException {
        val event = get(codEvent);
        repository.delete(codEvent);
        return event;
    }

    public void update(final Event event, final Long codEvent) throws ServiceException {
        if (event.getCodEvent().equals(codEvent)){
            throw new ServiceException(null, null, null);
        }
        event.getTrainings().forEach(training -> {
            trainingService.deleteByEvent(codEvent);
            trainingService.create(training, codEvent);
        });
        repository.update(event);
    }
}
