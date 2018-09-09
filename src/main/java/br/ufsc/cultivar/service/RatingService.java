package br.ufsc.cultivar.service;

import br.ufsc.cultivar.model.Rating;
import br.ufsc.cultivar.repository.RatingRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingService {

    RatingRepository repository;

    public void create(Rating rating, String cpf) {
        repository.create(rating, cpf);
    }

    public void create(Rating rating, Long codEvent) {
        repository.create(rating, codEvent);
    }

    public List<Rating> get(String cpf) {
        return repository.get(cpf);
    }

    public List<Rating> get(Long codEvent) {
        return repository.get(codEvent);
    }
}
