package br.ufsc.cultivar.dto;

import br.ufsc.cultivar.model.evaluate.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = EvaluateDTO.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EvaluateDTO {

    String cpf;
    Long project;
    List<AnswerTechnology> technologies;
    List<AnswerPersonality> answerPersonalities;
    Experience experience;
    List<AnswerMentoring> mentoring;
    List<Skill> skills;

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
