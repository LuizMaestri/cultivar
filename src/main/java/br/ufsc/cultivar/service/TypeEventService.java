package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.repository.TrainingRepository;
import br.ufsc.cultivar.repository.TypeEventRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public PaginateList get(final String filter, final Long page) {
        return PaginateList.builder()
                .count(typeEventRepository.count(filter))
                .data(
                    new ArrayList<>(typeEventRepository.get(filter, page))
                ).build();
    }

    public TypeEvent get(Long tpEvent) {
        return typeEventRepository.get(tpEvent)
                .withTrainings(trainingRepository.getByTypeEvent(tpEvent));
    }

    public TypeEvent delete(Long tpEvent) {
        val typeEvent = get(tpEvent);
        typeEventRepository.delete(tpEvent);
        return typeEvent;
    }

    public List<Training> getTrainings(Long tpEvent) {
        return trainingRepository.getByTypeEvent(tpEvent);
    }
}
