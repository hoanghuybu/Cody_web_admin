// import React from "react";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
import { EHttpStatus } from "../constants";
import { ApiException, IObject, IObjectPromise } from "../dto";

export type IAxiosRequestOptions = AxiosRequestConfig;
// Removed IAxiosResponse as it was redundant
export class AxiosHttpClient {
  [x: string]: any;
  private baseUrl: string;
  private options: IAxiosRequestOptions;
  private interceptors: IObjectPromise;
  private instance: AxiosInstance;
  constructor(config: {
    baseurl: string;
    options: IAxiosRequestOptions;
    interceptors?: IObjectPromise;
  }) {
    const { baseurl = "", options = {}, interceptors = {} } = config;
    this.baseUrl = baseurl;
    this.options = options;
    if (interceptors) {
      this.interceptors = interceptors;
    } else {
      this.interceptors = {};
    }
    // Convert headers from string[][] to object if necessary
    const axiosOptions = { ...options };
    if (Array.isArray(axiosOptions.headers)) {
      axiosOptions.headers = Object.fromEntries(
        axiosOptions.headers as string[][]
      );
    }
    this.instance = Axios.create({
      baseURL: baseurl,
      ...axiosOptions,
    });

    // Thêm response interceptor để xử lý lỗi 401
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token và redirect về login
          sessionStorage.setItem("authError", "Phiên đăng nhập đã hết hạn");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          // Sử dụng window.location để redirect ngay lập tức
          window.location.href = "/signin";
          return Promise.reject(
            new ApiException("Phiên đăng nhập đã hết hạn", 401)
          );
        }
        return Promise.reject(error);
      }
    );
  }
  private handlerError(error?: any): ApiException {
    if (!error) {
      return new ApiException("Unknown", EHttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!error.isAxiosError) {
      if (error.message) {
        return new ApiException(
          error.message,
          EHttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return new ApiException("Unknown", EHttpStatus.INTERNAL_SERVER_ERROR);
    }
    // eslint-disable-next-line prefer-const
    let { response, message = "Unknown" } = error as AxiosError;

    let type = "DEFAULT";
    let businessCode = -1;
    if (response) {
      const { data = {}, status = EHttpStatus.INTERNAL_SERVER_ERROR } =
        response;
      const responseData = data as {
        message?: string;
        type?: string;
        businessCode?: number;
      };

      if (responseData.message) {
        message = responseData.message;
      }
      if (responseData.type) {
        type = responseData.type;
      }
      if (responseData.businessCode) {
        businessCode = responseData.businessCode;
      }

      return new ApiException(message, status, data, type, businessCode);
    }
    return new ApiException(message, EHttpStatus.INTERNAL_SERVER_ERROR);
  }

  private async intercept() {
    const entries = Object.entries(this.interceptors);
    const resolved = await Promise.all(
      entries.map(([, promise]) =>
        typeof promise === "function" ? promise() : Promise.resolve(promise)
      )
    );
    const headerAppend = entries.reduce((acc, [key], idx) => {
      acc[key] = resolved[idx];
      return acc;
    }, {} as IObject);
    return headerAppend;
  }

  async get<T>(endpoint: string, params: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const paramUrls = new URLSearchParams(params).toString();
      const url = (endpoint + "?" + paramUrls).trim();
      return await this.instance.get(url, { headers });
    } catch (error) {
      throw this.handlerError(error);
    }
  }
  async getByBody<T>(
    endpoint: string,
    body: any = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      return await this.instance.get(endpoint, { headers, data: body });
    } catch (error) {
      throw this.handlerError(error);
    }
  }
  async post<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const url = endpoint.trim();
      return await this.instance.post(url, body, {
        headers,
      });
    } catch (error) {
      throw this.handlerError(error);
    }
  }

  async put<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const url = endpoint.trim();
      return await this.instance.put(url, body, {
        headers,
      });
    } catch (error) {
      throw this.handlerError(error);
    }
  }

  async patch<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const url = endpoint.trim();
      return await this.instance.patch(url, body, {
        headers,
      });
    } catch (error) {
      throw this.handlerError(error);
    }
  }
  async delete<T>(endpoint: string, body: any = {}): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const url = endpoint.trim();
      return await this.instance.delete(url, {
        headers,
        data: body,
      });
    } catch (error) {
      throw this.handlerError(error);
    }
  }

  async uploadFile<T = any>(
    endpoint: string,
    formData: FormData,
    onUploadProgress?: (event: any) => void
  ): Promise<AxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      Object.assign(headers, {
        "Content-Type": "multipart/form-data",
      });
      const url = endpoint.trim();
      return await this.instance.post(url, formData, {
        headers,
        onUploadProgress,
      });
    } catch (error) {
      throw this.handlerError(error);
    }
  }
}
