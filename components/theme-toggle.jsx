'use client'

import { Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled
      className="relative rounded-full opacity-50 cursor-not-allowed"
      aria-label="Light mode only - dark mode disabled"
      title="Light mode only"
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute inset-0 text-yellow-500" />
      </div>
    </Button>
  )
}