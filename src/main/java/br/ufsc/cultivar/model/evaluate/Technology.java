package br.ufsc.cultivar.model.evaluate;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Technology.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Technology {

    Long codTechnology;
    String name;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
