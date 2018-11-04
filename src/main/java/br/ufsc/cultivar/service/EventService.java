package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.ParticipationDTO;
import br.ufsc.cultivar.dto.UserEventsDTO;
import br.ufsc.cultivar.exception.*;
import br.ufsc.cultivar.model.Event;
import br.ufsc.cultivar.model.Role;
import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.repository.*;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventService {

    FileUtils fileUtils;
    EventRepository eventRepository;
    AddressRepository addressRepository;
    UserRepository userRepository;
    ParticipationRepository participationRepository;
    TrainingRepository trainingRepository;
    ProjectRepository projectRepository;


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
        val project = event.getProject();
        Optional.ofNullable(event.getParticipants())
                .orElseGet(ArrayList::new)
                .forEach(
                    user -> {
                        val cpf = user.getCpf();
                        participationRepository.create(codEvent, cpf);
                        Optional.ofNullable(project)
                                .ifPresent(
                                        project1 -> {
                                            if (!projectRepository.alreadyAssociate(project.getCodProject(), cpf))
                                            projectRepository.associate(project.getCodProject(), cpf);
                                        }
                                );
                    }
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
            throw new InvalidException(null, e);
        } catch (RuntimeException e) {
            eventRepository.delete(codEvent);
            addressRepository.delete(codAddress);
            val cause = e.getCause();
            if (cause instanceof UploadException){
                throw (UploadException) cause;
            } else {
                throw new ServiceException(null, e);
            }
        }
    }

    public Set<Event> get(final List<String> filterVolunteer, final List<Long> filterSchool,
                          final Long filterProject) throws ServiceException {
        return new HashSet<>(eventRepository.get(filterVolunteer, filterSchool, filterProject));
    }

    public Event get(final Long codEvent) throws ServiceException {
        try {
            val event = eventRepository.get(codEvent);
            val type = event.getType();
            return event.withAddress(
                    addressRepository.get(
                            event.getAddress().getCodAddress()
                    )
            ).withParticipants(
                    userRepository.getParticipants(codEvent)
            ).withTrainings(
                    trainingRepository.getByEvent(codEvent)
            ).withType(
                    type.withTrainings(
                            trainingRepository.getByTypeEvent(
                                    type.getType()
                            )
                    )
            );
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public Event delete(final Long codEvent) throws ServiceException {
        val event = get(codEvent);
        eventRepository.delete(codEvent);
        return event;
    }

    public void update(final Event event, final Long codEvent) throws ServiceException {
        if (event.getCodEvent().equals(codEvent)){
            throw new ForbiddenException(null);
        }
        eventRepository.update(event);
    }

    public Set<ParticipationDTO> getVolunteerLocals(final String codCpf){
        return new HashSet<>(participationRepository.getVolunteerLocals(codCpf));
    }

    public List<Event> eventsByVolunteer(final String cpf, final Long type) {
        return eventRepository.eventsByVolunteer(cpf, type);
    }

    public List<Event> eventsBySchool(final Long codSchool, final Long type) {
        return eventRepository.eventsBySchool(codSchool, type)
            .parallelStream()
            .map(
                event -> event.withParticipants(
                    userRepository.getParticipants(
                        event.getCodEvent()
                    )
                )
            ).collect(Collectors.toList());
    }

    public List<UserEventsDTO> getEventsToAlert() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("dsc_role", Role.VOLUNTEER);
        return userRepository.get(map)
            .parallelStream()
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

    public List<Event> getEventsToEvaluateBySchool(final Long codSchool) {
        return eventRepository.getEventsToEvaluateBySchool(codSchool);
    }
}
