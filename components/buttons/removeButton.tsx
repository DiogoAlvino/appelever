/*USO:

<RemoveButton label="Remover formação" onPress={() => console.log('Remover')} />


*/

import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';

interface RemoveButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function RemoveButton({ label, onPress, style }: RemoveButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Feather name="trash-2" size={16} color="#007bff" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: colors.bgLink,
    fontSize: 14,
    fontWeight: '500',
  },
});
