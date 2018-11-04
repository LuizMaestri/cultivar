package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Volunteer.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Volunteer {
    @Valid
    @NotNull
    User user;
    @Valid
    @NotNull
    Company company;
    @NotNull
    Schooling schooling;
    @NotNull
    Boolean conclusion;
    @NotBlank
    @NotNull
    String course;
    @NotBlank
    @NotNull
    String rg;
    School school;
    List<@Valid Dispatch> dispatches;
    @NotNull
    @NotEmpty
    List<Answer> answers;
    List<@Valid Rating> ratings;

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
