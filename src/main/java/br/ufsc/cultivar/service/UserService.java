package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.User;
import br.ufsc.cultivar.repository.UserRepository;
import br.ufsc.cultivar.utils.ValidateUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserRepository repository;
    AddressService addressService;

    public void create(final User user) throws ServiceException {
        val address = user.getAddress();
        if (!ValidateUtils.isValid(address)) {
            throw new ServiceException(null, null, null);
        }
        repository.create(
                user.withAddress(
                        addressService.create(
                                address
                        )
                )
        );

    }

    public List<User> get(final Map<String, Object> filter) throws ServiceException {
        try {
            return repository.get(filter);
        } catch (RuntimeException e){
            val throwable = e.getCause();
            if (throwable instanceof ServiceException) {
                throw (ServiceException) throwable;
            }
            throw e;
        }
    }

    public User get(final String cpf) throws ServiceException {
        val user = repository.get(cpf);
        return user.withAddress(
                addressService.get(
                        user.getAddress().getCodAddress()
                )
        );
    }

    public User delete(final String cpf) throws ServiceException {
        val user = get(cpf);
        repository.delete(cpf);
        return user;
    }

    public void update(final User user, final String cpf) throws ServiceException {
        if (user.getCpf().equals(cpf)) {
            throw new ServiceException(null, null, null);
        }
        if (!get(cpf).getStatus().isValid(user.getStatus())){
            throw new ServiceException(null, null, null);
        }
        repository.update(user);
    }

    List<User> getParticipants(final Long codEvent) {
        return repository.getParticipants(codEvent);
    }
}