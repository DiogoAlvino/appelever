import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';

interface MainButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  type?: 'primary' | 'secondary';
}

export default function MainButton({ title, onPress, type = 'primary' }: MainButtonProps) {
  const isSecondary = type === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary && styles.secondaryButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, isSecondary && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.mainColor,
    borderRadius: border.radius,
    height: heigth.button,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: colors.primaryLight,
    fontSize: fontSize.title,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
    borderWidth: border.width,
    borderColor: colors.mainColor,
  },
  secondaryText: {
    color: colors.mainColor,
  },
});
