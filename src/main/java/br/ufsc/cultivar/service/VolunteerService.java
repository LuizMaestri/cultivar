package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.email.EmailClient;
import br.ufsc.cultivar.exception.*;
import br.ufsc.cultivar.model.Volunteer;
import br.ufsc.cultivar.repository.*;
import br.ufsc.cultivar.utils.ValidateUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VolunteerService {

    VolunteerRepository volunteerRepository;
    UserService userService;
    UserRepository userRepository;
    CompanyService companyService;
    RatingRepository ratingRepository;
    AnswerRepository answerRepository;
    QuestionRepository questionRepository;
    EventRepository eventRepository;
    DispatchService dispatchService;
    EmailClient emailClient;
    SpringTemplateEngine templateEngine;

    public void create(final Volunteer volunteer) throws ServiceException {
        val user = volunteer.getUser();
        if (!ValidateUtils.isValid(user)) {
            throw new InvalidException(null);
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
        emailClient.sendEmailAsync(user.getEmail(), "Bem vindo", buildEmail());
    }

    private String buildEmail(){
        val context = new Context();
        context.setVariable("message", "teste volunteer");
        return templateEngine.process("newVolunteerEmail", context);
    }

    public Volunteer get(final String cpf) throws ServiceException {
        try {
            val volunteer = volunteerRepository.get(cpf);
            return volunteer.withUser(
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
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public Volunteer delete(final String cpf) throws ServiceException {
        val hasEvents = eventRepository.eventsByVolunteer(cpf, null)
                .stream()
                .filter(
                        event -> event.getEndOccurrence()
                                .after(new Date())
                ).collect(Collectors.toList())
                .isEmpty();
        if(hasEvents){
            throw new PreconditionException(null);
        }
        val volunteer = get(cpf);
        volunteerRepository.delete(cpf);
        return volunteer;
    }

    public void update(final Volunteer volunteer, final String cpf) throws ServiceException {
        val user = volunteer.getUser();
        if (!user.getCpf().equals(cpf)){
            throw new ForbiddenException(null);
        }
        val oldUser = userRepository.get(cpf);
        if (!oldUser.getStatus().isValid(user.getStatus())){
            throw new ConflictException(null);
        }
        userRepository.update(user);
        answerRepository.delete(cpf);
        volunteer.getAnswers()
                .forEach(answer -> answerRepository.create(answer, cpf));
        volunteerRepository.update(volunteer);
    }

    public PaginateList get(final List<String> filterCompany, final List<Long> filterSchool,
                            final String filter, final Integer page) throws ServiceException {
        try {
            return PaginateList.builder()
                .count(volunteerRepository.count(filterCompany, filterSchool, filter))
                .data(
                    volunteerRepository.get(filterCompany, filterSchool, filter, page)
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
                        }).collect(Collectors.toList())
                ).build();
        } catch (RuntimeException e){
            val cause = e.getCause();
            if (cause instanceof NotFoundException){
                throw (NotFoundException) cause;
            } else {
                throw new ServiceException(null, e);
            }
        }
    }
}
