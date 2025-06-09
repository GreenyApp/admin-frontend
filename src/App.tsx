import React, { useEffect, Suspense, lazy, type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { adminTheme, AdminGlobalStyle } from './theme';
import { useAdminAuthStore } from './store/adminAuthStore';
import Notification from './components/Notification';
import AddProductModal from './components/admin/AddProductModal';
import EditProductModal from './components/admin/EditProductModal';
import AddAdminModal from './components/admin/AddAdminModal';

const AdminLoginPage = lazy(() => import('./app/pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./app/pages/AdminDashboardPage'));



const ProtectedAdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticatedAdmin = useAdminAuthStore((state) => state.isAuthenticatedAdmin);
    if (!isAuthenticatedAdmin) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const PublicAdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticatedAdmin = useAdminAuthStore((state) => state.isAuthenticatedAdmin);
    if (isAuthenticatedAdmin) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const AdminApp: React.FC = () => {
    const { checkAuthStatus, isLoading: authLoading } = useAdminAuthStore();

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    if (authLoading && !useAdminAuthStore.getState().accessToken && !useAdminAuthStore.getState().isAuthenticatedAdmin) {
        return <div>Завантаження панелі адміністратора...</div>;
    }

    return (
        <ThemeProvider theme={adminTheme}>
            <AdminGlobalStyle />
            <Notification />
            <AddProductModal />
            <EditProductModal />
            <AddAdminModal />
            <Router>
                <Suspense fallback={<div>Завантаження сторінки...</div>}>
                    <Routes>
                        <Route path="/login" element={<PublicAdminRoute><AdminLoginPage /></PublicAdminRoute>} />
                        <Route path="/" element={<ProtectedAdminRoute><AdminDashboardPage /></ProtectedAdminRoute>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
};

export default AdminApp;