import apiClient from '../config/api';
import type { SignInDto, AuthResponse, SignUpDto } from '../types/auth';

const adminAuthService = {
    signIn: async (signInInput: SignInDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/signin', signInInput);
        return response.data;
    },

    addAdmin: async (signUpInput: SignUpDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/add-admin', signUpInput);
        return response.data;
    },

    refreshTokens: async (refreshTokenValue: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/refresh', {
            refreshToken: refreshTokenValue,
        });
        return response.data;
    },
};

export default adminAuthService;