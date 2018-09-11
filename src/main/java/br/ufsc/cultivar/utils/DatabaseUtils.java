package br.ufsc.cultivar.utils;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseUtils {

    public static boolean isNotEmpty(ResultSet rs) throws SQLException {
        if (rs.isBeforeFirst()){
            rs.first();
        }
        return rs.isLast() || rs.next() && rs.previous();
    }
}
