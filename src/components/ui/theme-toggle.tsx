/**
 * Theme Toggle Component
 * 
 * Provides dark/light mode switching functionality for the portfolio.
 * Uses next-themes for seamless theme management with system preference detection.
 * 
 * Features:
 * - System theme detection
 * - Smooth transitions between themes
 * - Accessible keyboard navigation
 * - Visual feedback with icons
 */

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Light mode icon */}
      <Sun className={`h-5 w-5 transition-all duration-300 ${
        theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
      }`} />
      
      {/* Dark mode icon */}
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${
        theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
      }`} />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}