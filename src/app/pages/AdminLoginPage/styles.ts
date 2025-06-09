import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export const LoginContainer = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 0 auto; 
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    h2 {
        text-align: center;
    }
`;

export const FormGroup = styled.div` 
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
`;

export const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.colors.danger};
    margin-bottom: 15px;
    text-align: center;
    font-size: 0.9em;
`;