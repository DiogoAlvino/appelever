import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';


const options = [
  { id: '1', label: 'Conta' },
  { id: '2', label: 'Configurações' },
  { id: '3', label: 'Sair da conta' },
];

export default function MenuButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option: string) => {
    console.log('Opção selecionada:', option);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <View style={styles.fabInner}>
          <Feather name="menu" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Feather name="arrow-left" size={24} color="#173A64" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Menu</Text>
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuItem} onPress={() => handleOptionPress(item.label)}>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Feather name="chevron-right" size={22} color="#173A64" />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  fabInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.bgMenu,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,  
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.mainColor,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: fontSize.label,
    color: colors.primaryDark,
  },
});
