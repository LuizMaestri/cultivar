package br.ufsc.cultivar.service;

import br.ufsc.cultivar.dto.PaginateList;
import br.ufsc.cultivar.exception.InvalidException;
import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.exception.UploadException;
import br.ufsc.cultivar.model.Training;
import br.ufsc.cultivar.model.TypeEvent;
import br.ufsc.cultivar.repository.TrainingRepository;
import br.ufsc.cultivar.repository.TypeEventRepository;
import br.ufsc.cultivar.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeEventService {

    TypeEventRepository typeEventRepository;
    TrainingRepository trainingRepository;
    FileUtils fileUtils;

    public void create(TypeEvent typeEvent, List<MultipartFile> files) throws ServiceException {
        val tpEvent = typeEventRepository.create(typeEvent.getName());
        try {
            typeEvent.getTrainings()
                .parallelStream()
                .map(training -> training.isFile() ? saveFile(training, tpEvent, files) : training)
                .forEach(
                    training -> trainingRepository.associateTypeEvent(
                        trainingRepository.create(training), tpEvent)
                );
        } catch (IllegalArgumentException e){
            typeEventRepository.delete(tpEvent);
            throw new InvalidException(null, e);
        } catch (RuntimeException e) {
            typeEventRepository.delete(tpEvent);
            val cause = e.getCause();
            if (cause instanceof UploadException){
                throw (UploadException) cause;
            } else {
                throw new ServiceException(null, e);
            }
        }
    }

    private Training saveFile(final Training training, final Long tpEvent, final List<MultipartFile> files) {
        try {
            for (MultipartFile file : files) {
                if (file.getOriginalFilename().equals(training.getPath())) {
                    return training.withPath(fileUtils.save(file, "typeEvent", tpEvent, training.getName()));
                }
            }
        } catch (UploadException e) {
            throw new RuntimeException(e);
        }
        throw new IllegalArgumentException();
    }

    public PaginateList get(final String filter, final Long page) {
        return PaginateList.builder()
                .count(typeEventRepository.count(filter))
                .data(
                    new ArrayList<>(typeEventRepository.get(filter, page))
                ).build();
    }

    public TypeEvent get(Long tpEvent) throws ServiceException {
        try {
            return typeEventRepository.get(tpEvent).withTrainings(trainingRepository.getByTypeEvent(tpEvent));
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public TypeEvent delete(Long tpEvent) throws ServiceException {
        val typeEvent = get(tpEvent);
        typeEventRepository.delete(tpEvent);
        return typeEvent;
    }

    public List<Training> getTrainings(Long tpEvent) {
        return trainingRepository.getByTypeEvent(tpEvent);
    }
}
