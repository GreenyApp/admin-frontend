import { createGlobalStyle, type DefaultTheme } from 'styled-components';

export const adminColors = {
    primary: '#4caf50',
    primaryDark: '#388e3c',
    secondary: '#f5f5f5',
    text: '#333',
    lightGray: '#e0e0e0', 
    danger: '#f44336',
    dangerDark: '#d32f2f',
    white: '#ffffff',
    black: '#000000',
};

export const adminFonts = {
    main: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

export const adminTheme: DefaultTheme = {
    colors: adminColors,
    fonts: adminFonts,
    breakpoints: { 
        mobile: '768px',
        tablet: '1024px',
    },
};

export const AdminGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
  }

  body {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  h1, h2, h3 {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof adminColors;
    fonts: typeof adminFonts;
    breakpoints: {
        mobile: string;
        tablet: string;
    };
  }
}