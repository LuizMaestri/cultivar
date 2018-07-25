package br.ufsc.cultivar.resources.advice;

import br.ufsc.cultivar.exception.ServiceException;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.logging.Level;

@ControllerAdvice
@Log
public class Advice {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ResponseError> notFound(ServiceException e){
        switch (e.getType()){
            case NOT_FOUND: return createResponse(HttpStatus.NOT_FOUND, e.getMessage());
            case INVALID: return createResponse(HttpStatus.BAD_REQUEST, e.getMessage());
            default: return createResponse(HttpStatus.I_AM_A_TEAPOT, e.getMessage());
        }
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ResponseError> entityExists(SQLIntegrityConstraintViolationException e){
        log.log(Level.SEVERE, e, () -> "Já existente");
        return createResponse(HttpStatus.CONFLICT, "já existente");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseError> idConflict(IllegalArgumentException e){
        log.log(Level.WARNING, e, () -> "Entidade não corresponde a entidade solicitada");
        return createResponse(HttpStatus.CONFLICT, "Entidade não corresponde a entidade solicitada");
    }

    private ResponseEntity<ResponseError> createResponse(HttpStatus status, String msg){
        return ResponseEntity.status(status).body(ResponseError.of(msg));
    }


}
