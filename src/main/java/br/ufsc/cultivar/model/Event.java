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
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Value
@Wither
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = Event.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Event {
    Long codEvent;
    @NotNull
    @NotBlank
    String title;
    String details;
    @NotNull
    Date startOccurrence;
    @NotNull
    Date endOccurrence;
    Date createAt;
    @NotNull
    TypeEvent type;
    @NotNull
    Boolean allDay;
    @Valid
    @NotNull
    Address address;
    @NotNull
    Boolean evaluate;
    @Valid
    @NotNull
    School school;
    @Valid
    Project project;
    List<@Valid Training> trainings;
    @NotNull
    @NotEmpty
    List<@Valid User> participants;
    List<@Valid Rating> ratings;

    public Double getRating() {
        return Optional.ofNullable(ratings)
                .orElseGet(ArrayList::new)
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
