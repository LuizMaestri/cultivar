package br.ufsc.cultivar.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = ParticipationDTO.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ParticipationDTO {
    String city;
    String neighborhood;
    String street;
    String number;
    String school;
}
