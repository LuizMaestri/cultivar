package br.ufsc.cultivar.security;

public class AuthException extends Exception {
    AuthException(String message) {
        super(message);
    }
}
