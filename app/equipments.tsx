import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import MainButton from '~/components/buttons/mainButton';
import SearchInput from '~/components/inputs/searchInput';
import EquipmentList from '~/components/lists/equipamentList';
import { useEquipments } from '~/hooks/useEquipments';

export default function Equipments() {
  const { equipments, loading, reload } = useEquipments();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCancel = () => setSelectedId(null);

  const handleInspect = () => {
    if (selectedId) {
      router.push({
        pathname: '/normativeInspection/[equipmentId]',
        params: { equipmentId: selectedId },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchInput onSearch={reload} />
        <View style={styles.bar}>
          <Text>Filtro</Text>
          <Text>Total: {equipments.length}</Text>
        </View>
        <EquipmentList
          equipaments={equipments}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
        />
      </ScrollView>

      {selectedId && (
        <View style={styles.buttonGroup}>
          <MainButton title="Inspecionar" onPress={handleInspect} />
          <MainButton title="Cancelar" onPress={handleCancel} type="secondary" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 100, // espaço para não esconder conteúdo atrás do botão
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonGroup: {
    width: "100%",
    position: 'absolute',
    padding: 10,
    bottom: 1,
    gap: 10,
    backgroundColor: 'white',
  },
});
