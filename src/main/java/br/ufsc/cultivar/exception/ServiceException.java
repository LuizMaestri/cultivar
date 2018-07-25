package br.ufsc.cultivar.exception;

import lombok.Getter;

public class ServiceException extends Exception {

    @Getter
    private final Type type;

    public ServiceException(String message, Throwable cause, Type type) {
        super(message, cause);
        this.type = type;
    }

    public ServiceException(String message, Throwable cause) {
        super(message, cause);
        this.type = Type.DEFAULT;
    }
}
