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

  return (
    <View style={styles.wrapper}>
      {inspections.map((inspection) => {

        return (
          <SecondarySection
            key={inspection.id}
            icon={null}
            title={`Inspeção #${inspection.id?.slice(-6)}`}
            onPress={() => handleViewInspection(inspection.id)}
            backgroundColor={colors.primaryLight}>
            <Text style={{ color: colors.primaryDark }}>
              Responsável: {inspection.usuario}
            </Text>
            <Text style={{ color: colors.primaryDark }}>
              Data: {new Date(inspection.dataCriacao).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={{ color: colors.primaryDark }}>
              Itens respondidos: {Object.keys(inspection.answers || {}).length}
            </Text>
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
