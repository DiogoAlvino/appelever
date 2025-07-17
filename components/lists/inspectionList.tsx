// InspectionList.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';
import { router } from 'expo-router';
import { InspectionModel } from '~/models/inspectionModel';

interface InspectionListProps {
  inspections: InspectionModel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onError?: (msg: string) => void;
}

export default function InspectionList({ inspections, selectedId, onSelect, onError }: InspectionListProps) {
  const handleViewInspection = (inspectionId: string | undefined) => {
    if (!inspectionId) {
      onError?.('Erro: inspeção sem ID. Não foi possível abrir os detalhes.');
      return;
    }
    router.push({
      pathname: '/inspectionForm/[inspectionId]',
      params: { inspectionId },
    });
  };

  function formatarData(rawData: any): string {
    if (rawData instanceof Date) {
      return rawData.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } else if (typeof rawData === 'object' && rawData?.seconds) {
      const parsed = new Date(rawData.seconds * 1000);
      return parsed.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } else if (typeof rawData === 'string' || typeof rawData === 'number') {
      const parsed = new Date(rawData);
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      }
    }

    return 'Data inválida';
  }


  return (
    <View style={styles.wrapper}>
      {inspections.slice().reverse().map((inspection, index) => (
        <SecondarySection
          key={inspection.id}
          icon={null}
          title={`Inspeção #${index + 1}`}
          onPress={() => handleViewInspection(inspection.id)}
          backgroundColor={colors.primaryLight}
        >
          <Text style={{ color: colors.primaryDark }}>
            Responsável: {inspection.usuario}
          </Text>
          <Text style={{ color: colors.primaryDark }}>
            Data: {formatarData(inspection.dataCriacao)}
          </Text>
          <Text style={{ color: colors.primaryDark }}>
            Itens respondidos: {Object.keys(inspection.answers || {}).length}
          </Text>
        </SecondarySection>
      ))}
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
