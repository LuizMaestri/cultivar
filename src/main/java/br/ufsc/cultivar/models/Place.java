package br.ufsc.cultivar.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Value
@Wither
@Builder
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = Place.PlaceBuilder.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel("Company/School")
public class Place extends AbstractModel<String>{

    @NotBlank
    @CNPJ
    @ApiModelProperty(name = "CNPJ", notes = "Company/School's CNPJ", required = true)
    String id;
    @NotBlank
    @ApiModelProperty(notes = "Name of company/school", required = true)
    String name;
    @NotBlank
    @ApiModelProperty(notes = "Contact number of company/school", required = true)
    String phone;
    @NotNull
    @ApiModelProperty(notes = "Flag for identify school from companies")
    Boolean school;
    @NotNull
    @ApiModelProperty(notes = "User responsible in the company/school", required = true)
    User responsible;
    @NotNull
    @ApiModelProperty(notes = "Address of company/school", required = true)
    Address address;

    @JsonPOJOBuilder(withPrefix = "")
    public static class PlaceBuilder {
        public PlaceBuilder(){}
    }
}
