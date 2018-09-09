package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Volunteer.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Volunteer {
    User user;
    Company company;
    Schooling schooling;
    Boolean conclusion;
    String rg;
    School school;
    List<Answer> answers;
    List<Rating> ratings;

    public Double getRating() {
        return Optional.ofNullable(ratings)
                .orElse(new ArrayList<>())
                .stream()
                .mapToInt(Rating::getGrade)
                .average()
                .orElse(0.);
    }

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder{
        public Builder(){}
    }
}
