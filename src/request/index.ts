import axios from "axios";
import { showFailToast } from "vant";

interface Response {
  code: number;
  data?: object;
  message: string;
}

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: 0;
    data: T;
    msg: "";
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
//创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_HOST,
  timeout: 10000,
  headers: { "Content-Type": "application/json;charset=utf-8" }
});

//请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  return config;
});

//响应拦截
service.interceptors.response.use(
  (res) => {
    const result = res.data;
    if (result.code != 0) {
      showFailToast(result.message);
      return Promise.reject(res.data);
    }
    return res.data;
  },
  (error) => {
    console.log(error);
    showFailToast("请求错误，请联系客服");
  }
);
export default service;
