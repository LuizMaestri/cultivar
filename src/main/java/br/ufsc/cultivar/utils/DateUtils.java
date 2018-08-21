package br.ufsc.cultivar.utils;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateUtils {
    public static LocalDate toLocaldate(Date date){
        return date.toLocalDate();
    }

    public static LocalDateTime toLocalDateTime(Date date){
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    public static ZonedDateTime toZonedDateTime(Date date){
        return date.toInstant().atZone(ZoneId.systemDefault());
    }

    public static ZonedDateTime toZonedDateTime(Timestamp timestamp){
        return timestamp.toInstant().atZone(ZoneId.systemDefault());
    }
}
