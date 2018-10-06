package br.ufsc.cultivar.dto;

import br.ufsc.cultivar.model.Address;
import br.ufsc.cultivar.model.TypeEvent;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Value
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventDTO {
    TypeEvent type;
    Address address;
    Date startOccurrence;
    Date endOccurrence;
    Boolean allDay;
}
