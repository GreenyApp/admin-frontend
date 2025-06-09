import apiClient from '../config/api';
import type { AdminUser } from '../types/user';

const adminUserService = {
    getMe: async (): Promise<AdminUser> => {
        const response = await apiClient.get<AdminUser>('/user/me');
        return response.data;
    },
    getAllUsers: async (): Promise<AdminUser[]> => { 
        const response = await apiClient.get<AdminUser[]>('/user'); 
        return response.data;
    },
};
export default adminUserService;