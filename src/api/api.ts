import axios from 'axios';
import {BASE_URL} from '../constants/config';

export const ApiConnect = axios.create({
  baseURL: `${BASE_URL}/api/`,
  responseType: 'json',
});
