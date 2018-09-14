package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Dispatch;
import br.ufsc.cultivar.repository.DispatchRepository;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DispatchService {

    DispatchRepository repository;
    FileUtils fileUtils;

    public void save(final Attachment attachment, final MultipartFile file, final String cpf) throws ServiceException {
        try {
            repository.save(fileUtils.save(attachment, file, cpf), cpf);
        } catch (UploadException e) {
            throw new ServiceException(null, null, Type.FILE);
        }
    }

    public Dispatch get(final String cpf, final Long codAttachment) {
        return repository.get(cpf, codAttachment);
    }

    public List<Dispatch> get(String cpf) throws ServiceException {
        return Optional.ofNullable(repository.get(cpf))
                .orElseThrow(() -> new ServiceException(null, null, Type.NOT_FOUND));
    }
}
