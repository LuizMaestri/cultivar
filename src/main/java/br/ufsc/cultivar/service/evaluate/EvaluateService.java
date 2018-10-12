package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.dto.EvaluateDTO;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.repository.evaluate.EvaluateRepository;
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
public class EvaluateService {
    EvaluateRepository repository;

    public void create(EvaluateDTO dto) throws ServiceException {
        val cpf = dto.getCpf();
        val codProject = dto.getProject();
        dto.getTechnologies()
            .forEach(
                answerTechnology -> repository.saveTechnology(answerTechnology, codProject, cpf)
            );
        dto.getAnswerPersonalities()
                .forEach(
                        answerVolunteer -> repository.saveAnswerVolunteer(answerVolunteer, codProject, cpf)
                );
        repository.saveExperience(dto.getExperience(), codProject, cpf);
    }

    public List<EvaluateDTO> get(Long codProject) {
        return repository.getCpfs(codProject)
            .stream()
            .map(
                cpf -> EvaluateDTO.builder()
                    .cpf(cpf)
                    .project(codProject)
                    .answerPersonalities(
                        repository.getAnswersVolunteer(codProject, cpf)
                    ).technologies(
                        repository.getAnswersTechnologies(codProject, cpf)
                    ).build()
            ).collect(Collectors.toList());
    }
}
