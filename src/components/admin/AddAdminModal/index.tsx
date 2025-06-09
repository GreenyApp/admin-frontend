import React, { useState, type FormEvent } from 'react';
import Modal from '../../Modal';
import Input from '../../Input';
import Button from '../../Button';
import { useUIStore } from '../../../store/uiStore';
import { useAdminAuthStore } from '../../../store/adminAuthStore';

const AddAdminModal: React.FC = () => {
    const { isAddAdminModalOpen, closeAddAdminModal } = useUIStore();
    const { addAdminUser, isLoading } = useAdminAuthStore();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!adminEmail.trim() || !adminPassword.trim()) {
            useUIStore.getState().showNotification("Email та пароль є обов'язковими", 'error');
            return;
        }
        const success = await addAdminUser({ email: adminEmail, password: adminPassword });
        if (success) {
            setAdminEmail('');
            setAdminPassword('');
            closeAddAdminModal();
            useUIStore.getState().showNotification('Адміністратора успішно додано', 'success');
        }
    };

    return (
        <Modal
            isOpen={isAddAdminModalOpen}
            onClose={() => {
                setAdminEmail(''); setAdminPassword(''); 
                closeAddAdminModal();
            }}
            title="Додати нового адміністратора"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    id="add-admin-email-modal"
                    label="Email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Input
                    id="add-admin-password-modal"
                    label="Пароль"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Button type="submit" fullWidth disabled={isLoading} style={{marginTop: '20px'}}>
                    {isLoading ? 'Створення...' : 'Створити адміністратора'}
                </Button>
            </form>
        </Modal>
    );
};

export default AddAdminModal;