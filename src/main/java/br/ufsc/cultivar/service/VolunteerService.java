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

import java.sql.SQLException;
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
    @Transactional
    public void associate(String id, Object dto) throws ServiceException {
        if (dto instanceof String){
            try {
                Volunteer volunteer = repository.findOne(id);
                if (volunteer.getStatus().in(Status.WAIT_TV, Status.WAIT_TR)) {
                    String fileName = dto.toString();
                    String type = fileName.substring(
                            fileName.lastIndexOf("/"),
                            fileName.lastIndexOf(".")
                    );
                    repository.associate(
                            new FileDTO<>(id, fileName, type)
                    );
                    switch (type) {
                        case "tv": {
                            repository.update(id, volunteer.withStatus(Status.WAIT_RECOMMEND));
                            break;
                        }
                        case "tr": {
                            repository.update(id, volunteer.withStatus(Status.WAIT_TV));
                            break;
                        }
                        default: throw new ServiceException(getMessageErrorFindOne(id), null, Type.INVALID);
                    }
                } else {
                    throw new ServiceException(getMessageErrorFindOne(id), null, Type.INVALID);
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

