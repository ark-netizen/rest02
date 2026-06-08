import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export const COLOR_THEMES = [
  { id: 'cyan',    label: '시안',    color: '#06b6d4' },
  { id: 'purple',  label: '퍼플',    color: '#8b5cf6' },
  { id: 'emerald', label: '에메랄드', color: '#10b981' },
  { id: 'amber',   label: '앰버',    color: '#f59e0b' },
]

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('arkit-theme')
    return saved ? saved === 'dark' : true
  })
  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('arkit-color') || 'cyan'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('arkit-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-color', colorTheme)
    localStorage.setItem('arkit-color', colorTheme)
  }, [colorTheme])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
