package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.*;
import br.ufsc.cultivar.model.User;
import br.ufsc.cultivar.repository.AddressRepository;
import br.ufsc.cultivar.repository.UserRepository;
import br.ufsc.cultivar.utils.ValidateUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserRepository userRepository;
    AddressRepository addressRepository;

    public void create(final User user) throws ServiceException {
        val address = user.getAddress();
        if (!ValidateUtils.isValid(address)) {
            throw new InvalidException(null);
        }
        userRepository.create(
                user.withAddress(
                        address.withCodAddress(
                                addressRepository.create(
                                        address
                                )
                        )
                )
        );

    }

    public List<User> get(final Map<String, Object> filter) throws ServiceException {
        try {
            return userRepository.get(filter);
        } catch (RuntimeException e){
            val throwable = e.getCause();
            if (throwable instanceof ServiceException) {
                throw (ServiceException) throwable;
            }
            throw e;
        }
    }

    public User get(final String cpf) throws ServiceException {
        try {
            val user = userRepository.get(cpf);
            return user.withAddress(
                    addressRepository.get(
                            user.getAddress().getCodAddress()
                    )
            );
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public User delete(final String cpf) throws ServiceException {
        val user = get(cpf);
        userRepository.delete(cpf);
        return user;
    }

    public void update(final User user, final String cpf) throws ServiceException {
        if (!user.getCpf().equals(cpf)) {
            throw new ForbiddenException(null);
        }
        if (!get(cpf).getStatus().isValid(user.getStatus())){
            throw new ConflictException(null);
        }
        userRepository.update(user);
    }
}