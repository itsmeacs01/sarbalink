import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { CurrentToast } from './CurrentToast'
import { LanguageProvider } from './i18n/LanguageProvider'
import { config } from '../tamagui.config'

type ThemeName = 'light' | 'dark'

type ThemeControlContext = {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
  toggleTheme: () => void
}

const ThemeControlContext = createContext<ThemeControlContext | undefined>(undefined)

export const useThemeControl = () => {
  const ctx = useContext(ThemeControlContext)
  if (!ctx) throw new Error('useThemeControl must be used within ThemeControlProvider')
  return ctx
}

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()
  const initial = (colorScheme === 'dark' ? 'dark' : 'light') as ThemeName
  const [theme, setTheme] = useState<ThemeName>(initial)

  // If you want to respect OS changes automatically, uncomment the effect below.
  // Right now we keep the user's last selection in state for the session.
  useEffect(() => {
    // keep initial in sync on first load only
    setTheme(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const ctx = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

  return (
    <ThemeControlContext.Provider value={ctx}>
      <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
        <LanguageProvider>
          <ToastProvider
            swipeDirection="horizontal"
            duration={6000}
            native={
              [
                // uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go
                // 'mobile'
              ]
            }
          >
            {children}
            <CurrentToast />
            <ToastViewport top="$8" left={0} right={0} />
          </ToastProvider>
        </LanguageProvider>
        
        
      </TamaguiProvider>
    </ThemeControlContext.Provider>
  )
}
