import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Lang, translations } from './translations'
import { useColorScheme } from 'react-native'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

// Minimal fast i18n provider: stores lang in memory and exposes t() that does
// a fast object lookup. Designed to be tiny and avoid any heavy deps.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme()
  const defaultLang: Lang = 'en'

  const [lang, setLang] = useState<Lang>(defaultLang)

  // If you want to detect system language, you could use Expo Localization.
  useEffect(() => {
    // Keep this effect minimal; do not override user choice.
  }, [system])

  // Fast translate function (memoized). Returns fallback if key not present.
  const t = useCallback(
    (key: string, fallback?: string) => {
      const bucket = translations[lang] || translations.en
      return bucket[key] ?? fallback ?? key
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
