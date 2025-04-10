export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    white: string;
    black: string;
    gray: string;
    darkGray: string;
    lightGray: string;
    error: string;
    success: string;
    darkText: string;
  };
  fonts: {
    header: string;
    body: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  boxShadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    modal: number;
    overlay: number;
    dropdown: number;
    header: number;
    footer: number;
  };
}

export const theme: Theme = {
  colors: {
    primary: '#8B4513', // Rich sepia tones for historical authenticity
    secondary: '#1B4B73', // Naval blues for maritime elements
    accent: '#CFB53B', // Antique gold for interactive elements
    background: '#F5E6D3', // Weathered parchment
    white: '#FFFFFF',
    black: '#000000',
    gray: '#CCCCCC',
    darkGray: '#333333',
    lightGray: '#F5F5F5',
    error: '#FF0000',
    success: '#28A745',
    darkText: '#333333', // Same as darkGray for consistency
  },
  fonts: {
    header: '"Spectral", serif',
    body: '"Inter", sans-serif',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  boxShadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    xl: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600,
  },
};