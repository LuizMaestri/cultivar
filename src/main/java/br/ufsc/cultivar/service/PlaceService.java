package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.models.Place;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Logger;

@Log
@Service
public class PlaceService extends AbstractService<Place, String> {

    @Autowired
    AddressService addressService;

    @Override
    @Transactional
    public String save(final Place entity) throws ServiceException {
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
        return "Não foi possível encontrar a empresa/escola com cnpj: " + id + ".";
    }

    @Override
    String getMessageErrorList() {
        return "Não foi possível recuperar a lista de empresas/escolas.";
    }

    @Override
    Logger getLog() {
        return log;
    }
}
