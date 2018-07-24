package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Volunteer;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Logger;

@Log
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class VolunteerService extends AbstractService<Volunteer, String> {

    private final AddressService addressService;

    @Override
    @Transactional
    public String save(final Volunteer entity) throws ServiceException{
        val address = entity.getAddress();
        if (addressService.isValid(address)){
            throw new ServiceException("Endreço inválido.", null);
        }
        val codAddress = addressService.save(address);
        return super.save(
                entity.withAddress(
                        address.withId(codAddress)
                )
        );
    }

    @Override
    String getMessageErrorFindOne(final String id) {
        return "Não foi possivel encontrar o voluntário com cpf " + id;
    }

    @Override
    String getMessageErrorList() {
        return "Não foi prossivel recuperar a lista de voluntários";
    }

    @Override
    public Logger getLog() {
        return log;
    }
}
