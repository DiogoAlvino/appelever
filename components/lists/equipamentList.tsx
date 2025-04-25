import React, { useState } from 'react';
import { Text } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';

interface EquipmentItem {
  id: string;
  name: string;
  address: string;
}

interface EquipmentListProps {
  equipaments: EquipmentItem[];
}

export default function EquipmentList({ equipaments }: EquipmentListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCheck = (id: string) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {equipaments.map((equip) => {
        const isSelected = selectedId === equip.id;
        const isDisabled = selectedId !== null && !isSelected;

        return (
          <SecondarySection
            key={equip.id}
            icon={null}
            title={equip.name}
            showCheckbox
            checked={isSelected}
            onCheckChange={() => !isDisabled && handleCheck(equip.id)}
            disabled={isDisabled}
            backgroundColor={isDisabled ? '#f1f1f1' : colors.primaryLight}
          >
            <Text style={{ color: isDisabled ? '#888' : colors.primaryDark }}>
              {equip.address}
            </Text>
          </SecondarySection>
        );
      })}
    </>
  );
}
