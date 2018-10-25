package br.ufsc.cultivar.model.evaluate;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = AnswerPersonality.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AnswerPersonality {
    Personality personality;
    AnswerAgreeEnum answer;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
