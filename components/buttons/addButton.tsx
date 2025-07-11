import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';

interface AddButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  icon?: 'plus' | 'minus'; // nova prop opcional
}

export default function AddButton({ label, onPress, style, icon = 'plus' }: AddButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Feather
        name={icon === 'plus' ? 'plus-circle' : 'minus-circle'}
        size={19}
        color="#1666db"
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: border.radius,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9F9F9',
  },
  label: {
    fontSize: 14,
    color: colors.bgLink,
    fontWeight: '500',
  },
});
