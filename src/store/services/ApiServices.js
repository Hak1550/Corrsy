import axios from 'axios';
import { Alert } from 'react-native';
import { store } from '../sagas';
import {  STAGING_BASE_URL} from '@env';

export const BASE_URL = STAGING_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },   
});
const defaultAPIConfig = {
  showAPIError: false,
};

const HandleResponseError = error => {
  console.log('HandleResponseError', error);
  if (error.message === 'Network Error') {
    Alert.alert('Network Error', 'Please check your internet connection');
  } else if (error.message === 'Request failed with status code 401') {
    Alert.alert(
      'Session Expired',
      'Please login again to continue.',
      [
        {
          text: 'Ok',
          onPress: async () => { },
        },
      ],
      { cancelable: false },
    );
  } else if (error.message.startsWith('timeout')) {
    Alert.alert(
      'Request Timed Out',
      'Your request has timed out. Please try again.',
    );
  } else {
    Alert.alert('Error', 'An error occured, please try again later.');
  }
};

export const getToken = () => {
  let token = store.getState().home?.token;
  // console.log('token', token);
  return token;
};

const httpCatch = (route, reject, error, showAPIError) => {
  if (showAPIError === true) HandleResponseError(error);
  reject(error);
};

export const get = async (route, apiConfig = defaultAPIConfig) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(route, config)
      .then(response => resolve(response.data))
      .catch(error => httpCatch(route, reject, error, apiConfig.showAPIError));
  });
};

export const post = async (route, data, apiConfig = defaultAPIConfig) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(route, data, config)
      .then(response => resolve(response.data))
      .catch(error => httpCatch(route, reject, error, apiConfig.showAPIError));
  });
};

export const put = async (route, data, apiConfig = defaultAPIConfig) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(route, data, config)
      .then(response => resolve(response.data))
      .catch(error => httpCatch(route, reject, error, apiConfig.showAPIError));
  });
};

export const del = async (route, data, apiConfig = defaultAPIConfig) => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(route, config)
      .then(response => resolve(response.data))
      .catch(error => httpCatch(route, reject, error, apiConfig.showAPIError));
  });
};
