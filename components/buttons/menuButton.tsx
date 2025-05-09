import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow } from '~/theme';
import { useRouter } from 'expo-router';


const options = [
  { id: '1', label: 'Conta' },
  { id: '2', label: 'Configurações' },
  { id: '3', label: 'Sair da conta' },
];

export default function MenuButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleOptionPress = (option: string) => {
    if (option === 'Conta'){
      console.log('Abrir modal de conta');
    };
    if (option === 'Configurações'){
      console.log('Abrir modal ou pagina');
    };
    if (option === 'Sair da conta'){
      router.replace('/login');
    };

    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <View style={styles.fabInner}>
          <Feather name="menu" size={25} color="#173A64" />
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
   flex: 1,
  },
  fabInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
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
