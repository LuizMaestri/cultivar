package br.ufsc.cultivar.utils;

import java.sql.Date;
import java.sql.Timestamp;

public class DateUtils {
    public static java.util.Date toDate(Timestamp timestamp) {
        return Date.from(timestamp.toInstant());
    }
}
