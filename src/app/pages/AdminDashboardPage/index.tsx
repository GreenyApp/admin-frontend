import React, { useState } from 'react';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { useUIStore } from '../../../store/uiStore';
import { DashboardContainer, Header, AdminInfo, LogoutLink, TabsContainer, TabButton, TabContent } from './styles';
import AdminProductsTab from '../../../components/admin/AdminProductsTab';
import AdminUsersTab from '../../../components/admin/AdminUsersTab';

type ActiveTab = 'products' | 'admins';

const AdminDashboardPage: React.FC = () => {
    const { adminUser, logout } = useAdminAuthStore();
    const [activeTab, setActiveTab] = useState<ActiveTab>('products');
    const showNotification = useUIStore(state => state.showNotification);


    const handleLogout = () => {
        logout();
        showNotification('Ви успішно вийшли', 'success');
    };

    if (!adminUser) {
        return <DashboardContainer>Завантаження даних адміністратора...</DashboardContainer>;
    }

    return (
        <DashboardContainer>
            <Header>
                <h1>Адміністративна панель</h1>
                <AdminInfo>
                    <span>{adminUser.email}</span>
                    <LogoutLink onClick={handleLogout}>Вийти</LogoutLink>
                </AdminInfo>
            </Header>

            <TabsContainer>
                <TabButton
                    active={activeTab === 'products'}
                    onClick={() => setActiveTab('products')}
                >
                    Продукти
                </TabButton>
                <TabButton
                    active={activeTab === 'admins'}
                    onClick={() => setActiveTab('admins')}
                >
                    Адміністратори
                </TabButton>
            </TabsContainer>

            <TabContent>
                {activeTab === 'products' && <AdminProductsTab />}
                {activeTab === 'admins' && <AdminUsersTab />}
            </TabContent>
        </DashboardContainer>
    );
};

export default AdminDashboardPage;