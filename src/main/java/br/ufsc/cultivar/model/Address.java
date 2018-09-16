package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Address.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Address {
    Long codAddress;
    @NotBlank
    @NotNull
    String city;
    @NotBlank
    @NotNull
    String neighborhood;
    @NotBlank
    @NotNull
    String street;
    String number;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
