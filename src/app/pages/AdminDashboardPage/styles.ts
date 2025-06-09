import styled from 'styled-components';

export const DashboardContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
    margin-bottom: 30px;

    h1 {
        margin-bottom: 0;
    }
`;

export const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const LogoutLink = styled.a`
    color: ${({ theme }) => theme.colors.danger};
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const TabsContainer = styled.div`
    display: flex;
    margin-bottom: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const TabButton = styled.div<{ active?: boolean }>`
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
    font-weight: ${({ active }) => (active ? '600' : '500')};

    &:hover {
        color: ${({ theme }) => theme.colors.primaryDark};
    }

    &.active { 
        border-bottom-color: ${({ theme }) => theme.colors.primary};
    }
`;

export const TabContent = styled.div`
`;

export const SectionHeaderWithButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        margin-bottom: 0;
    }
`;