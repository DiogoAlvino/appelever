import { Text, TextInput, View, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { colors, fontSize, border, heigth, margin, padding } from '~/theme';

interface PrimaryInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  mask?: string;
}

export default function PrimaryInput({
  label,
  value,
  onChangeText,
  placeholder,
  error = false,
  errorMessage,
  mask,
}: PrimaryInputProps) {
  const InputComponent = mask ? MaskedTextInput : TextInput;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <InputComponent
        mask={mask}
        style={[styles.input, error && styles.errorInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={mask ? 'numeric' : 'default'}
      />
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
  input: {
    height: heigth.input,
    backgroundColor: colors.bgInput,
    paddingHorizontal: padding.horizontal,
    borderRadius: border.radius,
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    borderWidth: 1,
    borderColor: '#ccc',
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
