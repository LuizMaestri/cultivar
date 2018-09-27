package br.ufsc.cultivar.scheduler;

import br.ufsc.cultivar.email.EmailClient;
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

@Slf4j
@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventEmailScheduler {

    SpringTemplateEngine templateEngine;
    EmailClient client;

    @Scheduled(cron = "${scheduler.email.send.cron}")
    public void sendWarning(){
        log.info("try send email");
        client.sendEmailSync(
                "luizricardomaestri@gmail.com",
                "Eventos",
                buildEmail()
        );
        log.info("email sent");
    }

    private String buildEmail(){
        val context = new Context();
        context.setVariable("message", "teste");
        return templateEngine.process("eventEmail", context);
    }
}
