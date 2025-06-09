import React, { useState, type FormEvent } from 'react';
import Modal from '../../Modal';
import Input from '../../Input';
import Button from '../../Button';
import { useUIStore } from '../../../store/uiStore';
import { useAdminProductStore } from '../../../store/adminProductStore';

const AddProductModal: React.FC = () => {
    const { isAddProductModalOpen, closeAddProductModal } = useUIStore();
    const { createAdminProduct, isLoading } = useAdminProductStore();
    const [productCode, setProductCode] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!productCode.trim()) {
            useUIStore.getState().showNotification("Код продукту є обов'язковим", 'error');
            return;
        }
        const newProduct = await createAdminProduct(productCode);
        if (newProduct) {
            setProductCode('');
            closeAddProductModal();
        }
    };

    return (
        <Modal
            isOpen={isAddProductModalOpen}
            onClose={() => {
                setProductCode(''); 
                closeAddProductModal();
            }}
            title="Додати новий продукт"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    id="product-code-modal"
                    label="Код продукту"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Button type="submit" fullWidth disabled={isLoading} style={{marginTop: '20px'}}>
                    {isLoading ? 'Створення...' : 'Створити продукт'}
                </Button>
            </form>
        </Modal>
    );
};

export default AddProductModal;