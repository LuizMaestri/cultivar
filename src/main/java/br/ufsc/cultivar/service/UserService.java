package br.ufsc.cultivar.service;

import br.ufsc.cultivar.models.User;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.stereotype.Service;

import javax.validation.Validation;
import java.util.List;
import java.util.logging.Logger;

@Log
@Service
public class UserService extends AbstractService<User, String> {

    Boolean isValid(User user){
        val factory = Validation.buildDefaultValidatorFactory();
        val validator = factory.getValidator();
        val validate = validator.validate(user);
        return validate.isEmpty();
    }

    @Override
    String getMessageErrorFindOne(final String id) {
        return "Não foi possível encontrar o usuário com cpf: " + id + ".";
    }

    @Override
    String getMessageErrorList() {
        return "Não foi possível recuperar a lista de usuários.";
    }

    @Override
    public Logger getLog() {
        return log;
    }

    List<User> list(List<String> cpfs) {
        return repository.findIds(cpfs);
    }
}
