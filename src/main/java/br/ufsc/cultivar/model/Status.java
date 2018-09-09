package br.ufsc.cultivar.model;

public enum Status {
    APPROVED,
    WAIT_STATEMENT,
    WAIT_COMPANY,
    WAIT_TRAINING,
    REGISTER;

    public boolean isValid(Status next){
      switch (this){
          case APPROVED: return this.equals(next);
          case WAIT_TRAINING: return APPROVED.equals(next) || this.equals(next);
          case WAIT_STATEMENT: return WAIT_TRAINING.equals(next) || this.equals(next);
          case WAIT_COMPANY: return WAIT_STATEMENT.equals(next) || this.equals(next);
          case REGISTER: return WAIT_COMPANY.equals(next) || this.equals(next);
          default: return false;
      }
    }


}
