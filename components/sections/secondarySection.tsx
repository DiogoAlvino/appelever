import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow, weight } from '~/theme';

interface SecondarySectionProps {
  icon: React.ReactNode;
  title: string;
  text1: string;
  text2: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function SecondarySection({ icon, title, text1, text2, onPress }: SecondarySectionProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text1}</Text>
          <Text style={styles.text}>{text2}</Text>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color="#173A64" />
    </TouchableOpacity>
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
    width: "100%"
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
  text: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
});
