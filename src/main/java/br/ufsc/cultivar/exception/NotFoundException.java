package br.ufsc.cultivar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends ServiceException {
    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
