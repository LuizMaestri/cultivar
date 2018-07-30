package br.ufsc.cultivar.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.springframework.util.CollectionUtils;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author luiz.maestri
 * @since 24/07/2018
 */
@Value
@Wither
@Builder
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = Event.EventBuilder.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Event extends AbstractModel<Long>{

    Long id;
    @NotNull
    Place place;
    List<User> involved;
    LocalDateTime createdAt;
    @NotNull
    LocalDateTime occurrence;
    @NotNull
    Type type;

    public List<String> getInvolvedCpf(){
        return CollectionUtils.isEmpty(involved) ?
                Collections.emptyList() :
                involved.stream().map(User::getId).collect(Collectors.toList());
    }

    @JsonPOJOBuilder(withPrefix = "")
    public static class EventBuilder {
        public EventBuilder(){}
    }
}
