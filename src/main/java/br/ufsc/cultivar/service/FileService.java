package br.ufsc.cultivar.service;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.Type;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * @author luiz.maestri
 * @since 25/07/2018
 */
@Log
@Service
public class FileService {

    public String save(String dir, String name, MultipartFile multipart) throws ServiceException {
        String originalFileName = multipart.getOriginalFilename();
        String extesion = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = String.format("files/cultivar/%s/%s.%s", dir, name, extesion);
        return save(new File(fileName), multipart);
    }

    public String save(String dir, MultipartFile multipart) throws ServiceException {
        String fileName = String.format("files/cultivar/%s/%s", dir, multipart.getOriginalFilename());
        return save(new File(fileName), multipart);
    }

    private String save(File file, MultipartFile multipart) throws ServiceException{
        try {
//            if (file.getParentFile().mkdirs()){
//                log.info("criado diretório" + file.getParent());
//            }
//            if(file.createNewFile()) {
//                    multipart.transferTo(file);
//                    return file.getName();
//            }
            multipart.transferTo(file);
            return file.getName();
//            else {
//                throw createException(multipart.getOriginalFilename(), null);
//            }
        } catch (IOException e) {
            throw createException(multipart.getOriginalFilename(), e);
        }
    }

    private ServiceException createException(String fileName, Throwable throwable){
        return new ServiceException(String.format("Não foi possível salvar o arquivo %s.", fileName), throwable, Type.FILE);
    }
}
