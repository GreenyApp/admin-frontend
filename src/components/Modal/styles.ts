import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center; 
`;

export const ModalContentWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    margin: 10% auto;
    padding: 20px;
    width: 90%; 
    max-width: 500px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

export const ModalHeader = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  h2 {
    margin-bottom: 0;
  }
`;


export const CloseButton = styled.span`
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
    padding: 0 5px;

    &:hover,
    &:focus {
        color: ${({ theme }) => theme.colors.black};
        text-decoration: none;
    }
`;