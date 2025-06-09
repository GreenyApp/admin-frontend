import React from 'react';
import { FormGroup, Label, StyledInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <FormGroup>
            {label && <Label htmlFor={id}>{label}</Label>}
            <StyledInput id={id} {...props} />
        </FormGroup>
    );
};

export default Input;