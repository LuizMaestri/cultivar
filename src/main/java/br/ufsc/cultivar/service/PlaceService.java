package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.models.Place;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Log
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class PlaceService extends AbstractService<Place, String> {

    AddressService addressService;
    UserService userService;

    @Override
    public String save(final Place entity) throws ServiceException {
        val address = entity.getAddress();
        if (!addressService.isValid(address)){
            throw new ServiceException("Endreço inválido.", null, Type.INVALID);
        }
        val responsible = entity.getResponsible();
        if (!userService.isValid(responsible)){
            throw new ServiceException("Usuário responsável inválido.", null, Type.INVALID);
        }
        val codAddress = addressService.save(address);
        userService.save(responsible);
        return super.save(
                entity.withAddress(
                        address.withId(codAddress)
                )
        );
    }

    @Override
    public void delete(String id) throws ServiceException{
        Place place = get(id);
        super.delete(id);
        addressService.delete(place.getAddress().getId());
        userService.delete(place.getResponsible().getId());
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
