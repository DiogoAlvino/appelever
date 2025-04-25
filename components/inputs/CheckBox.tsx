import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type CheckBoxProps = {
  checked: boolean;
  onPress: () => void;
};

export default function CheckBox({ checked, onPress }: CheckBoxProps) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor: checked ? '#173A64' : '#FFFF' }
        ]}
      >
        {checked && <Feather name="check" size={18} color="white" />}
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#173A64',
    borderRadius: 4,
    backgroundColor: '#173A64',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
