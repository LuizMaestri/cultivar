package br.ufsc.cultivar.models;

import java.util.Arrays;
import java.util.stream.Collectors;

public enum Status {
    APPROVED,
    WAIT_RECOMMEND,
    RECOMMEND,
    WAIT_TR,
    WAIT_TV;

    public boolean in(Status... statuses){
        return !Arrays.stream(statuses).filter(this::equals).collect(Collectors.toList()).isEmpty();
    }
}
