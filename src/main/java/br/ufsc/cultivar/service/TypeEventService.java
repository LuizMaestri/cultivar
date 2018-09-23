package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.repository.TrainingRepository;
import br.ufsc.cultivar.repository.TypeEventRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeEventService {

    TypeEventRepository typeEventRepository;
    TrainingRepository trainingRepository;

    public void create(TypeEvent typeEvent) {
        val tpEvent = typeEventRepository.create(typeEvent.getName());
        typeEvent.getTrainings()
                .forEach(
                        training -> trainingRepository.create(training, tpEvent)
                );
    }

    public List<TypeEvent> get() throws ServiceException {
        return Optional.ofNullable(
            typeEventRepository.get()
        ).orElseThrow(
            () -> new ServiceException(null, null, Type.NOT_FOUND)
        );
    }

    public TypeEvent get(Long tpEvent) {
        return typeEventRepository.get(tpEvent)
                .withTrainings(trainingRepository.getByEvent(tpEvent));
    }

    public TypeEvent delete(Long tpEvent) {
        val typeEvent = get(tpEvent);
        typeEventRepository.delete(tpEvent);
        return typeEvent;
    }
}
