import { useThemeControl } from 'components/Provider';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import {
  Label,
  SizeTokens,
  XStack,
  YStack,
  Text,
  styled,
  Stack,
  useTheme,
} from 'tamagui';

type Props = {
  size?: SizeTokens;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  defaultValue?: string;
};

export type InputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

const Input = forwardRef<InputRef, Props>((props, ref) => {
  const { theme, toggleTheme } = useThemeControl();
  const t = useTheme();
  const { iconRight, iconLeft, label = '', autoFocus, ...inputProps } = props;
  const inputId = `input-${Math.random().toString(36).slice(2, 11)}`;
  const inputRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
  }));

  return (
    <YStack>
      {label && (
        <Label
          style={{
            lineHeight: 24,
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          {label}
        </Label>
      )}
      <XStack
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: '#fff',
          paddingHorizontal: 12,
          minHeight: 46,
        }}
      >
        {iconLeft && (
          <YStack style={{ marginRight: 8, opacity: 0.5 }}>{iconLeft}</YStack>
        )}
        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            fontSize: 16,
            color: '#000',
            minHeight: 40,
            paddingVertical: 8,
            backgroundColor: 'transparent',
          }}
          placeholderTextColor="#999"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="done"
          onFocus={() => {
            inputRef.current?.focus();
          }}
          {...inputProps}
        />
        {iconRight && (
          <YStack style={{ marginLeft: 8, opacity: 0.5 }}>{iconRight}</YStack>
        )}
      </XStack>
      {props.helperText && (
        <Text
          style={{
            marginTop: 4,
            color: props.error ? 'red' : theme === 'light' ? '#000' : '#fff',
          }}
        >
          {props.helperText}
        </Text>
      )}
    </YStack>
  );
});

Input.displayName = 'Input';

export default Input;
