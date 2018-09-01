package br.ufsc.cultivar.service;

import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.repository.TrainingRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrainingService {

    TrainingRepository repository;

    public Training create(final Training training, final Long codEvent) {
        return training.withCodTraining(
                repository.create(training, codEvent)
        );
    }

    List<Training> getByEvent(final Long codEvent) {
        return repository.getByEvent(codEvent);
    }

    public Training get(final Long codTraining){
        return repository.get(codTraining);
    }

    void deleteByEvent(Long codEvent) {
        repository.deleteByEvent(codEvent);
    }
}
