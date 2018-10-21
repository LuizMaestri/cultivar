package br.ufsc.cultivar.service;

import br.ufsc.cultivar.repository.TrainingRepository;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrainingService {

    FileUtils fileUtils;
    TrainingRepository trainingRepository;

    public FileSystemResource getTraining(Long codTraining) {
        return fileUtils.get(trainingRepository.get(codTraining).getPath());
    }
}
