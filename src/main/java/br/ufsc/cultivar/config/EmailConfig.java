package br.ufsc.cultivar.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class EmailConfig {
    @Value("${spring.mail.username}")
    String from;
}
