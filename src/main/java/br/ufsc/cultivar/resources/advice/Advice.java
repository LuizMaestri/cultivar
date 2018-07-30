package br.ufsc.cultivar.resources.advice;

import br.ufsc.cultivar.exception.ServiceException;
import br.ufsc.cultivar.security.AuthException;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
@Slf4j
public class Advice {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ResponseError> serviceExceptionHandler(ServiceException e){
        switch (e.getType()){
            case NOT_FOUND: return createResponse(HttpStatus.NOT_FOUND, e.getMessage());
            case INVALID: return createResponse(HttpStatus.BAD_REQUEST, e.getMessage());
            case FILE: return createResponse(HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage());
            default: return createResponse(HttpStatus.I_AM_A_TEAPOT, e.getMessage());
        }
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ResponseError> sqlIntegrityConstraintViolationExceptionHandler(){
        log.warn("Já existente");
        return createResponse(HttpStatus.CONFLICT, "já existente");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseError> illegalArgumentExceptionHandler(){
        log.warn("Entidade não corresponde a entidade solicitada");
        return createResponse(HttpStatus.CONFLICT, "Entidade não corresponde a entidade solicitada");
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ResponseError> maxUploadSizeExceededExceptionHandler(){
        log.warn("Não foi possível salvar o arquivo.");
        return createResponse(HttpStatus.PAYLOAD_TOO_LARGE, "Não foi possível salvar o arquivo.");
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ResponseError> unauthorized(AuthException e){
        log.warn(e.getMessage());
        return createResponse(HttpStatus.UNAUTHORIZED, e.getMessage());
    }

    private ResponseEntity<ResponseError> createResponse(HttpStatus status, String msg){
        return ResponseEntity.status(status).body(ResponseError.of(msg));
    }


}
