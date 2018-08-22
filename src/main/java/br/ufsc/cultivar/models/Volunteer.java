package br.ufsc.cultivar.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Value
@Wither
@Builder
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = Volunteer.VolunteerBuilder.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Volunteer extends AbstractModel<String>{

    @NotBlank
    @CPF
    @ApiModelProperty(name = "CPF", notes = "Volunteer's CPF", required = true)
    String id;
    @NotBlank
    @ApiModelProperty(notes = "Volunteer's name", required = true)
    String name;
    @Email
    @ApiModelProperty(notes = "Volunteer's email", required = true)
    String email;
    @JsonIgnore
    @NotBlank
    @ApiModelProperty(notes = "Volunteer's password", required = true)
    String password;
    @NotBlank
    @ApiModelProperty(notes = "Volunteer's contact number", required = true)
    String phone;
    @NotNull
    @Past
    @ApiModelProperty(notes = "Volunteer's birthday", required = true)
    LocalDate birth;
    @PastOrPresent
    @ApiModelProperty(notes = "Date od register creation", required = true)
    ZonedDateTime createAt;
    @NotNull
    @ApiModelProperty(notes = "Volunteer's status", required = true,
            allowableValues = "APPROVED, WAIT_RECOMMEND, RECOMMEND, WAIT_RT, WAIT_VT")
    Status status;
    @NotNull
    @ApiModelProperty(notes = "Volunteer's address", required = true)
    Address address;
    @NotNull
    @ApiModelProperty(notes = "Volunteer's company", required = true)
    Place company;
    @NotNull
    @ApiModelProperty(notes = "Volunteer's job on company", required = true)
    String job;
    @ApiModelProperty(notes = "Path to volunteer's TV")
    String pathTV;
    @ApiModelProperty(notes = "Path to volunteer's TR")
    String pathTR;

    @JsonPOJOBuilder(withPrefix = "")
    public static class VolunteerBuilder {
        public VolunteerBuilder(){}
    }
}
