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
        id: response.data.user.id,
        isLoggedIn: true,
        token: response.data.token,
      };
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    console.error(error);
  }
};

export const userRefreshToken = async () => {};
