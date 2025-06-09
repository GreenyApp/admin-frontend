import styled, { css, type DefaultTheme } from 'styled-components';

interface StyledButtonProps {
    variant?: 'danger' | 'outline'; 
    fullWidth?: boolean;
    size?: 'small';
    theme: DefaultTheme;
}

export const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.lightGray};
        color: ${({ theme }) => theme.colors.text};
        cursor: not-allowed;
    }

    ${({ variant, theme }) =>
        variant === 'danger' &&
        css`
            background-color: ${theme.colors.danger};
            &:hover {
                background-color: ${theme.colors.dangerDark};
            }
        `}

    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `}

    ${({ size }) =>
        size === 'small' &&
        css`
            padding: 5px 10px;
            font-size: 14px;
        `}
`;