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
import java.util.Date;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = User.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class User {
    String cpf;
    @NotBlank
    @NotNull
    String name;
    @NotBlank
    @NotNull
    String email;
    @NotBlank
    String password;
    @NotNull
    Role role;
    @NotNull
    Status status;
    @NotNull
    Date birth;
    @NotBlank
    @NotNull
    String job;
    @NotBlank
    @NotNull
    String phone;
    @Valid
    @NotNull
    Address address;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
