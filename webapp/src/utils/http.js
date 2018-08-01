import axios from 'axios';
import { get } from './storage';

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;

export const setHeaders = (headers) => axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': get('token'),
    ...headers
}

const empty = () => {};

const setCallback = (request, success, failed) => request.then(success ? success : empty).catch(failed ? failed : empty);

export const getRequest = (url, success, failed) => setCallback(axios.get(url), success, failed);
export const postRequest = (url, data, success, failed) => setCallback(axios.post(url, data), success, failed);
export const putRequest = (url, data, success, failed) => setCallback(axios.put(url, data), success, failed);
export const deleteRequest = (url, success, failed) => setCallback(axios.delete(url), success, failed);

setHeaders();