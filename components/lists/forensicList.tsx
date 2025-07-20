import { Text, View, StyleSheet } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';
import { router } from 'expo-router';
import { ForensicModel } from '~/types/forensicTypes';

interface ForensicListProps {
  forensics: ForensicModel[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onError?: (msg: string) => void;
}

export default function ForensicList({ forensics, selectedId, onSelect, onError }: ForensicListProps) {
  const handleViewForensic = (forensicId: string | undefined) => {
    if (!forensicId) {
      onError?.('Erro: Análise forense sem ID. Não foi possível abrir os detalhes.');
      return;
    }
    router.push({
      pathname: '/forensicForm/[forensicId]',
      params: { forensicId },
    });
  };

  function formatarData(rawData: any): string {
    if (rawData instanceof Date) {
      return rawData.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    } else if (typeof rawData === 'object' && rawData?.seconds) {
      const parsed = new Date(rawData.seconds * 1000);
      return parsed.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    } else if (typeof rawData === 'string' || typeof rawData === 'number') {
      const parsed = new Date(rawData);
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    }
    return 'Data inválida';
  }

  return (
    <View style={styles.wrapper}>
      {forensics.map((forensic) => (
        <SecondarySection
          key={forensic.id}
          title={`Análise Forense #${forensic.id?.slice(-6)}`}
          onPress={() => handleViewForensic(forensic.id)}
          backgroundColor={colors.primaryLight}
        >
          <Text style={{ color: colors.primaryDark }}>
            Responsável: {forensic.dadosIniciais.peritoResponsavel || 'Não informado'}
          </Text>
          <Text style={{ color: colors.primaryDark }}>
            Data: {formatarData(forensic.dadosIniciais.dataHora)}
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
