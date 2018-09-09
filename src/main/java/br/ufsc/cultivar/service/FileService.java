package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Dispatch;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@Slf4j
public class FileService {
    public Dispatch save(final Attachment attachment, final MultipartFile multipartFile, final String cpf) throws ServiceException {
        val path = String.format(
                "./files/users/%s/attachments/%s.pdf",
                cpf,
                attachment.getName()
                        .replaceAll(" ", "_")
        );
        val file = new File(path);
        save(file, multipartFile);
        return Dispatch.builder().attachment(attachment).send(true).build();
    }

    public String save(final MultipartFile multipartFile, final Long codEvent) throws ServiceException {
        val path = String.format(
                "./files/events/%d/attachments/%d.pdf",
                codEvent,
                System.currentTimeMillis()
        );
        return save(new File(path), multipartFile);
    }

    public String saveAttachment(final MultipartFile multipartFile, final Long codAttachment) throws ServiceException {
        val path = String.format(
                "./files/attachments/%d.pdf",
                codAttachment
        );
        return save(new File(path), multipartFile);
    }

    private String save(final File file, final MultipartFile multipart) throws ServiceException{
        try {
            if (file.getParentFile().mkdirs()){
                log.info("create dir: " + file.getParent());
            }
            Files.copy(multipart.getInputStream(), Paths.get(file.toURI()));
            return file.getName();
        } catch (IOException e) {
            throw new ServiceException(String.format("Não foi possível salvar o arquivo %s.", file.getPath()), e, Type.FILE);
        }
    }
}
