import * as Keychain from 'react-native-keychain';
import {AxiosError} from 'axios';

import {AuthApi} from './api';

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await AuthApi('/login', {
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
  fname: string,
  lname: string,
  fname_jp: string,
  lname_jp: string,
  email: string,
  phone: string,
  password: string,
) => {
  try {
    const response = await AuthApi('/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email: email,
        password: password,
        last_name_jp: lname_jp,
        first_name_jp: fname_jp,
        last_name_en: lname,
        first_name_en: fname,
        phone_number: phone,
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

export const userRefreshToken = async () => {};
