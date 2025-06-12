import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState } from "react";

import SecondarySection from "~/components/sections/secondarySection";
import FeedbackModal from "~/components/modal/feedbackModal";
import { useInspectionById } from "~/hooks/useInspectionById";
import { db } from '~/utils/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { colors, fontSize } from '~/theme';
import { capitalize } from "lodash";

export default function InspectionForm() {
  const { inspectionId } = useLocalSearchParams();
  const { inspection, loading } = useInspectionById(String(inspectionId));

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'confirm' | 'loading' | 'success' | 'error'>('confirm');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleDelete = () => {
    setFeedbackType('confirm');
    setFeedbackMessage('Deseja realmente excluir esta inspeção?');
    setFeedbackVisible(true);
  };

  const confirmDelete = async () => {
    if (!inspection) return;

    try {
      setFeedbackType('loading');
      setFeedbackMessage('Excluindo inspeção...');
      await deleteDoc(doc(db, 'inspections', String(inspection.id)));

      setFeedbackType('success');
      setFeedbackMessage('Inspeção excluída com sucesso!');
      setTimeout(() => {
        setFeedbackVisible(false);
        router.replace('/inspections');
      }, 1000);
    } catch (error) {
      console.error(error);
      setFeedbackType('error');
      setFeedbackMessage('Erro ao excluir a inspeção.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!inspection) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Inspeção não encontrada.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <SecondarySection
          icon={<Feather name="user" size={20} color="#173A64" />}
          title="Responsável pela inspeção"
          showChevron={false}
        >
          <View style={styles.sectionContent}>
            <Text style={styles.text}>{inspection.usuario}</Text>
            <Text style={styles.text}>
              Data: {new Date(inspection.dataCriacao).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </SecondarySection>

        <SecondarySection
          icon={<Feather name="clipboard" size={20} color="#173A64" />}
          title="Itens verificados"
          showChevron={false}
        >
          <View style={styles.sectionContent}>
            {Object.entries(inspection.answers).map(([id, question]) => (
              <View key={id} style={styles.answerItem}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemTitle}>🔹</Text>
                  <Text style={styles.itemTitle}>Item {id}</Text>
                </View>
                <Text style={styles.itemText}>Resposta: {question.answer}</Text>
                <Text style={styles.itemText}>Prioridade: {capitalize(question.priority)}</Text>
                <Text style={styles.itemText}>Risco: {question.risk}</Text>
                <Text style={styles.itemText}>Mitigação: {question.mitigation}</Text>
                <Text style={styles.itemText}>Verificação: {question.verification}</Text>
              </View>
            ))}
          </View>
        </SecondarySection>
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={handleDelete}>
          <Feather name="trash-2" size={20} color="red" />
          <Text style={[styles.menuText, { color: 'red' }]}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <FeedbackModal
        visible={feedbackVisible}
        type={feedbackType}
        message={feedbackMessage}
        onClose={() => setFeedbackVisible(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 12,
  },
  sectionContent: {
    width: '100%',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    width: '100%',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  menuText: {
    marginTop: 4,
    color: '#173A64',
    fontSize: fontSize.placeholder,
  },
  answerItem: {
    marginBottom: 12,
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: fontSize.label,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  itemText: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    lineHeight: 20,
    marginBottom: 2,
    flexWrap: 'wrap',
    width: '100%',
  },
});
