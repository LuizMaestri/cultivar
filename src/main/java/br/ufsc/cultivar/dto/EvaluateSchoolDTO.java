package br.ufsc.cultivar.dto;

import br.ufsc.cultivar.model.evaluate.Activity;
import br.ufsc.cultivar.model.evaluate.AnswerMentoring;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = EvaluateSchoolDTO.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EvaluateSchoolDTO {

    Long codSchool;
    List<AnswerMentoring> mentoring;
    List<RatingDTO> ratings;
    List<Activity> activities;
    String suggest;
    Boolean Project;


    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
