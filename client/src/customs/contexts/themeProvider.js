import themes from '@themes/themes';
import detectTheme from '@utilities/detectTheme';
import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledTheme } from 'styled-components';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(detectTheme());

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledTheme theme={themes[theme]}>{children}</StyledTheme>
    </ThemeContext.Provider>
  );
}
