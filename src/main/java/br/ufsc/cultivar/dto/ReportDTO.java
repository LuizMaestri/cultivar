package br.ufsc.cultivar.dto;

import br.ufsc.cultivar.model.Rating;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = RatingDTO.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportDTO {
    String cpf;
    String user;
    String project;
    EventDTO event;
    Rating rating;
    String cnpj;
    String company;
    String school;
}
