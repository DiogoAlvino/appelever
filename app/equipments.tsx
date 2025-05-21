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
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
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

      {selectedId && (
        <View style={styles.buttonGroup}>
          <MainButton title="Inspecionar" onPress={handleInspect} />
          <MainButton title="Cancelar" onPress={handleCancel} type="secondary" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonGroup: {
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
