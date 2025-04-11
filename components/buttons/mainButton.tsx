import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

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
    backgroundColor: '#173A64',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#173A64',
  },
  secondaryText: {
    color: '#173A64',
  },
});
