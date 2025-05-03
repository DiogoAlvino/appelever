// Equipments.tsx
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import MainButton from '~/components/buttons/mainButton';
import SearchInput from '~/components/inputs/searchInput';
import EquipmentList from '~/components/lists/equipamentList';
import { equipment } from '~/data/questions';
import { colors } from '~/theme';

export default function Equipments() {
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

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <SearchInput onSearch={() => {}} />
      <EquipmentList
        equipaments={equipment}
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
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: colors.bgScreen,
  },
  buttonGroup: {
    marginTop: 20,
    width: '90%',
    gap: 10,
  },
});
