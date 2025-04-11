import { TextInput, StyleSheet, View, TextInputProps, Text } from 'react-native';

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
    fontSize: 18,
    color: '#5B5A5A',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#F0F6FF',
    paddingHorizontal: 17,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
  },
});
