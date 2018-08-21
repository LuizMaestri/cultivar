package br.ufsc.cultivar.service;

import br.ufsc.cultivar.models.Address;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.stereotype.Service;

import javax.validation.Validation;
import java.util.logging.Logger;

@Log
@Service
public class AddressService extends AbstractService<Address, Long> {

    @Override
    String getMessageErrorFindOne(final Long id) {
        return "Não foi possível encontrar o endereço solicitado.";
    }

    @Override
    String getMessageErrorList() {
        return "Não foi possível recuperar a lista de endereços.";
    }

    @Override
    Logger getLog() {
        return log;
    }
}
