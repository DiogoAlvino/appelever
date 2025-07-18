
import { Text, View, StyleSheet } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';
import { router } from 'expo-router';
import { ForensicModel } from '~/types/forensicTypes';


interface ForensicItem {
  id: string;
}

interface ForensicListProps {
  forensics: ForensicItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onError?: (msg: string) => void;
}

export default function ForensicList({ forensics, selectedId, onSelect, onError }: ForensicListProps) {
  const handleViewForensic = (forensicId: string | undefined) => {
    if (!forensicId) {
      onError?.('Erro: Analise forense sem ID. Não foi possível abrir os detalhes.');
      return;
    }
    router.push({
      pathname: '/forensicForm/[forensicId]',
      params: { forensicId },
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
    {forensics.filter(f => !!f.id).map((forensic) => (
      <SecondarySection
        key={forensic.id}
        title={`Análise Forense #${forensic.id!.slice(-6)}`}
        onPress={() => handleViewForensic(forensic.id)}
        backgroundColor={colors.primaryLight}
      >
        <Text style={{ color: colors.primaryDark }}>
          Responsável: {forensic.id}
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
