package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Status;
import br.ufsc.cultivar.repository.AttachmentRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AttachmentService {

    AttachmentRepository repository;

    public void create(final Attachment attachment) throws ServiceException {
        repository.create(attachment);
    }

    public List<Attachment> get() throws ServiceException {
        return repository.get();
    }
    public List<Attachment> get(final Status status) throws ServiceException {
        return repository.get(status);
    }

    public Attachment get(final Long codAttachment) throws ServiceException {
        return repository.get(codAttachment);
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
