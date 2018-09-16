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
import javax.validation.constraints.NotNull;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = School.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class School {
    Long codSchool;
    @NotBlank
    @NotNull
    String name;
    @NotBlank
    @NotNull
    String phone;
    @Valid
    @NotNull
    Address address;
    @Valid
    @NotNull
    User responsible;
    @NotNull
    SchoolType type;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
