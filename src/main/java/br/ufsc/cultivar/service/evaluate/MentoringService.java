package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.model.evaluate.Mentoring;
import br.ufsc.cultivar.repository.evaluate.MentoringRepository;
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
public class MentoringService {

    MentoringRepository repository;

    public void create(Mentoring mentoring){
        repository.create(mentoring);
    }

    public List<Mentoring> get(){
        return repository.get();
    }

    public Mentoring delete(Long codQuestion){
        val mentoring = repository.get(codQuestion);
        repository.delete(codQuestion);
        return mentoring;
    }
}
