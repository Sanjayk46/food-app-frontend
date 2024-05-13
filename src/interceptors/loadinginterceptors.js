import AxiosService from '../axiosConfig';

export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
    AxiosService.interceptors.request.use(
    req => {
      if (!(req.data instanceof FormData)) showLoading();
      return req;
    },
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  AxiosService.interceptors.response.use(
    res => {
      hideLoading();
      return res;
    },
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};

export default setLoadingInterceptor;
