package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ForbiddenException;
import br.ufsc.cultivar.exception.InvalidException;
import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.School;
import br.ufsc.cultivar.repository.AddressRepository;
import br.ufsc.cultivar.repository.SchoolRepository;
import br.ufsc.cultivar.utils.ValidateUtils;
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
public class SchoolService {

    SchoolRepository schoolRepository;
    AddressRepository addressRepository;
    UserService userService;

    public School create(final School school) throws ServiceException {
        val address = school.getAddress();
        if (!ValidateUtils.isValid(address)){
            throw new InvalidException(null);
        }
        userService.create(school.getResponsible());
        return school.withCodSchool(
                schoolRepository.create(
                        school.withAddress(
                                address.withCodAddress(
                                        addressRepository.create(address)
                                )
                        )
                )
        );
    }

    public PaginateList get(final String filter, final Long page) throws ServiceException {
        return PaginateList.builder()
                .count(schoolRepository.count(filter))
                .data(new ArrayList<>(schoolRepository.get(filter, page)))
                .build();
    }

    public School get(final Long codSchool) throws ServiceException {
        try {
            val school = schoolRepository.get(codSchool);
            return school.withAddress(
                    addressRepository.get(
                            school.getAddress().getCodAddress()
                    )
            ).withResponsible(
                    userService.get(
                            school.getResponsible().getCpf()
                    )
            );
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public School delete(final Long codSchool) throws ServiceException {
        val school = get(codSchool);
        schoolRepository.delete(codSchool);
        return school;
    }

    public void update(final School school, final Long codSchool) throws ServiceException {
        if (school.getCodSchool().equals(codSchool)){
            throw new ForbiddenException(null);
        }
        schoolRepository.update(school);
    }

    public School get(String cpf) throws NotFoundException {
        try {
            val school = schoolRepository.get(cpf);
            return school.withAddress(
                    addressRepository.get(
                            school.getAddress().getCodAddress()
                    )
            ).withResponsible(
                    userService.get(cpf)
            );
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }
}
