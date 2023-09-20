import {Platform} from 'react-native';
import axios from 'axios';

export const AuthApi = axios.create({
  baseURL:
    Platform.OS === 'ios'
      ? 'http://localhost:8000/api/auth/'
      : 'http://10.0.2.2:8000/api/auth/',
  responseType: 'json',
});
