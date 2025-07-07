import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { ErrorResponseModel, ResponseModel } from '../types';
import { API_BASE_URL, API_HEADERS, STORAGE_KEYS } from '../constants';

class BaseApiService {
    protected api: AxiosInstance;

    constructor(baseURL: string = API_BASE_URL) {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers[API_HEADERS.AUTHORIZATION] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                // Don't redirect to login for public endpoints
                const isPublicEndpoint = error.config?.url?.includes('/players/') && 
                                       error.config?.method === 'get';
                
                if (error.response?.status === 401 && !isPublicEndpoint) {
                    localStorage.removeItem(STORAGE_KEYS.TOKEN);
                    localStorage.removeItem(STORAGE_KEYS.USER);
                    window.location.href = '/login';
                }

                const errorResponse: ErrorResponseModel = {
                    success: false,
                    message: error.response?.data?.message || error.message || 'An error occurred',
                    error: error.response?.data?.error || error.message
                };

                return Promise.reject(errorResponse);
            }
        )
    }

    protected async get<T>(url: string, params?: any): Promise<ResponseModel<T>> {
        const response = await this.api.get<ResponseModel<T>>(url, { params });
        return response.data;
    }

    protected async post<T>(url: string, data?: any): Promise<ResponseModel<T>> {
        const response = await this.api.post<ResponseModel<T>>(url, data);
        return response.data;
    }

    protected async put<T>(url: string, data?: any): Promise<ResponseModel<T>> {
        const response = await this.api.put<ResponseModel<T>>(url, data);
        return response.data;
    }

    protected async delete<T>(url: string): Promise<ResponseModel<T>> {
        const response = await this.api.delete<ResponseModel<T>>(url);
        return response.data;
    }
}

export default BaseApiService;