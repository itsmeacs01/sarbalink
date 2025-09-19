import React from 'react';
import {
  Button,
  Switch,
  XStack,
  YStack,
  Label,
  useTheme,
  Separator,
  Text,
} from 'tamagui';
import { useThemeControl } from './Provider';
import { Moon, Sun } from '@tamagui/lucide-icons';

export function ThemeControl() {
  const { theme, toggleTheme } = useThemeControl();
  const t = useTheme();


  return (
    <YStack gap="$2" items="center">
      <XStack items="center" gap="$2">
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          size="$4"
        >
          <Switch.Thumb
            style={{
              border: '2px solid red !important',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            animation="bouncy"
          >
            <Text>{theme === 'dark' ? <Sun /> : <Moon />}</Text>
          </Switch.Thumb>
        </Switch>
      </XStack>
    </YStack>
  );
}

export default ThemeControl;
