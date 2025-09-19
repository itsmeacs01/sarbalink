# Input Component - Enhanced Focus Management Guide

This document outlines the enhanced Input component with comprehensive focus management, accessibility features, and React Native best practices.

## Key Features

### 1. **Comprehensive Focus Management**
- **autoFocus**: Automatically focus the input when component mounts
- **Programmatic Focus**: Use refs to control focus, blur, clear, and get values
- **Keyboard Handling**: Proper keyboard avoidance and tap handling

### 2. **Enhanced Accessibility**
- **Unique IDs**: Automatically generated unique IDs for label-input association
- **Required Field Indicators**: Visual indicators for required fields
- **Error States**: Clear error messaging and visual feedback
- **Screen Reader Support**: Proper ARIA attributes and semantic markup

### 3. **Rich Input Types**
- **Text Inputs**: Standard text, email, URL, search
- **Numeric Inputs**: Numbers, phone numbers, decimal
- **Secure Inputs**: Password fields with secure text entry
- **Multiline Inputs**: Textarea support with configurable lines

### 4. **Advanced Features**
- **Input Validation**: Built-in error handling and validation states
- **Character Limits**: Configurable max length restrictions
- **Auto-correction**: Configurable auto-correction and capitalization
- **Clear Button**: Built-in clear functionality with configurable modes
- **Submit Handling**: Proper form submission and return key handling

## Usage Examples

### Basic Input with autoFocus
```tsx
<Input 
  label="Email Address"
  placeholder="Enter your email"
  autoFocus={true}
  keyboardType="email-address"
  autoCapitalize="none"
  autoCorrect={false}
  onFocus={() => console.log('Email input focused')}
  onBlur={() => console.log('Email input blurred')}
/>
```

### Required Field with Validation
```tsx
<Input
  label="Password"
  placeholder="Enter your password"
  required={true}
  secureTextEntry={true}
  errorText="Password must be at least 8 characters"
  maxLength={50}
/>
```

### Programmatic Control
```tsx
const inputRef = useRef<InputRef>(null);

const handleFocus = () => {
  inputRef.current?.focus();
};

const handleClear = () => {
  inputRef.current?.clear();
};

const handleGetValue = () => {
  const value = inputRef.current?.getValue();
  console.log('Current value:', value);
};

<Input
  ref={inputRef}
  label="Controlled Input"
  placeholder="Type something"
  onChangeText={(text) => console.log('Input changed:', text)}
/>
<Button onPress={handleFocus}>Focus</Button>
<Button onPress={handleClear}>Clear</Button>
<Button onPress={handleGetValue}>Get Value</Button>
```

### Input with Icons
```tsx
import { Search, Eye } from '@tamagui/lucide-icons';

<Input
  label="Search"
  placeholder="Search for something..."
  iconLeft={<Search size={20} color="$gray9" />}
  iconRight={<Eye size={20} color="$gray9" />}
  keyboardType="web-search"
  returnKeyType="search"
  onSubmitEditing={() => console.log('Search submitted')}
/>
```

### Multiline Input
```tsx
<Input
  label="Description"
  placeholder="Enter a description..."
  multiline={true}
  numberOfLines={4}
  maxLength={500}
  autoCapitalize="sentences"
  helperText="Maximum 500 characters"
/>
```

## Props Reference

### Core Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the input |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled input value |
| `defaultValue` | `string` | - | Default input value |
| `autoFocus` | `boolean` | `false` | Automatically focus when mounted |

### Focus & Events
| Prop | Type | Description |
|------|------|-------------|
| `onFocus` | `() => void` | Callback when input gains focus |
| `onBlur` | `() => void` | Callback when input loses focus |
| `onChangeText` | `(text: string) => void` | Callback when input text changes |
| `onSubmitEditing` | `() => void` | Callback when return key is pressed |

### Input Types & Behavior
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keyboardType` | `string` | `'default'` | Type of keyboard to display |
| `returnKeyType` | `string` | `'done'` | Label for the return key |
| `secureTextEntry` | `boolean` | `false` | Hide text input (for passwords) |
| `multiline` | `boolean` | `false` | Allow multiple lines of text |
| `numberOfLines` | `number` | `1` | Number of lines for multiline input |
| `maxLength` | `number` | - | Maximum number of characters |

### Text Behavior
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoCapitalize` | `string` | `'none'` | Auto-capitalization behavior |
| `autoCorrect` | `boolean` | `false` | Enable auto-correction |
| `selectTextOnFocus` | `boolean` | `true` | Select all text on focus |
| `clearButtonMode` | `string` | `'while-editing'` | When to show clear button |

### Validation & States
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Mark field as required |
| `disabled` | `boolean` | `false` | Disable the input |
| `errorText` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text to display |

### Visual Elements
| Prop | Type | Description |
|------|------|-------------|
| `iconLeft` | `React.ReactNode` | Left icon component |
| `iconRight` | `React.ReactNode` | Right icon component |
| `size` | `SizeTokens` | Size token for the input |

## Ref Methods

| Method | Description |
|--------|-------------|
| `focus()` | Programmatically focus the input |
| `blur()` | Programmatically blur the input |
| `clear()` | Clear the input value |
| `getValue()` | Get the current input value |
| `setValue(value: string)` | Set the input value programmatically |
| `isFocused()` | Check if the input is currently focused |

## Keyboard Types

| Type | Description | Use Case |
|------|-------------|---------|
| `default` | Standard keyboard | General text input |
| `email-address` | Email keyboard | Email addresses |
| `numeric` | Numeric keyboard | Numbers only |
| `phone-pad` | Phone number keyboard | Phone numbers |
| `number-pad` | Number pad | PIN codes |
| `decimal-pad` | Decimal keyboard | Decimal numbers |
| `url` | URL keyboard | Web URLs |
| `web-search` | Web search keyboard | Search queries |

## Return Key Types

| Type | Description |
|------|-------------|
| `done` | "Done" button |
| `go` | "Go" button |
| `next` | "Next" button |
| `search` | "Search" button |
| `send` | "Send" button |

## Best Practices

### 1. **Accessibility**
- Always provide meaningful labels
- Use appropriate keyboard types for data types
- Provide clear error messages
- Test with screen readers

### 2. **Performance**
- Use `onChangeText` sparingly for expensive operations
- Consider debouncing text input handlers
- Avoid unnecessary re-renders with proper memoization

### 3. **User Experience**
- Provide clear placeholder text
- Use appropriate keyboard types
- Show validation errors clearly
- Consider auto-focus for the first input in forms

### 4. **Form Integration**
- Use controlled components for form state
- Implement proper validation
- Handle form submission correctly
- Provide clear feedback for user actions

## Troubleshooting

### Input not focusing
1. Ensure `autoFocus={true}` is set if you want automatic focus
2. Check that the parent ScrollView has `keyboardShouldPersistTaps="handled"`
3. Verify the input is not wrapped in unnecessary containers
4. Check that `disabled={false}` (default)

### Keyboard covering input
1. Ensure the screen is wrapped in `KeyboardAvoidingView`
2. Set appropriate `keyboardVerticalOffset` for your header height
3. Use `behavior="padding"` for iOS and `behavior="height"` for Android

### Validation not working
1. Check that `errorText` is provided for error states
2. Ensure proper validation logic in `onChangeText`
3. Verify that required fields are properly marked

### Icons not displaying
1. Ensure icon components are properly imported
2. Check that icons have appropriate size and color props
3. Verify that icon components are valid React elements
