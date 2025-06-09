import React from 'react';
import { ModalOverlay, ModalContentWrapper, CloseButton, ModalHeader } from './styles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <ModalContentWrapper onClick={handleContentClick}>
                <ModalHeader>
                    <h2>{title}</h2>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                {children}
            </ModalContentWrapper>
        </ModalOverlay>
    );
};

export default Modal;