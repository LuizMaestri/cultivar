package br.ufsc.cultivar.security;

import br.ufsc.cultivar.model.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

@Value
@Wither
@Builder(builderClassName = "Builder")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = AuthResponseDTO.Builder.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
class AuthResponseDTO {
    User user;
    String token;

    @JsonPOJOBuilder(withPrefix = "")
    static class Builder{}
}
