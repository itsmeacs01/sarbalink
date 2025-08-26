export type Lang = 'en' | 'ne'

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    'app.title': 'SarbaLink',
    'greeting.hello': 'Hello',
    'greeting.welcome': 'Welcome to SarbaLink',
    'language.english': 'English',
    'language.nepali': 'नेपाली',
    'language.label': 'Language',
    'button.ok': 'OK',
  },
  ne: {
    'app.title': 'सर्भालिंक',
    'greeting.hello': 'नमस्ते',
    'greeting.welcome': 'सर्भालिंकमा स्वागत छ',
    'language.english': 'English',
    'language.nepali': 'नेपाली',
    'language.label': 'भाषा',
    'button.ok': 'ठीक छ',
  },
}
