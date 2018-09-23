package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = TypeEvent.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TypeEvent {

    Long type;
    @NotNull
    @NotBlank
    String name;
    @NotNull
    @NotEmpty
    List<@Valid @NotNull Training> trainings;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
