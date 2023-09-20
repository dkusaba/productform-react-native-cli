import * as Keychain from 'react-native-keychain';

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

export const userRefreshToken = async () => {};
