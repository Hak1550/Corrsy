import axios from "axios";
import { getToken } from "../utils/auth.util";

export const BASEURL = "http://51.83.237.63:5003/api/";
export const IMAGEURL = "http://51.83.237.63:5003/uploads/";

const BASE_URL = BASEURL;
export async function getApiRequestHeader(isFormData = false) {
  const token = await getToken()

  return {
    Accept: "application/json",
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    "accessToken": token

  };
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  withCredentials: false,
});

export async function updateHeaders(isFormData = false) {
  const header = await getApiRequestHeader(isFormData);
  instance.defaults.headers = header;
}

export async function request({
  method,
  url,
  data,
  headers,
  isFormData = false,
}) {
  if (headers === undefined) {
    await updateHeaders(isFormData);
  }
  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }

  return response;
}

export async function newRequest({
  method,
  url,
  data,
  isFormData = false,
  headers,
}) {
  if (headers === undefined) {
    await updateHeaders(isFormData);
  }
  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }

  if (
    response.status
      ? response.status.toString().indexOf("2") !== 0
      : response.data.status.toString().indexOf("2") !== 0
  ) {
    // eslint-disable-next-line
    throw { response };
  } else {
    return response.data;
  }
}

export async function get(url, params, featureAndAction, config) {
  for (var key in params) {
    url = url + "" + params[key];
  }
  return request({ method: "get", url, data: { featureAndAction }, ...config });
}

export async function del(url, params, config) {
  return request({ method: "delete", url, data: { params }, ...config });
}

export async function post(url, data, isFormData = false, config) {
  return request({ method: "post", url, data, isFormData, ...config });
}

export async function put(url, data, isFormData = false, config) {
  return newRequest({ method: "put", url, data, isFormData, ...config });
}
export async function patch(url, data, isFormData = false, config) {
  return newRequest({ method: "patch", url, data, isFormData, ...config });
}
export const independentRequest = async (url, method, data) => {
  const promise = axios[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }
  const payload = response;
  return payload;
};
