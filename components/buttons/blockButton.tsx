import React, { ReactNode } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow } from '~/theme';


interface BlockButtonProps {
  icon: ReactNode;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function BlockButton({ icon, label, onPress }: BlockButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: margin.vertical,
    width: 80,
  },
  iconContainer: {
    backgroundColor: colors.mainColor,
    borderRadius: border.radius,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    shadowOffset: { width: 0, height: 3 },
    elevation: shadow.elevation,
  },
  label: {
    marginTop: margin.top,
    fontSize: fontSize.text,
    textAlign: 'center',
    color: colors.primaryDark,
  },
});
