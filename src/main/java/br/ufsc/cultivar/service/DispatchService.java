package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Dispatch;
import br.ufsc.cultivar.repository.AttachmentRepository;
import br.ufsc.cultivar.repository.DispatchRepository;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DispatchService {

    DispatchRepository repository;
    AttachmentRepository attachmentRepository;
    FileUtils fileUtils;

    public void save(final Attachment attachment, final MultipartFile file, final String cpf) throws ServiceException {
        repository.save(fileUtils.save(attachment, file, cpf), cpf);
    }

    public Dispatch get(final String cpf, final Long codAttachment) throws NotFoundException {
        try {
            return repository.get(cpf, codAttachment)
                .withAttachment(
                    attachmentRepository.get(codAttachment)
                );
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public FileSystemResource getFile(final String cpf, final Long codAttachment) throws NotFoundException{
        val dispatch = get(cpf, codAttachment);
        val path = String.format(
                "./files/users/%s/attachments/%s.pdf",
                cpf,
                dispatch.getAttachment().getName().replaceAll(" ", "_")
        );
        return fileUtils.get(path);
    }

    public List<Dispatch> get(String cpf) throws ServiceException {
        return repository.get(cpf)
            .stream()
            .map(
                dispatch -> dispatch.withAttachment(
                    attachmentRepository.get(
                        dispatch.getAttachment().getCodAttachment()
                    )
                )
            ).collect(Collectors.toList());
    }
}
