package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.ParticipationDTO;
import br.ufsc.cultivar.dto.UserEventsDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.repository.*;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

import static br.ufsc.cultivar.exception.Type.FILE;
import static br.ufsc.cultivar.exception.Type.INVALID;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventService {

    FileUtils fileUtils;
    EventRepository eventRepository;
    AddressRepository addressRepository;
    RatingRepository ratingRepository;
    UserRepository userRepository;
    ParticipationRepository participationRepository;
    TrainingRepository trainingRepository;

    private Training saveFile(final Training training, final Long codEvent, final List<MultipartFile> files) {
        try {
            for (MultipartFile file : files) {
                if (file.getOriginalFilename().equals(training.getPath())) {
                    return training.withPath(fileUtils.save(file, "event", codEvent, training.getName()));
                }
            }
        } catch (UploadException e) {
            throw new RuntimeException(e);
        }
        throw new IllegalArgumentException();
    }

    public void create(final Event event, final List<MultipartFile> files) throws ServiceException {
        val address = event.getAddress();
        val codAddress = addressRepository.create(address);
        val codEvent = eventRepository.create(
            event.withAddress(
                address.withCodAddress(codAddress)
            )
        );
        Optional.ofNullable(event.getParticipants())
                .orElseGet(ArrayList::new)
                .forEach(
                    user -> participationRepository.create(codEvent, user.getCpf())
                );
        try {
            event.getTrainings()
                    .parallelStream()
                    .map(training -> training.isFile() ? saveFile(training, codEvent, files) : training)
                    .forEach(
                            training -> trainingRepository.associateEvent(
                                    trainingRepository.create(training), codEvent)
                    );
        } catch (IllegalArgumentException e){
            eventRepository.delete(codEvent);
            addressRepository.delete(codAddress);
            throw new ServiceException(null, e, INVALID);
        } catch (RuntimeException e) {
            eventRepository.delete(codEvent);
            addressRepository.delete(codAddress);
            val cause = e.getCause();
            throw new ServiceException(cause.getMessage(), cause, FILE);
        }
    }

    public Set<Event> get(final List<String> filterVolunteer, final List<Long> filterSchool,
                          final Long filterProject) throws ServiceException {
        return new HashSet<>(eventRepository.get(filterVolunteer, filterSchool, filterProject));
    }

    public Event get(final Long codEvent) throws ServiceException {
        val event = Optional.ofNullable(eventRepository.get(codEvent))
            .orElseThrow(() -> new ServiceException(null, null, null));
        val type = event.getType();
        return event.withAddress(
            addressRepository.get(
                event.getAddress().getCodAddress()
            )
        ).withParticipants(
            userRepository.getParticipants(codEvent)
        ).withRatings(
            ratingRepository.get(codEvent)
        ).withTrainings(
            trainingRepository.getByEvent(codEvent)
        ).withType(
            type.withTrainings(
                trainingRepository.getByTypeEvent(
                    type.getType()
                )
            )
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

    public Set<ParticipationDTO> getVolunteerLocals(final String codCpf){
        return new HashSet<>(participationRepository.getVolunteerLocals(codCpf));
    }

    public List<Event> eventsByVolunteer(final String cpf, final Long type) {
        return eventRepository.eventsByVolunteer(cpf, type);
    }

    public List<Event> eventsBySchool(Long codSchool, Long type) {
        return eventRepository.eventsBySchool(codSchool, type);
    }

    public List<UserEventsDTO> getEventsToAlert() {
        return userRepository.get((Map<String, Object>) null)
            .stream()
            .map(
                user ->
                    UserEventsDTO.builder()
                        .email(user.getEmail())
                        .name(user.getName())
                        .events(
                            eventRepository.getEventsToAlert(user.getCpf())
                        ).build()
            ).collect(Collectors.toList());
    }

    public List<Event> getEventsToEvaluateByVolunteer(final String cpf) {
        return eventRepository.getEventsToEvaluateByVolunteer(cpf);
    }
}
