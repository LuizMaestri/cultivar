package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.evaluate.Technology;
import br.ufsc.cultivar.repository.evaluate.TechnologyRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TechnologyService {
    TechnologyRepository repository;

    public void create(Technology technology){
        repository.create(technology);
    }

    public List<Technology> get() throws ServiceException {
        return repository.get();
    }


    public Technology delete(Long codTechnology) throws ServiceException {
        try {
            Technology technology = repository.get(codTechnology);
            repository.delete(codTechnology);
            return technology;
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }
}
