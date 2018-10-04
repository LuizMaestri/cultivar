package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.model.evaluate.VolunteerQuestion;
import br.ufsc.cultivar.repository.evaluate.QuestionRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionService {
    QuestionRepository repository;

    public void create(VolunteerQuestion question) {
        repository.create(question);
    }

    public List<VolunteerQuestion> get() {
        return repository.get();
    }


    public VolunteerQuestion delete(Long codQuestion) {
        VolunteerQuestion question = repository.get(codQuestion);
        repository.delete(codQuestion);
        return question;
    }
}
