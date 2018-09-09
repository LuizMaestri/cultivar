package br.ufsc.cultivar.service;

import br.ufsc.cultivar.repository.ParticipationRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ParticipationService {

    ParticipationRepository repository;

    public void create(Long codEvent, String cpf) {
        repository.create(codEvent, cpf);
    }
}
