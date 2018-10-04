package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.model.evaluate.Technology;
import br.ufsc.cultivar.repository.evaluate.TechnologyRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TechnologyService {
    TechnologyRepository repository;

    public void create(Technology technology) throws ServiceException {
        repository.create(technology);
    }

    public List<Technology> get() throws ServiceException {
        return repository.get();
    }


    public Technology delete(Long codTechnology) throws ServiceException {
        Technology technology = repository.get(codTechnology);
        Optional.ofNullable(technology).orElseThrow(() -> new ServiceException(null, null, Type.NOT_FOUND));
        repository.delete(codTechnology);
        return technology;
    }
}
