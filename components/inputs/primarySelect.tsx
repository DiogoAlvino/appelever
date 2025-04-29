/*

const [modelo, setModelo] = useState<string | undefined>(undefined);

<PrimarySelect
  label="Modelo"
  placeholder="Selecione o item"
  options={['Modelo A', 'Modelo B', 'Modelo C']}
  selected={modelo}
  onSelect={(value) => setModelo(value)}
/>

*/


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { border, colors, fontSize, margin, padding } from '~/theme';

interface PrimarySelectProps {
  label: string;
  placeholder?: string;
  options: string[];
  onSelect: (option: string) => void;
  selected?: string;
}

export default function PrimarySelect({ label, placeholder = 'Selecione', options, onSelect, selected }: PrimarySelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity style={styles.selectContainer} onPress={() => setModalVisible(true)}>
        <Text style={[styles.selectText, !selected && styles.placeholder]}>
          {selected || placeholder}
        </Text>
        <Feather name="chevron-down" size={25} color="#173A64" />
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: fontSize.label,
    color: colors.primaryDark,
    marginBottom: margin.bottom,
  },
  selectContainer: {
    backgroundColor: colors.bgInput,
    borderRadius: border.radius,
    paddingHorizontal: padding.horizontal,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
  placeholder: {
    color: colors.primaryDark,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: 300,
  },
  optionItem: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: colors.primaryDark,
  },
});
