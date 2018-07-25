package br.ufsc.cultivar.resources.advice;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

@Value(staticConstructor = "of")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
class ResponseError {
    String message;
}