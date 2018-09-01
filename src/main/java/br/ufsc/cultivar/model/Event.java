package br.ufsc.cultivar.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import lombok.val;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
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
    Date startOccurrence;
    Date endOccurrence;
    Date createAt;
    TypeEvent type;
    Boolean allDay;
    Address address;
    List<Training> trainings;
    List<User> participants;
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
