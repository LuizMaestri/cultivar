package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.model.evaluate.Personality;
import br.ufsc.cultivar.repository.evaluate.PersonalityRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PersonalityService {
    PersonalityRepository repository;

    public void create(Personality question) {
        repository.create(question);
    }

    public List<Personality> get() {
        return repository.get();
    }


    public Personality delete(Long codQuestion) {
        Personality question = repository.get(codQuestion);
        repository.delete(codQuestion);
        return question;
    }
}
