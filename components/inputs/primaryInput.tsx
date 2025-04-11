import { TextInput, StyleSheet, View, TextInputProps, Text } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';

interface PrimaryInputProps extends TextInputProps {
  label?: string;
}

export default function PrimaryInput({ label, ...props }: PrimaryInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor="#686666"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
  },
});
