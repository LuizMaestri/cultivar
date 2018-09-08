package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Answer;
import br.ufsc.cultivar.repository.AnswerRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AnswerService {

    AnswerRepository repository;
    QuestionService questionService;

    public void create(final Answer answer, final String cpf) {
        repository.create(answer, cpf);
    }

    public List<Answer> get(String cpf) throws ServiceException {
        try {
            return repository.get(cpf).stream().map(answer -> {
                try {
                    return answer.withQuestion(
                            questionService.get(
                                    answer.getQuestion().getCodQuestion()
                            )
                    );
                } catch (ServiceException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList());
        } catch (RuntimeException e){
            val throwable = e.getCause();
            if (throwable instanceof ServiceException) {
                throw (ServiceException) throwable;
            }
            throw e;
        }
    }

    public void delete(String cpf) {
        repository.delete(cpf);
    }
}
