package br.ufsc.cultivar.security;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.NotBlank;

@Value
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = AuthRequestDTO.AuthRequestDTOBuilder.class)
class AuthRequestDTO {
    @CPF
    String cpf;
    @NotBlank
    String password;

    @JsonPOJOBuilder(withPrefix = "")
    public static class AuthRequestDTOBuilder{}
}
