import { Text, View, StyleSheet } from 'react-native';
import SecondarySection from '../sections/secondarySection';
import { colors } from '~/theme/colors';
import { router } from 'expo-router';
import { ForensicModel } from '~/types/forensicTypes';
import { auth } from '~/utils/firebase';

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
        return rawData.toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (typeof rawData === 'object' && rawData?.seconds) {
        const parsed = new Date(rawData.seconds * 1000);
        return parsed.toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (typeof rawData === 'string' || typeof rawData === 'number') {
        const parsed = new Date(rawData);
        if (!isNaN(parsed.getTime())) {
          return parsed.toLocaleString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      }
      return 'Data inválida';
    }

  return (
    <View style={styles.wrapper}>
      {forensics.map((forensic, index) => (
        <SecondarySection
          key={forensic.id}
          title={`Análise Forense nº ${index + 1}`}
          onPress={() => handleViewForensic(forensic.id)}
          backgroundColor={colors.primaryLight}
        >
          <Text style={{ color: colors.primaryDark }}>
            Responsável: {auth.currentUser?.displayName || 'usuário'}
          </Text>
          <Text style={{ color: colors.primaryDark }}>
            Data: {formatarData(forensic.dataCriacao)}
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
