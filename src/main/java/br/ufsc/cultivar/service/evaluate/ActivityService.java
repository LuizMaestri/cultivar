package br.ufsc.cultivar.service.evaluate;

import br.ufsc.cultivar.model.evaluate.Activity;
import br.ufsc.cultivar.repository.evaluate.ActivityRepository;
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
public class ActivityService {
    ActivityRepository activityRepository;

    public void create(final Activity activity){
        activityRepository.create(activity.getName());
    }

    public List<Activity> get(){
        return activityRepository.get();
    }

    public Activity delete(final Long codActivity){
        val activity = activityRepository.get(codActivity);
        activityRepository.delete(codActivity);
        return activity;
    }
}
