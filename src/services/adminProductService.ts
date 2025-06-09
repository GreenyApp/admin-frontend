import apiClient from '../config/api';
import type { AdminProduct } from '../types/product';

const adminProductService = {
    getAllProducts: async (): Promise<AdminProduct[]> => {
        const response = await apiClient.get<AdminProduct[]>('/product/all');
        return response.data;
    },
    createProduct: async (code: string): Promise<AdminProduct> => {
        const response = await apiClient.post<AdminProduct>('/product', { code });
        return response.data;
    },
    updateProductByAdmin: async (id: number, code: string): Promise<AdminProduct> => {
        const response = await apiClient.put<AdminProduct>(`/product/admin/${id}`, { code });
        return response.data;
    },
};
export default adminProductService;