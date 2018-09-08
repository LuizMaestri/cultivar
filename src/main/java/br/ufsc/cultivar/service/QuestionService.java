package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Question;
import br.ufsc.cultivar.model.Role;
import br.ufsc.cultivar.repository.QuestionRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionService {

    QuestionRepository repository;

    public void create(final Question question) throws ServiceException {
        repository.create(question);
    }

    public List<Question> get() throws ServiceException {
        return repository.get();
    }

    public List<Question> get(Role responds) throws ServiceException {
        return repository.get(responds);
    }

    public Question get(final Long codQuestion) throws ServiceException {
        return repository.get(codQuestion);
    }

    public Question delete(final Long codQuestion) throws ServiceException {
        val question = get(codQuestion);
        repository.delete(codQuestion);
        return question;
    }

    public void update(final Question question, final Long codQuestion) throws ServiceException {
        if (question.getCodQuestion().equals(codQuestion)){
            throw new ServiceException(null, null, null);
        }
        repository.update(question);
    }
}
