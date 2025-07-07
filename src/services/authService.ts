import { API_ENDPOINTS } from '../constants';
import type { AuthUser, LoginRequest, LoginResponse, ProfileResponse, UpdateProfileRequest, ChangePasswordRequest, ResponseModel } from '../types';
import BaseApiService from './base';

class AuthService extends BaseApiService {
    async signin(credentials: LoginRequest): Promise<LoginResponse> {
        return this.post<LoginResponse['data']>(API_ENDPOINTS.AUTH.SIGNIN, credentials);
    }

    async signup(credentials: LoginRequest): Promise<LoginResponse> {
        return this.post<LoginResponse['data']>(API_ENDPOINTS.AUTH.SIGNUP, credentials);
    }

    async getProfile(): Promise<ProfileResponse> {
        return this.get<ProfileResponse['data']>(API_ENDPOINTS.AUTH.PROFILE);
    }

    async logout(): Promise<ResponseModel<null>> {
        return this.post<null>(API_ENDPOINTS.AUTH.LOGOUT);
    }

    async refreshToken(): Promise<LoginResponse> {
        return this.post<LoginResponse['data']>(API_ENDPOINTS.AUTH.REFRESH);
    }

    async updateProfile(id: string, data: UpdateProfileRequest): Promise<ResponseModel<AuthUser>> {
        return this.put<AuthUser>(API_ENDPOINTS.ACCOUNTS.BY_ID(id), data);
    }

    async changePassword(id: string, data: ChangePasswordRequest): Promise<ResponseModel<null>> {
        return this.put<null>(API_ENDPOINTS.ACCOUNTS.PASSWORD(id), data);
    }
}

export const authService = new AuthService();