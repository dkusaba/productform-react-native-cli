import {AxiosError} from 'axios';
import {ApiConnect} from './api';

export const productGet = async (token: string) => {
  try {
    const response = await ApiConnect(`/products/?token=${token}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (response) {
      return response.data;
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const productCreate = async (token: string, data: FormData) => {
  try {
    const response = await ApiConnect('/products', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    if (response) {
      return response.data;
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const productUpdate = async (
  token: string,
  id: number | string,
  data: FormData,
) => {
  try {
    const response = await ApiConnect(`/products/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    if (response) {
      return response.data;
    } else {
      return {error: 'An unknown error occurred.'};
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
