import axios from 'axios';

export const ApiConnect = axios.create({
  baseURL: 'https://pf.8dotz.com/api/',
  responseType: 'json',
});
