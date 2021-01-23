import axios from "axios";

const END_POINT = `https://5.react.pages.academy/guess-melody`;
const REQUEST_TIMEOUT = 5000;

const Error = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthrized) => {
  const api = axios.create({
    baseURL: END_POINT,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthrized();

      throw error;
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
