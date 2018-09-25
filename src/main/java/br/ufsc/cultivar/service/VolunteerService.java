package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.model.Volunteer;
import br.ufsc.cultivar.repository.AnswerRepository;
import br.ufsc.cultivar.repository.QuestionRepository;
import br.ufsc.cultivar.repository.RatingRepository;
import br.ufsc.cultivar.repository.VolunteerRepository;
import br.ufsc.cultivar.utils.ValidateUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VolunteerService {

    VolunteerRepository volunteerRepository;
    UserService userService;
    CompanyService companyService;
    RatingRepository ratingRepository;
    AnswerRepository answerRepository;
    QuestionRepository questionRepository;
    DispatchService dispatchService;

    public void create(final Volunteer volunteer) throws ServiceException {
        val user = volunteer.getUser();
        if (!ValidateUtils.isValid(user)) {
            throw new ServiceException(null, null, null);
        }
        userService.create(user);
        volunteerRepository.create(volunteer);
        Optional.ofNullable(volunteer.getAnswers())
                .ifPresent(
                        answers -> answers.forEach(
                                answer -> answerRepository.create(
                                        answer,
                                        user.getCpf()
                                )
                        )
                );
    }

    public List<Volunteer> get(final List<String> filterCompany, final List<Long> filterSchool) throws ServiceException {
        try {
            return volunteerRepository.get(filterCompany, filterSchool)
                    .stream()
                    .map(volunteer -> {
                        try {
                            return volunteer.withUser(
                                userService.get(
                                    volunteer.getUser()
                                        .getCpf()
                                )
                            ).withRatings(
                                ratingRepository.get(
                                    volunteer.getUser()
                                        .getCpf()
                                )
                            );
                        } catch (ServiceException e) {
                            throw new RuntimeException(e);
                        }
                    }).collect(Collectors.toList());
        } catch (RuntimeException e){
            throw new ServiceException(null, null, null);
        }
    }

    public Volunteer get(final String cpf) throws ServiceException {
        val volunteer = volunteerRepository.get(cpf);
        return Optional.ofNullable(volunteer)
                .orElseThrow(() -> new ServiceException(null, null, Type.NOT_FOUND))
                .withUser(
                    userService.get(cpf)
                ).withCompany(
                    companyService.get(
                            volunteer.getCompany().getCnpj()
                    )
                ).withAnswers(
                    answerRepository.get(cpf)
                        .stream()
                        .map(answer -> answer.withQuestion(
                                questionRepository.get(
                                        answer.getQuestion().getCodQuestion()
                                )
                            )
                        ).collect(Collectors.toList())
                ).withRatings(
                    ratingRepository.get(cpf)
                ).withDispatches(
                    dispatchService.get(cpf)
                );
    }

    public Volunteer delete(final String cpf) throws ServiceException {
        val volunteer = get(cpf);
        volunteerRepository.delete(cpf);
        return volunteer;
    }

    public void update(final Volunteer volunteer, final String cpf) throws ServiceException {
        val user = volunteer.getUser();
        if (!user.getCpf().equals(cpf)){
            throw new ServiceException(null, null, null);
        }
        userService.update(user, cpf);
        answerRepository.delete(cpf);
        volunteer.getAnswers()
                .forEach(answer -> answerRepository.create(answer, cpf));
        volunteerRepository.update(volunteer);
    }
}
