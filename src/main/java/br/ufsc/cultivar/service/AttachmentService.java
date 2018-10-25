package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.ForbiddenException;
import br.ufsc.cultivar.exception.InvalidException;
import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
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
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttachmentService {

    AttachmentRepository repository;
    FileUtils fileUtils;

    public void create(final Attachment attachment, final MultipartFile file) throws ServiceException {
        if(attachment.getDownload() && Objects.isNull(file)){
            throw new InvalidException(null);
        }
        val codAttachment = repository.create(attachment);
        if (attachment.getDownload()){
            fileUtils.saveAttachment(file, codAttachment);
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
        try {
            return repository.get(codAttachment);
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public Resource getAsFile(final Long codAttachment) throws ServiceException {
        return fileUtils.get(get(codAttachment).getCodAttachment());
    }

    public Attachment delete(final Long codAttachment) throws ServiceException {
        val attachment = get(codAttachment);
        repository.delete(codAttachment);
        return attachment;
    }

    public void update(final Attachment attachment, final Long codAttachment) throws ServiceException {
        if (attachment.getCodAttachment().equals(codAttachment)){
            throw new ForbiddenException(null);
        }
        repository.update(attachment);
    }
}
