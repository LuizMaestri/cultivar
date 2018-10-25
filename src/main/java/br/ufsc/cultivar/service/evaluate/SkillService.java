package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.model.evaluate.Skill;
import br.ufsc.cultivar.model.evaluate.Technology;
import br.ufsc.cultivar.repository.evaluate.SkillRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SkillService {
    SkillRepository repository;

    public void create(Skill skill){
        repository.create(skill);
    }

    public List<Skill> get(){
        return repository.get();
    }

    public Skill delete(Long codSkill) throws ServiceException {
        try {
            Skill skill = repository.get(codSkill);
            repository.delete(codSkill);
            return skill;
        } catch (DataAccessException e){
            throw new ServiceException(null, e, Type.NOT_FOUND);
        }
    }
}
