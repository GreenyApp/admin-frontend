import React, { useState, useEffect, type FormEvent } from 'react';
import Modal from '../../Modal';
import Input from '../../Input';
import Button from '../../Button';
import { useUIStore } from '../../../store/uiStore';
import { useAdminProductStore } from '../../../store/adminProductStore';

const EditProductModal: React.FC = () => {
    const { isEditProductModalOpen, closeEditProductModal, productToEdit } = useUIStore();
    const { updateAdminProduct, isLoading } = useAdminProductStore();
    const [productCode, setProductCode] = useState('');
    const [productId, setProductId] = useState<number | null>(null);

    useEffect(() => {
        if (productToEdit && isEditProductModalOpen) {
            setProductCode(productToEdit.code);
            setProductId(productToEdit.id);
        } else {
            setProductCode('');
            setProductId(null);
        }
    }, [productToEdit, isEditProductModalOpen]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!productCode.trim() || !productId) {
            useUIStore.getState().showNotification("Код продукту є обов'язковим", 'error');
            return;
        }
        const success = await updateAdminProduct(productId, productCode);
        if (success) {
            closeEditProductModal();
        }
    };

    return (
        <Modal
            isOpen={isEditProductModalOpen}
            onClose={closeEditProductModal}
            title="Редагувати продукт"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    id="edit-product-code-modal"
                    label="Код продукту"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Button type="submit" fullWidth disabled={isLoading} style={{marginTop: '20px'}}>
                    {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                </Button>
            </form>
        </Modal>
    );
};

export default EditProductModal;