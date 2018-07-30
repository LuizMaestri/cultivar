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

@Value
@Wither
@Builder
@EqualsAndHashCode(callSuper = true)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@JsonDeserialize(builder = User.UserBuilder.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User extends AbstractModel<String>{

    @NotBlank
    @CPF
    @ApiModelProperty(name = "CPF", notes = "User's CPF", required = true)
    String id;
    @NotBlank
    @ApiModelProperty(notes = "User's name", required = true)
    String name;
    @Email
    @ApiModelProperty(notes = "User's email", required = true)
    String email;
    @JsonIgnore
    @NotBlank
    @ApiModelProperty(notes = "User's password", required = true)
    String password;
    @NotBlank
    @ApiModelProperty(notes = "User's contact number", required = true)
    String phone;
    @NotNull
    @Past
    @ApiModelProperty(notes = "User's birthday", required = true)
    LocalDate birth;
    @PastOrPresent
    @ApiModelProperty(notes = "Date od register creation")
    LocalDateTime createAt;
    @NotNull
    @ApiModelProperty(notes = "User's status", required = true,
            allowableValues = "APPROVED, WAIT_RECOMMEND, RECOMMEND, WAIT_RT, WAIT_VT")
    Status status;
    @NotNull
    @ApiModelProperty(notes = "User's role", required = true,
            allowableValues = "ADMIN, VOLUNTEER, COMPANY_ADMIN, SCHOOL_ADMIN")
    Role role;

    @JsonPOJOBuilder(withPrefix = "")
    public static class UserBuilder {
        public UserBuilder(){}
    }

}
