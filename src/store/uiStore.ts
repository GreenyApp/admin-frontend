import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationState {
    message: string;
    type: NotificationType;
    visible: boolean;
}

interface UIState {
    notification: NotificationState;
    showNotification: (message: string, type?: NotificationType) => void;
    hideNotification: () => void;

    isAddProductModalOpen: boolean;
    openAddProductModal: () => void;
    closeAddProductModal: () => void;

    isEditProductModalOpen: boolean;
    productToEdit: { id: number; code: string } | null;
    openEditProductModal: (product: { id: number; code: string }) => void;
    closeEditProductModal: () => void;

    isAddAdminModalOpen: boolean;
    openAddAdminModal: () => void;
    closeAddAdminModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    notification: { message: '', type: 'info', visible: false },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showNotification: (message, type = 'success') => { /* ... */ },
    hideNotification: () => { /* ... */ },


    isAddProductModalOpen: false,
    openAddProductModal: () => set({ isAddProductModalOpen: true }),
    closeAddProductModal: () => set({ isAddProductModalOpen: false }),

    isEditProductModalOpen: false,
    productToEdit: null,
    openEditProductModal: (product) => set({ isEditProductModalOpen: true, productToEdit: product }),
    closeEditProductModal: () => set({ isEditProductModalOpen: false, productToEdit: null }),

    isAddAdminModalOpen: false,
    openAddAdminModal: () => set({ isAddAdminModalOpen: true }),
    closeAddAdminModal: () => set({ isAddAdminModalOpen: false }),
}));