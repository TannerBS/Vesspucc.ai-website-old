import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';
import featherCursor from '../assets/cursors/feather-icon.svg';

// Font imports should be in the HTML or imported directly, not in styled-components template literals
// These imports are moved to index.html

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    cursor: url(${featherCursor}), auto;
  }

  html, body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.header};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  h2 {
    font-size: 2rem;
    line-height: 1.25;
  }

  h3 {
    font-size: 1.75rem;
    line-height: 1.3;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.35;
  }

  h5 {
    font-size: 1.25rem;
    line-height: 1.4;
  }

  h6 {
    font-size: 1rem;
    line-height: 1.45;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  button {
    /* Removed cursor: pointer to maintain the feather cursor */
    font-family: ${({ theme }) => theme.fonts.body};
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .glass-panel {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: ${({ theme }) => theme.spacing.lg};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  .scroll-container {
    position: relative;
    overflow: hidden;
  }

  /* Add scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(245, 230, 211, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .hidden {
    display: none;
  }

  .flex {
    display: flex;
  }

  .justify-center {
    justify-content: center;
  }

  .align-center {
    align-items: center;
  }

  .space-between {
    justify-content: space-between;
  }
`;

export default GlobalStyles;