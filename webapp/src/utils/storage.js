export const saveObject = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

export const getAsObject = key => JSON.parse(localStorage.getItem(key));

export const save = (key, data) => localStorage.setItem(key, data);

export const get = key => localStorage.getItem(key);