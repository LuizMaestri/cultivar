package br.ufsc.cultivar.dto;

import br.ufsc.cultivar.model.Rating;
import br.ufsc.cultivar.model.User;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = RatingDTO.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingDTO {

    @Valid
    User participant;
    Rating rating;
    @NotNull
    Boolean presence;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
