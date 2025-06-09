import React, { useEffect } from 'react';
import { useAdminUserManagementStore } from '../../../store/adminUserManagementStore';
import { useUIStore } from '../../../store/uiStore';
import Button from '../../Button';
import { SectionHeaderWithButton } from '../../../app/pages/AdminDashboardPage/styles';

const AdminUsersTab: React.FC = () => {
    const { adminUsers, fetchAdminManagedUsers, isLoading, error } = useAdminUserManagementStore();
    const { openAddAdminModal } = useUIStore();

    useEffect(() => {
        fetchAdminManagedUsers();
    }, [fetchAdminManagedUsers]);

    if (isLoading && adminUsers.length === 0) return <p>Завантаження адміністраторів...</p>;
    if (error) return <p>Помилка завантаження адміністраторів: {error}</p>;

    return (
        <div>
            <SectionHeaderWithButton>
                <h2>Список адміністраторів</h2>
                <Button onClick={openAddAdminModal}>Додати адміністратора</Button>
            </SectionHeaderWithButton>
            {adminUsers.length === 0 && !isLoading && <p>Адміністратори не знайдені.</p>}
            {adminUsers.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminUsers.map(admin => (
                            <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>{admin.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminUsersTab;