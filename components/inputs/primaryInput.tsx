import { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, heigth, margin, padding } from '~/theme';

interface PrimaryInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  mask?: string;
  type?: 'text' | 'password'; // 👈 nova prop
}

export default function PrimaryInput({
  label,
  value,
  onChangeText,
  placeholder,
  error = false,
  errorMessage,
  mask,
  type = 'text',
}: PrimaryInputProps) {
  const InputComponent = mask ? MaskedTextInput : TextInput;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const secureTextEntry = isPassword && !showPassword;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <InputComponent
          mask={mask}
          style={[styles.input, error && styles.errorInput, isPassword && { paddingRight: 40 }]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={mask ? 'numeric' : 'default'}
          secureTextEntry={secureTextEntry}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorMessage}>{errorMessage || 'Campo inválido'}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: fontSize.label,
    color: colors.primaryDark,
    marginBottom: margin.bottom,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: padding.horizontal,
    paddingVertical: 15.5,
    borderRadius: border.radius,
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    borderWidth: 1,
    borderColor: '#ccc',
    
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});
