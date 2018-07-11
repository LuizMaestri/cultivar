package br.ufsc.cultivar.models;

public abstract class AbstractModel<T> {
    public abstract T getId();
    public abstract AbstractModel<T> withId(T id);
}
