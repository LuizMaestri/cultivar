package br.ufsc.cultivar.repository.base;

public abstract class StringRepository<T> extends AbstractRepository<T, String> {

    @Override
    Class<String> getIdClass() {
        return String.class;
    }
}
