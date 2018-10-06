package br.ufsc.cultivar.scheduler;

import br.ufsc.cultivar.dto.UserEventsDTO;
import br.ufsc.cultivar.email.EmailClient;
import br.ufsc.cultivar.model.User;
import br.ufsc.cultivar.service.EventService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.util.List;

@Slf4j
@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventEmailScheduler {

    SpringTemplateEngine templateEngine;
    EventService service;
    EmailClient client;

    @Scheduled(cron = "${scheduler.email.send.cron}")
    public void sendWarning(){
        service.getEventsToAlert()
            .forEach(
                userEventsDTO ->
                    client.sendEmailSync(
                        userEventsDTO.getEmail(),
                        "Eventos",
                        buildEmail(userEventsDTO)
                    )
            );
    }

    private String buildEmail(UserEventsDTO userEventsDTO){
        val context = new Context();
        context.setVariable("message", "teste");
        context.setVariable("user", userEventsDTO);
        return templateEngine.process("eventEmail", context);
    }
}
