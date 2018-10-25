package br.ufsc.cultivar.resource.advice;

import br.ufsc.cultivar.exception.ServiceException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//@RestControllerAdvice
@AllArgsConstructor(onConstructor = @__(@Autowired))
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Resource {

//    @ExceptionHandler(ServiceException.class)
//    public ResponseEntity serviceExceptionHandler(ServiceException ex){
//        switch (ex.getType()){
//            case NOT_FOUND:
//        }
//    }

}
