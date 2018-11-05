package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.exception.NotFoundException;
import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.model.Role;
import br.ufsc.cultivar.model.evaluate.Activity;
import br.ufsc.cultivar.repository.evaluate.ActivityRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ActivityService {
    ActivityRepository activityRepository;

    public void create(final Activity activity){
        activityRepository.create(activity);
    }

    public List<Activity> get(){
        return activityRepository.get();
    }

    public Activity delete(final Long codActivity) throws ServiceException{
        try {
            Activity activity = activityRepository.get(codActivity);
            activityRepository.delete(codActivity);
            return activity;
        } catch (DataAccessException e){
            throw new NotFoundException(null, e);
        }
    }

    public List<Activity> get(Role responds) {
        return activityRepository.get(responds);
    }
}
