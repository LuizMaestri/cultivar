package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.models.Status;
import br.ufsc.cultivar.models.Volunteer;
import br.ufsc.cultivar.models.dto.FileDTO;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.sql.SQLException;
import java.util.logging.Logger;

import static br.ufsc.cultivar.models.Status.*;
import static br.ufsc.cultivar.models.Status.WAIT_TV;

@Log
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class VolunteerService extends AbstractService<Volunteer, String> {

    private final AddressService addressService;

    @Override
    @Transactional
    public String save(final Volunteer entity) throws ServiceException{
        val address = entity.getAddress();
        if (!addressService.isValid(address)){
            throw new ServiceException("Endreço inválido.", null, Type.INVALID);
        }
        val codAddress = addressService.save(address);
        return super.save(
                entity.withAddress(
                        address.withId(codAddress)
                )
        );
    }

    @Override
    public void delete(String id) throws ServiceException {
        Volunteer volunteer = get(id);
        super.delete(id);
        addressService.delete(volunteer.getAddress().getId());
    }

    @Override
    @Transactional
    public void associate(String id, Object dto) throws ServiceException {
        if (dto instanceof String){
            try {
                Volunteer volunteer = repository.findOne(id);
                switch (volunteer.getStatus()) {
                    case WAIT_TV: {
                        repository.update(id, volunteer.withStatus(RECOMMEND));
                        break;
                    }
                    case WAIT_TR: {
                        repository.update(id, volunteer.withStatus(WAIT_TV));
                        break;
                    }
                    default: throw new ServiceException(getMessageErrorFindOne(id), null, Type.INVALID);
                }

            } catch (SQLException e) {
                throw new ServiceException(getMessageErrorFindOne(id), e, Type.NOT_FOUND);
            }
        }
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

