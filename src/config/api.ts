/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useAdminAuthStore } from '../store/adminAuthStore';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = useAdminAuthStore.getState().accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const adminAuthActions = useAdminAuthStore.getState();

        if (error.response?.status === 401 && !originalRequest._retry && adminAuthActions.refreshToken) {
            originalRequest._retry = true; 

            try {
                console.log('Attempting to refresh admin token...');
                const { data } = await axios.post(
                    `${apiClient.defaults.baseURL}/auth/refresh`,
                    { refreshToken: adminAuthActions.refreshToken }
                );

                adminAuthActions.setTokens(data.accessToken, data.refreshToken);

                apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                }
                return apiClient(originalRequest);
            } catch (refreshError: any) {
                console.error('Admin token refresh failed:', refreshError.response?.data || refreshError.message);
                adminAuthActions.logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;