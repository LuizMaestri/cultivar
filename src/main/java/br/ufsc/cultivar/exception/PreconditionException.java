package br.ufsc.cultivar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PRECONDITION_REQUIRED)
public class PreconditionException extends ServiceException {
    public PreconditionException(String message) {
        super(message);
    }
}
