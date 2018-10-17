package br.ufsc.cultivar.dto;

import br.ufsc.cultivar.model.Answer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Value;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Value
@Builder(builderClassName = "Builder")
@JsonDeserialize(builder = PaginateList.Builder.class)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaginateList<T> {
    Integer count;
    List<T> data;
}
