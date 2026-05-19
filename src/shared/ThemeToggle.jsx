import { Moon, Sun } from 'lucide-react'

import {
  useTheme,
} from '../context/ThemeContext'

export default function ThemeToggle() {
  const {
    darkMode,
    setDarkMode,
  } = useTheme()

  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
      className="
        w-14
        h-14
        rounded-2xl
        flex
        items-center
        justify-center
        bg-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {darkMode ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  )
}