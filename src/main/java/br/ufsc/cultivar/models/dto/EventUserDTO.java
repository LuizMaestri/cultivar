package br.ufsc.cultivar.models.dto;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.List;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */

@Value
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventUserDTO {
    Long codEvent;
    List<String> involvedCpf;
}
