import React, { useEffect } from 'react';
import { useAdminProductStore } from '../../../store/adminProductStore';
import { useUIStore } from '../../../store/uiStore';
import Button from '../../Button';
import { SectionHeaderWithButton } from '../../../app/pages/AdminDashboardPage/styles'; 
import { FaEdit } from 'react-icons/fa';

const AdminProductsTab: React.FC = () => {
    const { products, fetchAdminProducts, isLoading, error } = useAdminProductStore();
    const { openAddProductModal, openEditProductModal } = useUIStore();

    useEffect(() => {
        fetchAdminProducts();
    }, [fetchAdminProducts]);

    if (isLoading && products.length === 0) return <p>Завантаження продуктів...</p>;
    if (error) return <p>Помилка завантаження продуктів: {error}</p>;

    return (
        <div>
            <SectionHeaderWithButton>
                <h2>Список продуктів</h2>
                <Button onClick={openAddProductModal}>Додати продукт</Button>
            </SectionHeaderWithButton>
            {products.length === 0 && !isLoading && <p>Продукти не знайдено.</p>}
            {products.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Код</th>
                            <th>Назва</th>
                            <th>Користувач</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.code}</td>
                                <td>{product.name || '-'}</td>
                                <td>{product.user ? product.user.email : 'Не призначено'}</td>
                                <td>
                                    <Button
                                        onClick={() => openEditProductModal({ id: product.id, code: product.code })}
                                        icon={<FaEdit />}
                                    >
                                        Редагувати
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminProductsTab;