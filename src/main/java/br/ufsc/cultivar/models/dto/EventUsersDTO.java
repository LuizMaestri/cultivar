package br.ufsc.cultivar.models.dto;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */

@Value
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventUsersDTO {
    @NotNull
    Long codEvent;
    List<String> involvedCpf;

    public List<EventUser> associations(){
        return involvedCpf.stream()
                .map(cpf -> new EventUser(codEvent, cpf))
                .collect(Collectors.toList());
    }

    @Value
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public class EventUser {
        Long codEvent;
        String codCpf;
    }
}
