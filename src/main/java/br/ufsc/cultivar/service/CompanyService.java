package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Company;
import br.ufsc.cultivar.repository.CompanyRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyService {

    CompanyRepository repository;
    UserService userService;
    AddressService addressService;

    public void create(final Company company) throws ServiceException {
        userService.create(company.getResponsible());
        repository.create(
            company.withAddress(
                addressService.create(
                    company.getAddress()
                )
            )
        );
    }

    public List<Company> get(final Map<String, Object> filter) throws ServiceException {
        return repository.get(filter);
    }

    public Company get(final String cnpj) throws ServiceException {
        val company = repository.get(cnpj);
        if (Objects.isNull(company)){
            throw new ServiceException(null, null, null);
        }
        return company.withAddress(
                addressService.get(
                        company.getAddress().getCodAddress()
                )
        ).withResponsible(
                userService.get(
                        company.getResponsible().getCpf()
                )
        );
    }

    public Company delete(String cnpj) throws ServiceException {
        val company = get(cnpj);
        repository.delete(cnpj);
        return company;
    }

    public void update(Company company, String cnpj) throws ServiceException {
        if(company.getCnpj().equals(cnpj)){
            throw new ServiceException(null, null, null);
        }
        addressService.update(company.getAddress());
        repository.update(company);
    }
}
