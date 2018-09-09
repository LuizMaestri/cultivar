package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Dispatch;
import br.ufsc.cultivar.repository.DispatchRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DispatchService {

    DispatchRepository repository;
    FileService fileService;

    public void save(final Attachment attachment, final MultipartFile file, final String cpf) throws ServiceException {
        Dispatch dispatch = fileService.save(attachment, file, cpf);
        repository.save(dispatch, cpf);
    }

    public Dispatch get(final String cpf, final Long codAttachment) {
        return repository.get(cpf, codAttachment);
    }
}
