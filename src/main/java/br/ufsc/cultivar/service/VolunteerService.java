package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Volunteer;
import br.ufsc.cultivar.repository.VolunteerRepository;
import br.ufsc.cultivar.utils.ValidateUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VolunteerService {

    VolunteerRepository repository;
    UserService userService;
    CompanyService companyService;
    RatingService ratingService;
    AnswerService answerService;

    public void create(Volunteer volunteer) throws ServiceException {
        val user = volunteer.getUser();
        if (!ValidateUtils.isValid(user)) {
            throw new ServiceException(null, null, null);
        }
        userService.create(user);
        repository.create(volunteer);
        Optional.ofNullable(volunteer.getAnswers())
                .ifPresent(
                        answers -> answers.forEach(
                                answer -> answerService.create(
                                        answer,
                                        user.getCpf()
                                )
                        )
                );
    }

    public List<Volunteer> get(Map<String, Object> filter) throws ServiceException {
        try {
            return repository.get(filter)
                    .stream()
                    .map(volunteer -> {
                        try {
                            return volunteer.withUser(
                                    userService.get(volunteer.getUser().getCpf())
                            );
                        } catch (ServiceException e) {
                            throw new RuntimeException(e);
                        }
                    }).collect(Collectors.toList());
        } catch (RuntimeException e){
            throw new ServiceException(null, null, null);
        }
    }

    public Volunteer get(String cpf) throws ServiceException {
        val volunteer = repository.get(cpf);
        return Optional.ofNullable(repository.get(cpf))
                .orElseThrow(() -> new ServiceException(null, null, null))
                .withUser(
                        userService.get(cpf)
                ).withCompany(
                        companyService.get(
                                volunteer.getCompany().getCnpj()
                        )
                ).withAnswers(
                        answerService.get(cpf)
                ).withRatings(
                        ratingService.get(cpf)
                );
    }

    public Volunteer delete(String cpf) throws ServiceException {
        val volunteer = get(cpf);
        repository.delete(cpf);
        return volunteer;
    }

    public void update(Volunteer volunteer, String cpf) throws ServiceException {
        val user = volunteer.getUser();
        if (!user.getCpf().equals(cpf)){
            throw new ServiceException(null, null, null);
        }
        userService.update(user, cpf);
        answerService.delete(cpf);
        volunteer.getAnswers()
                .forEach(answer -> answerService.create(answer, cpf));
        repository.update(volunteer);
    }
}
