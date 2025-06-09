import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { NotificationWrapper } from './styles';

const Notification: React.FC = () => {
    const { message, type, visible } = useUIStore((state) => state.notification);

    if (!message && !visible) return null; 

    return (
        <NotificationWrapper visible={visible} type={type}>
            {message}
        </NotificationWrapper>
    );
};

export default Notification;