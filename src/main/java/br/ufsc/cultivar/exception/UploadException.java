package br.ufsc.cultivar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INSUFFICIENT_STORAGE)
public class UploadException extends ServiceException {
    public UploadException(String message, Throwable cause) {
        super(message, cause);
    }
}
