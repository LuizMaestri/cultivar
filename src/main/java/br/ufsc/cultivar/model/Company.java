package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Company.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Company {
    @NotBlank
    @NotNull
    @CNPJ
    String cnpj;
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

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
