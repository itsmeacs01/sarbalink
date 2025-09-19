import { ExternalLink, Mail } from '@tamagui/lucide-icons';
import { Anchor, H2, Paragraph, useTheme, XStack, YStack } from 'tamagui';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { ToastControl } from 'components/CurrentToast';
import ThemeControl from 'components/ThemeControl';
import { LanguageSwitch } from 'components/LanguageSwitch';
import { useLanguage } from 'components/i18n/LanguageProvider';
import Input from 'components/common/Input';
import { useThemeControl } from 'components/Provider';

export default function TabOneScreen() {
  const { t } = useLanguage();

  const theme = useTheme()

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
      style={{
                  backgroundColor: theme.background.val,

      }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} px="$4" pt="$5" bg="$background">
          <H2>{t('app.title')}</H2>
          
          <YStack pt="$4" px="$2">
            <Input
              label="Sample Input"
              placeholder="Type something here..."
              // iconRight={<Mail size={20} />}
              iconLeft={<Mail size={20} />}
              helperText='This is a helper text'
            />
          </YStack>

          <LanguageSwitch />

          <ThemeControl />

          <ToastControl />

          <XStack
            items="center"
            justify="center"
            flexWrap="wrap"
            gap="$1.5"
            position="absolute"
            b="$8"
          >
            <Paragraph fontSize="$5">Add</Paragraph>

            <Paragraph fontSize="$5" px="$2" py="$1" color="$blue10" bg="$blue5">
              tamagui.config.ts
            </Paragraph>

            <Paragraph fontSize="$5">to root and follow the</Paragraph>

            <XStack
              items="center"
              gap="$1.5"
              px="$2"
              py="$1"
              rounded="$3"
              bg="$green5"
              hoverStyle={{ bg: '$green6' }}
              pressStyle={{ bg: '$green4' }}
            >
              <Anchor
                href="https://tamagui.dev/docs/core/configuration"
                textDecorationLine="none"
                color="$green10"
                fontSize="$5"
              >
                Configuration guide
              </Anchor>
              <ExternalLink size="$1" color="$green10" />
            </XStack>

            <Paragraph fontSize="$5" text="center">
              to configure your themes and tokens.
            </Paragraph>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
