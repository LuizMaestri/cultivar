package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Project;
import br.ufsc.cultivar.repository.ProjectRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProjectService {

    ProjectRepository projectRepository;

    public void create(Project project) {
        projectRepository.create(project);
    }

    public PaginateList get(final String filter, final Long page) {
        return PaginateList.builder()
                .count(projectRepository.count(filter))
                .data(
                    new ArrayList<>(projectRepository.get(filter, page))
                ).build();
    }

    public Project get(Long codProject) throws ServiceException {
        try {
            return projectRepository.get(codProject);
        }catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public Project delete(Long codProject) throws ServiceException {
        val project = get(codProject);
        projectRepository.delete(codProject);
        return project;
    }

    public List<Project> getProjectToEvaluateByVolunteer(final String cpf) {
        return projectRepository.getProjectToEvaluateByVolunteer(cpf);
    }
}
