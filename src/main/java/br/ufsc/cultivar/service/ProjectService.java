package br.ufsc.cultivar.service;

import br.ufsc.cultivar.model.Project;
import br.ufsc.cultivar.repository.ProjectRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProjectService {

    ProjectRepository projectRepository;

    public void create(Project project) {
        projectRepository.create(project);
    }

    public List<Project> get() {
        return projectRepository.get();
    }

    public Project get(Long codProject) {
        return projectRepository.get(codProject);
    }

    public Project delete(Long codProject) {
        val project = get(codProject);
        projectRepository.delete(codProject);
        return project;
    }
}
