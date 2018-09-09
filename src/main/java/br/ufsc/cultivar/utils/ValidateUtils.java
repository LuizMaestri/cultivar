package br.ufsc.cultivar.utils;

import lombok.val;

import javax.validation.Validation;

public class ValidateUtils {

    public static <T> Boolean isValid(T entity){
        if (entity == null){
            return false;
        }
        val factory = Validation.buildDefaultValidatorFactory();
        val validator = factory.getValidator();
        val validate = validator.validate(entity);
        return validate.isEmpty();
    }
}
