package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.dto.EvaluateDTO;
import br.ufsc.cultivar.dto.EvaluateSchoolDTO;
import br.ufsc.cultivar.dto.EvaluateVolunteerDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.repository.EventRepository;
import br.ufsc.cultivar.repository.ParticipationRepository;
import br.ufsc.cultivar.repository.ProjectRepository;
import br.ufsc.cultivar.repository.RatingRepository;
import br.ufsc.cultivar.repository.evaluate.EvaluateRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EvaluateService {
    EvaluateRepository evaluateRepository;
    ParticipationRepository participationRepository;
    ProjectRepository projectRepository;
    RatingRepository ratingRepository;
    EventRepository eventRepository;

    public void createEvaluate(final EvaluateDTO dto, final Long codEvent, final Long codProject) throws ServiceException {
        try {
            Optional.ofNullable(dto.getSchoolDTO())
                    .ifPresent(
                            evaluateSchoolDTO -> {
                                try {
                                    createEvaluate(evaluateSchoolDTO, codEvent, codProject);
                                } catch (ServiceException e) {
                                    throw new RuntimeException(e);
                                }
                            }
                    );
            Optional.ofNullable(dto.getVolunteerDTO())
                    .ifPresent(
                            evaluateVolunteerDTO -> {
                                try {
                                    createEvaluate(evaluateVolunteerDTO, codEvent, codProject);
                                } catch (ServiceException e) {
                                    throw new RuntimeException(e);
                                }
                            }
                    );
        } catch (RuntimeException e){
            log.error(e.getMessage());
            val ex = e.getCause();
            if (ex instanceof ServiceException) {
                throw (ServiceException) ex;
            } else {
                throw new ServiceException(null, ex);
            }
        }
    }

    private void createEvaluate(EvaluateSchoolDTO evaluateSchoolDTO, Long codEvent, Long codProject) throws ServiceException {
        val codSchool = evaluateSchoolDTO.getCodSchool();
        evaluateSchoolDTO.getMentoring()
                .forEach(
                        answerMentoring -> evaluateRepository.saveMentoring(answerMentoring, codEvent, codProject, codSchool)
                );
        evaluateSchoolDTO.getActivities()
                .forEach(
                        activity -> evaluateRepository.saveActivity(activity.getCodActivity(), codEvent, codProject, codSchool)
                );
        evaluateSchoolDTO.getRatings()
                .forEach(
                        ratingDTO -> {
                            val cpf = ratingDTO.getParticipant().getCpf();
                            val rating =  ratingDTO.getRating();
                            if (evaluateSchoolDTO.getProject()) {
                                ratingRepository.createRatingOnProject(rating, cpf, codProject);
                            } else {
                                ratingRepository.createRatingOnEvent(rating, cpf, codEvent);
                            }
                        }
                );
        val suggest = evaluateSchoolDTO.getSuggest();
        if (!StringUtils.isEmpty(suggest)){
            evaluateRepository.saveSuggest(suggest, codSchool, codProject, codEvent);
        }
        Optional.ofNullable(codEvent).ifPresent(aLong -> eventRepository.updateEvaluate(codEvent));
        Optional.ofNullable(codProject).ifPresent(aLong -> projectRepository.updateEvaluate(codProject, codSchool));
    }


    public void createEvaluate(final EvaluateVolunteerDTO dto, final Long codEvent, final Long codProject) throws ServiceException {
        val cpf = dto.getCpf();
        dto.getTechnologies()
                .forEach(
                        answerTechnology -> evaluateRepository.saveTechnology(answerTechnology, codEvent, codProject, cpf)
                );
        dto.getAnswerPersonalities()
                .forEach(
                        answerVolunteer -> evaluateRepository.savePersonality(answerVolunteer, codEvent, codProject, cpf)
                );
        dto.getSkills()
                .forEach(
                        skill -> evaluateRepository.saveSkill(skill.getCodSkill(), codEvent, codProject, cpf)
                );
        dto.getMentoring()
                .forEach(
                        answerMentoring -> evaluateRepository.saveMentoring(answerMentoring, codEvent, codProject, cpf)
                );
        val again = dto.getAgain();
        again.getActivities()
                .forEach(
                        activity -> evaluateRepository.saveActivity(activity.getCodActivity(), codEvent, codProject, cpf)
                );
        evaluateRepository.saveAgain(dto.getAgain(), codEvent, codProject, cpf);
        evaluateRepository.saveExperience(dto.getExperience(), codEvent, codProject, cpf);
        Optional.ofNullable(codEvent).ifPresent(aLong -> participationRepository.updateEvaluate(codEvent, cpf));
        Optional.ofNullable(codProject).ifPresent(aLong -> projectRepository.updateEvaluate(codProject, cpf));
    }

    public List<EvaluateVolunteerDTO> get(Long codProject) {
        return evaluateRepository.getCpfs(codProject)
            .stream()
            .map(
                cpf -> EvaluateVolunteerDTO.builder()
                    .cpf(cpf)
                    .answerPersonalities(
                        evaluateRepository.getAnswersVolunteer(codProject, cpf)
                    ).technologies(
                        evaluateRepository.getAnswersTechnologies(codProject, cpf)
                    ).build()
            ).collect(Collectors.toList());
    }
}
