package br.ufsc.cultivar.models.dto;

import lombok.AccessLevel;
import lombok.Value;
import lombok.experimental.FieldDefaults;

/**
 * @author luiz.maestri
 * @since 25/07/2018
 */
@Value
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileDTO<T> {
    T id;
    String filename;
    String type;
}
