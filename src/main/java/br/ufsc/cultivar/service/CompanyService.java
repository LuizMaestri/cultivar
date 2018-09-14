package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Company;
import br.ufsc.cultivar.repository.AddressRepository;
import br.ufsc.cultivar.repository.CompanyRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyService {

    CompanyRepository companyRepository;
    UserService userService;
    AddressRepository addressRepository;

    public void create(final Company company) throws ServiceException {
        userService.create(company.getResponsible());
        val address = company.getAddress();
        companyRepository.create(
            company.withAddress(
                address.withCodAddress(
                    addressRepository.create(
                        address
                    )
                )
            )
        );
    }

    public List<Company> get(final Map<String, Object> filter) throws ServiceException {
        return companyRepository.get(filter);
    }

    public Company get(final String cnpj) throws ServiceException {
        val company = companyRepository.get(cnpj);
        return Optional.ofNullable(company)
                .orElseThrow(
                    () -> new ServiceException(null, null, null)
                ).withAddress(
                    addressRepository.get(
                        company.getAddress()
                            .getCodAddress()
                    )
                ).withResponsible(
                    userService.get(
                        company.getResponsible()
                            .getCpf()
                    )
                );
    }

    public Company delete(String cnpj) throws ServiceException {
        val company = get(cnpj);
        companyRepository.delete(cnpj);
        return Optional.ofNullable(company).orElseThrow(() -> new ServiceException(null, null, null));
    }

    public void update(Company company, String cnpj) throws ServiceException {
        if(!company.getCnpj().equals(cnpj)){
            throw new ServiceException(null, null, null);
        }
        addressRepository.update(company.getAddress());
        companyRepository.update(company);
    }
}
