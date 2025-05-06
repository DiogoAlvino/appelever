// EquipmentList.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';
import { router } from 'expo-router';

interface EquipmentItem {
  id: string;
  name: string;
  address: string;
}

interface EquipmentListProps {
  equipaments: EquipmentItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function EquipmentList({ equipaments, selectedId, onSelect }: EquipmentListProps) {
  
  const handleViewEquipment = (equipmentId: string) => {
    router.push({
      pathname: '/equipmentForm/[equipmentId]',
      params: { equipmentId },
    });
  };
  
  return (
    <View style={styles.wrapper}>
      {equipaments.map((equip) => {
        const isSelected = selectedId === equip.id;
        const isDisabled = selectedId !== null && !isSelected;

        return (
          <SecondarySection
            key={equip.id}
            icon={null}
            title={equip.name}
            onPress={() => handleViewEquipment(equip.id)}
            showCheckbox
            checked={isSelected}
            onCheckChange={() => !isDisabled && onSelect(equip.id)}
            disabled={isDisabled}
            backgroundColor={isDisabled ? '#f1f1f1' : colors.primaryLight}>
            <Text style={{ color: isDisabled ? '#888' : colors.primaryDark }}>{equip.id}</Text>
            <Text style={{ color: isDisabled ? '#888' : colors.primaryDark }}>{equip.address}</Text>
          </SecondarySection>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
});
