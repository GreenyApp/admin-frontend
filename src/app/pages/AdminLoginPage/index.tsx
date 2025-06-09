import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../../store/adminAuthStore';
import { useUIStore } from '../../../store/uiStore';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { LoginContainer, ErrorMessage, LoginPageContainer } from './styles';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, isLoading, error: authError } = useAdminAuthStore();
    const showNotification = useUIStore(state => state.showNotification);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        useAdminAuthStore.setState({ error: null }); 

        const success = await login({ email, password });
        if (success) {
            showNotification('Вхід успішний!', 'success');
            navigate('/');
        }
    };

    return (
        <LoginPageContainer>
            <LoginContainer>
                <h2>Вхід в адміністративну панель</h2>
                <form onSubmit={handleSubmit}>
                    {authError && <ErrorMessage>{authError}</ErrorMessage>}
                    <Input
                        id="adminEmail"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        id="adminPassword"
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" fullWidth disabled={isLoading}>
                        {isLoading ? 'Вхід...' : 'Увійти'}
                    </Button>
                </form>
            </LoginContainer>
        </LoginPageContainer>
    );
};

export default AdminLoginPage;