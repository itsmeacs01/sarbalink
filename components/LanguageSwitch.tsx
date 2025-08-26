import React from 'react';
import { XStack, Button, YStack, Text } from 'tamagui';
import { useLanguage } from './i18n/LanguageProvider';

export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();

  return (
    <YStack gap="$2" style={{ alignItems: 'center' }}>
      <XStack gap="$2">
        <Button
          size="$2"
          onPress={() => setLang('en')}
          style={{ opacity: lang === 'en' ? 1 : 0.7 }}
        >
          <Text>{t('language.english')}</Text>
        </Button>
        <Button
          size="$2"
          onPress={() => setLang('ne')}
          style={{ opacity: lang === 'ne' ? 1 : 0.7 }}
        >
          <Text>{t('language.nepali')}</Text>
        </Button>
      </XStack>
    </YStack>
  );
}
