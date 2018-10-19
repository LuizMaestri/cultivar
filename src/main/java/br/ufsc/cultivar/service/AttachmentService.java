package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Status;
import br.ufsc.cultivar.repository.AttachmentRepository;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttachmentService {

    AttachmentRepository repository;
    FileUtils fileUtils;

    public void create(final Attachment attachment, final MultipartFile file) throws ServiceException {
        if(attachment.getDownload() && Objects.isNull(file)){
            throw new ServiceException(null, null, null);
        }
        val codAttachment = repository.create(attachment);
        if (attachment.getDownload()){
            try {
                fileUtils.saveAttachment(file, codAttachment);
            } catch (UploadException e) {
                throw new ServiceException(e.getMessage(), e, Type.FILE);
            }
        }
    }

    public PaginateList get(final String filter, final Long page) throws ServiceException {
        return PaginateList.builder()
                .data(
                        new ArrayList<>(repository.get(filter, page))
                ).count(
                        repository.count(filter)
                ).build();
    }
    public List<Attachment> get(final Status status) throws ServiceException {
        return repository.get(status);
    }

    public Attachment get(final Long codAttachment) throws ServiceException {
        val attachment = repository.get(codAttachment);
        return Optional.ofNullable(attachment)
            .orElseThrow(() -> new ServiceException(null, null, null));
    }

    public Resource getAsFile(final Long codAttachment) throws ServiceException {
        return fileUtils.get(
            Optional.ofNullable(repository.get(codAttachment))
                .orElseThrow(
                    () -> new ServiceException(null, null, Type.NOT_FOUND)
                ).getCodAttachment()
        );
    }

    public Attachment delete(final Long codAttachment) throws ServiceException {
        val attachment = get(codAttachment);
        repository.delete(codAttachment);
        return attachment;
    }

    public void update(final Attachment attachment, final Long codAttachment) throws ServiceException {
        if (attachment.getCodAttachment().equals(codAttachment)){
            throw new ServiceException(null, null, null);
        }
        repository.update(attachment);
    }
}
