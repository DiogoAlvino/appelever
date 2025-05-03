import React, { useState } from 'react';
import { Text } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';

interface InspectionItem {
  id: string;
  date: string;
  name: string;
}

interface InspectionListProps {
  inspections: InspectionItem[];
}

export default function InspectionList({ inspections }: InspectionListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCheck = (id: string) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {inspections.map((equip) => {
        const isSelected = selectedId === equip.id;
        const isDisabled = selectedId !== null && !isSelected;

        return (
          <SecondarySection
            key={equip.id}
            icon={null}
            title={equip.id}
            backgroundColor={isDisabled ? '#f1f1f1' : colors.primaryLight}
          >
            <Text style={{ color: isDisabled ? '#888' : colors.primaryDark }}>
              {new Date(equip.date).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={{ color: isDisabled ? '#888' : colors.primaryDark }}>
              {equip.name}
            </Text>
          </SecondarySection>
        );
      })}
    </>
  );
}
