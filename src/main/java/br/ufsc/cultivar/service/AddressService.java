package br.ufsc.cultivar.service;

import br.ufsc.cultivar.model.Address;
import br.ufsc.cultivar.repository.AddressRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressService {

    AddressRepository repository;

    public Address create(final Address address) {
        return address.withCodAddress(
            repository.create(address)
        );
    }

    public Address get(Long codAddress) {
        return repository.get(codAddress);
    }

    public void update(Address address) {
        repository.update(address);
    }
}
