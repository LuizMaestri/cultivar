import axios from 'axios';
import { get } from '../storage';

export const baseHeader = { 'X-Requested-With': 'XMLHttpRequest', 'Authorization': get('token')}
axios.defaults.headers.common = baseHeader;
axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT;