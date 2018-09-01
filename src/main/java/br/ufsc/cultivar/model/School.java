package br.ufsc.cultivar.model;

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
@JsonDeserialize(builder = School.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class School {
    Long codSchool;
    String name;
    String phone;
    Address address;
    User responsible;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
