package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.dto.EvaluateDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.repository.ParticipationRepository;
import br.ufsc.cultivar.repository.ProjectRepository;
import br.ufsc.cultivar.repository.evaluate.EvaluateRepository;
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
public class EvaluateService {
    EvaluateRepository evaluateRepository;
    ParticipationRepository participationRepository;
    ProjectRepository projectRepository;


    public void  createEvaluate(final EvaluateDTO dto, final Long codEvent, final Long codProject) throws ServiceException {
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

    public List<EvaluateDTO> get(Long codProject) {
        return evaluateRepository.getCpfs(codProject)
            .stream()
            .map(
                cpf -> EvaluateDTO.builder()
                    .cpf(cpf)
                    .answerPersonalities(
                        evaluateRepository.getAnswersVolunteer(codProject, cpf)
                    ).technologies(
                        evaluateRepository.getAnswersTechnologies(codProject, cpf)
                    ).build()
            ).collect(Collectors.toList());
    }
}
