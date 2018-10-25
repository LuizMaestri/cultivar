package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ForbiddenException;
import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Company;
import br.ufsc.cultivar.repository.AddressRepository;
import br.ufsc.cultivar.repository.CompanyRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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

    public PaginateList get(final String filter, final Long page) throws ServiceException {
        return PaginateList.builder()
            .count(companyRepository.count(filter))
            .data(
                new ArrayList<>(companyRepository.get(filter, page))
            ).build();
    }

    public Company get(final String cnpj) throws ServiceException {
        try {
            val company = companyRepository.get(cnpj);
            return company.withAddress(
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
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public Company delete(String cnpj) throws ServiceException {
        val company = get(cnpj);
        companyRepository.delete(cnpj);
        return company;
    }

    public void update(Company company, String cnpj) throws ServiceException {
        if(!company.getCnpj().equals(cnpj)){
            throw new ForbiddenException(null);
        }
        addressRepository.update(company.getAddress());
        companyRepository.update(company);
    }
}
