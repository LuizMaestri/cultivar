package br.ufsc.cultivar.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.validation.constraints.NotBlank;

@Value
@Wither
@Builder
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = Address.AddressBuilder.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Address extends AbstractModel<Long>{

    @ApiModelProperty(notes = "The database generated company/school ID", allowEmptyValue = true)
    Long id;
    @NotBlank
    @ApiModelProperty(notes = "City of address", required = true)
    String city;
    @NotBlank
    @ApiModelProperty(notes = "Neighborhood of address", required = true)
    String neighborhood;
    @NotBlank
    @ApiModelProperty(notes = "Street od address", required = true)
    String street;
    @ApiModelProperty(notes = "Street number")
    String number;

    @JsonPOJOBuilder(withPrefix = "")
    public static class AddressBuilder {
        public AddressBuilder(){}
    }
}
