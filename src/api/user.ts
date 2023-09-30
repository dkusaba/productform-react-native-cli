import * as Keychain from 'react-native-keychain';
import {AxiosError} from 'axios';

import {ApiConnect} from './api';

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await ApiConnect('/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email: email,
        password: password,
      },
    });
    if (response && response.status === 200) {
      console.log('user', response.data.user);
      await Keychain.setGenericPassword(email, password);
      return {
        isLoggedIn: true,
        token: response.data.token,
        data: response.data.user,
      };
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    console.log(error);
  }
};

export const userSignUp = async (
  first_name_en: string,
  last_name_en: string,
  first_name_jp: string,
  last_name_jp: string,
  email: string,
  phone_number: string,
  password: string,
) => {
  try {
    const response = await ApiConnect('/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email: email,
        password: password,
        last_name_jp: last_name_jp,
        first_name_jp: first_name_jp,
        last_name_en: last_name_en,
        first_name_en: first_name_en,
        phone_number: phone_number,
      },
    });
    if (response && response.status === 200) {
      return {status: 200};
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const userEdit = async (data: any, token: string) => {
  try {
    const response = await ApiConnect('/auth/update', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    if (response && response.status === 200) {
      return response;
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const userRefreshToken = async () => {};
