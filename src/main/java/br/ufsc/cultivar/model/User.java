package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import java.util.Date;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = User.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class User {
    String cpf;
    String name;
    String email;
    String password;
    Role role;
    Status status;
    Date birth;
    String job;
    String phone;
    Address address;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
