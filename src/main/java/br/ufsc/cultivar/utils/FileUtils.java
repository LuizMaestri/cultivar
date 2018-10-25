package br.ufsc.cultivar.utils;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Attachment;
import br.ufsc.cultivar.model.Dispatch;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Component
@Slf4j
public class FileUtils {
    public Dispatch save(final Attachment attachment, final MultipartFile multipartFile, final String cpf) throws UploadException {
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

    public String save(final MultipartFile multipartFile, final Long codEvent) throws UploadException {
        val path = String.format(
                "./files/events/%d/attachments/%d.pdf",
                codEvent,
                System.currentTimeMillis()
        );
        return save(new File(path), multipartFile);
    }

    public String save(final MultipartFile multipartFile, final String dir, final Long code, final String filename) throws UploadException {
        val path = String.format("./files/%s/%d/%s.pdf", dir, code, filename);
        val file = new File(path);
        try {
            if (file.getParentFile().mkdirs()){
                log.info("createevaluateProject dir: " + file.getParent());
            }
            Files.copy(multipartFile.getInputStream(), Paths.get(file.toURI()));
            return path;
        } catch (IOException e) {
            throw new UploadException(String.format("Não foi possível salvar o arquivo %s.", file.getPath()), e);
        }
    }

    public String saveAttachment(final MultipartFile multipartFile, final Long codAttachment) throws UploadException {
        val path = String.format(
                "./files/attachments/%d.pdf",
                codAttachment
        );
        return save(new File(path), multipartFile);
    }

    public String save(final MultipartFile multipartFile, final String filename) throws UploadException {
        val path = String.format(
                "./files/trainings/%s.pdf",
                filename
        );
        return save(new File(path), multipartFile);
    }

    private String save(final File file, final MultipartFile multipart) throws UploadException{
        try {
            if (file.getParentFile().mkdirs()){
                log.info("createevaluateProject dir: " + file.getParent());
            }
            Files.copy(multipart.getInputStream(), Paths.get(file.toURI()));
            return file.getName();
        } catch (IOException e) {
            throw new UploadException(String.format("Não foi possível salvar o arquivo %s.", file.getPath()), e);
        }
    }

    public FileSystemResource get(final Long codAttachment) {
        val path = String.format(
                "./files/attachments/%d.pdf",
                codAttachment
        );
        return new FileSystemResource(path);
    }

    public FileSystemResource get(final String path) {
        return new FileSystemResource(path);
    }
}
