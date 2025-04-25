import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow, weight } from '~/theme';
import CheckBox from '../inputs/CheckBox';

interface SecondarySectionProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  showChevron?: boolean;
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  disabled?: boolean;
  backgroundColor?: string;
}

export default function SecondarySection({
  icon,
  title,
  children,
  onPress,
  showChevron = true,
  showCheckbox = false,
  checked = false,
  onCheckChange,
  disabled,
  backgroundColor
}: SecondarySectionProps) {
  return (
    <View style={[
      styles.container,
      { backgroundColor: backgroundColor || colors.primaryLight, opacity: disabled ? 0.9 : 1 }
    ]}>
      <View style={styles.leftSection}>
        {showCheckbox && (
          <CheckBox checked={checked} onPress={() => onCheckChange?.(!checked)} />
        )}

        <View style={styles.content}>
          <View style={styles.icon}>{icon}</View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {children}
          </View>
        </View>
      </View>

      {showChevron && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Feather name="chevron-right" size={25} color="#173A64" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    borderRadius: border.radius,
    padding: padding.fourty,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: shadow.elevation,
    shadowColor: colors.primaryDark,
    shadowOpacity: shadow.opacity,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: shadow.radius,
    marginVertical: margin.vertical,
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flexShrink: 1,
    gap: gap.primary,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '500',
    color: colors.mainColor,
    marginBottom: 2,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: colors.primaryDark,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
});
