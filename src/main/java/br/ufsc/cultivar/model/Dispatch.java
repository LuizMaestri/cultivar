package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Dispatch.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Dispatch {
    Attachment attachment;
    Boolean send;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
