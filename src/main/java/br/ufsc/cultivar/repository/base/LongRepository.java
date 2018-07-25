package br.ufsc.cultivar.repository.base;


public abstract class LongRepository<T> extends AbstractRepository<T, Long> {
    @Override
    Class<Long> getIdClass() {
        return Long.class;
    }
}
