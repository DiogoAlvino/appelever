import React, { useCallback, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import debounce from 'lodash/debounce';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';


interface SearchInputProps extends TextInputProps {
  onSearch?: (text: string) => void;
}

export default function SearchInput({ placeholder = 'Buscar por...', onSearch, ...props }: SearchInputProps) {
  const [text, setText] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch?.(value);
    }, 400),
    []
  );

  const handleChange = (value: string) => {
    setText(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setText('');
    onSearch?.('');
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#173A64" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#555"
        underlineColorAndroid="transparent"
        {...props}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Feather name="x" size={18} color="#173A64" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: colors.mainColor,
    borderWidth: border.width,
    borderRadius: border.search,
    alignItems: 'center',
    paddingHorizontal: padding.search,
    height: heigth.search,
    backgroundColor: '#fff',
    width: "100%",
  },
  icon: {
    marginRight: margin.right,
  },
  input: {
    flex: 1,
    fontSize: fontSize.placeholder,
    color: colors.primaryDark
  },
});
