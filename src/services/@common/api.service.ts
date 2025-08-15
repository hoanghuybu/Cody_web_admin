import { configEnv } from "~/@config";
import { IObjectPromise } from "~/@core/dto";
import {
    AxiosHttpClient,
    IAxiosRequestOptions,
} from "~/@core/network/axios-http-client";
// Update the import path to the correct location of authService
import { authService } from '../auth.service';
import { toastService } from "./toast.service";


class ApiService {
    private httpClient: AxiosHttpClient;

    constructor(config: {
        baseurl: string;
        options: IAxiosRequestOptions;
        interceptors?: IObjectPromise;
    }) {
        this.httpClient = new AxiosHttpClient(config);
    }

    private handleError(error: any, method: string, endpoint: string): any {
        console.error(`[ApiService] ${method} ${endpoint} failed:`, error);

        if (error?.response) {
            const { status, data } = error.response;
            toastService.error(
                `Error ${status}: ${data?.message || "Unknown server error"}`
            );
            return {
                isApiError: true,
                type: data?.type ?? "DEFAULT",
                httpCode: data?.httpCode ?? status ?? 500,
                businessCode: data?.businessCode ?? -1,
                message: data?.message ?? "Unknown server error",
                errors: data?.errors ?? null,
            };
        }

        if (error?.request) {
            toastService.error("Network error: Unable to connect to server");
            return {
                isApiError: true,
                type: "NETWORK",
                httpCode: 0,
                businessCode: -1,
                message: "Network error: Unable to connect to server",
                errors: null,
            };
        }

        toastService.error(
            error?.message || error?.toString() || "Unknown error occurred"
        );
        return {
            isApiError: true,
            type: "UNKNOWN",
            httpCode: 0,
            businessCode: -1,
            message: error?.message || error?.toString() || "Unknown error occurred",
            errors: null,
        };
    }

    async get<T = any>(endpoint: string, params: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.get<T>(endpoint, params);
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "GET", endpoint);
            return Promise.reject(errObj);
        }
    }

    async getByBody<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.getByBody<T>(endpoint, body);
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "GET_BY_BODY", endpoint);
            return Promise.reject(errObj);
        }
    }

    async post<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.post<T>(endpoint, body);
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "POST", endpoint);
            return Promise.reject(errObj);
        }
    }

    async put<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.put<T>(endpoint, body);
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "PUT", endpoint);
            return Promise.reject(errObj);
        }
    }

    async patch<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.patch<T>(endpoint, body);
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "PATCH", endpoint);
            return Promise.reject(errObj);
        }
    }

    async delete<T = any>(endpoint: string, body: any = {}): Promise<T> {
        try {
            const res = await this.httpClient.delete<T>(endpoint, body);
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "DELETE", endpoint);
            return Promise.reject(errObj);
        }
    }

    async uploadFile<T = any>(
        endpoint: string,
        formData: FormData,
        onUploadProgress?: (event: any) => void
    ): Promise<T> {
        try {
            const res = await this.httpClient.uploadFile<T>(
                endpoint,
                formData,
                onUploadProgress
            );
            return res.data;
        } catch (error) {
            const errObj = this.handleError(error, "UPLOAD_FILE", endpoint);
            return Promise.reject(errObj);
        }
    }
}

const { ROOT } = configEnv().CONNECTORS;
const { baseUrl } = ROOT;

export const rootApiService = new ApiService({
    baseurl: baseUrl,
    options: {
        timeout: 60000,
        headers: {
            "Content-Type": "application/json",
            "x-lang": "vi",
        },
    },
    interceptors: {
        "Authorization": async () => {
            const token = authService.getAccessToken();
            return `Bearer ${token}`;
        },
    },
});
