package br.ufsc.cultivar.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Value
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserEventsDTO {
    String email;
    String name;
    List<EventDTO> events;
}
