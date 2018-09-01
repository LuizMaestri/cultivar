package br.ufsc.cultivar.model;

public enum Status {
    APPROVED,
    WAIT_STATEMENT,
    WAIT_COMPANY,
    WAIT_TRAINING,
    REGISTER;

    public boolean isValid(Status next){
      switch (this){
          case APPROVED: return APPROVED.equals(next);
          case WAIT_TRAINING: return APPROVED.equals(next);
          case WAIT_COMPANY: return WAIT_TRAINING.equals(next);
          case WAIT_STATEMENT: return WAIT_COMPANY.equals(next);
          case REGISTER: return WAIT_STATEMENT.equals(next);
          default: return false;
      }
    }


}
