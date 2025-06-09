import styled, { css } from 'styled-components';
import type { NotificationType } from '../../store/uiStore';

interface NotificationWrapperProps {
    visible: boolean;
    type: NotificationType;
}

export const NotificationWrapper = styled.div<NotificationWrapperProps>`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateY(-100px);
    opacity: 0;
    z-index: 2000;
    min-width: 250px;
    text-align: center;

    ${({ type, theme }) => {
        switch (type) {
            case 'success':
                return css`background-color: ${theme.colors.primary};`;
            case 'error':
                return css`background-color: ${theme.colors.danger};`;
            default:
                return css`background-color: ${theme.colors.primary};`;
        }
    }}

    ${({ visible }) =>
        visible &&
        css`
            transform: translateY(0);
            opacity: 1;
        `}
`;