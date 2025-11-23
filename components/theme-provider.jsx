'use client'

import { createContext, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Always use light theme
  const theme = 'light'
  const toggleTheme = () => {
    // No-op since we only support light mode
    console.log('Dark mode is disabled')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}