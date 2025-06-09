import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'outline' | 'danger';
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, icon, variant, fullWidth, ...props }) => {
    return (
        <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
            {icon}
            {children}
        </StyledButton>
    );
};

export default Button;