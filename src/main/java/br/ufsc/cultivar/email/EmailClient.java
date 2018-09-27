package br.ufsc.cultivar.email;

import br.ufsc.cultivar.config.EmailConfig;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailClient {
    EmailConfig emailConfig;
    JavaMailSender mailSender;

    public void sendEmailSync(String to, String subject, String message){
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(emailConfig.getFrom());
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(message, true);
        };
        mailSender.send(messagePreparator);

    }

    @Async
    public CompletableFuture<Void> sendEmailAsync(String to, String subject, String message){
        sendEmailSync(to, subject, message);
        return CompletableFuture.completedFuture(null);
    }
}
