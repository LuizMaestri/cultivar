package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.repository.AddressRepository;
import br.ufsc.cultivar.repository.EventRepository;
import br.ufsc.cultivar.repository.ParticipationRepository;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventService {

    FileUtils fileUtils;
    EventRepository eventRepository;
    AddressRepository addressRepository;
    RatingService ratingService;
    UserService userService;
    ParticipationRepository participationRepository;

    public String upload(MultipartFile file, Long codEvent) throws ServiceException{
        try {
            return fileUtils.save(file, codEvent);
        } catch (UploadException e) {
            throw new ServiceException(e.getMessage(), e, Type.FILE);
        }
    }

    public void create(final Event event) throws ServiceException {
        val address = event.getAddress();
        val codEvent = eventRepository.create(
                event.withAddress(
                        address.withCodAddress(
                                addressRepository.create(
                                        address
                                )
                        )
                )
        );
        Optional.ofNullable(event.getParticipants())
                .orElseGet(ArrayList::new)
                .forEach(
                        user -> participationRepository.create(codEvent, user.getCpf())
                );
    }

    public List<Event> get(final Map<String, Object> filter) throws ServiceException {
        return eventRepository.get(filter);
    }

    public Event get(final Long codEvent) throws ServiceException {
        val event = eventRepository.get(codEvent);
        if (Objects.isNull(event)){
            throw new ServiceException(null, null, null);
        }
        return event.withAddress(
                addressRepository.get(
                        event.getAddress().getCodAddress()
                )
        ).withParticipants(
                userService.getParticipants(codEvent)
        ).withRatings(
                ratingService.get(codEvent)
        );
    }

    public Event delete(final Long codEvent) throws ServiceException {
        val event = get(codEvent);
        eventRepository.delete(codEvent);
        return event;
    }

    public void update(final Event event, final Long codEvent) throws ServiceException {
        if (event.getCodEvent().equals(codEvent)){
            throw new ServiceException(null, null, null);
        }
        eventRepository.update(event);
    }

    public List<Event> eventsByVolunteer(final String cpf, final Long type) {
        return eventRepository.eventsByVolunteer(cpf, type);
    }

    public List<Event> eventsBySchool(Long codSchool, Long type) {
        return eventRepository.eventsBySchool(codSchool, type);
    }
}
