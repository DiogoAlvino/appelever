import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import SecondarySection from "~/components/sections/secondarySection";
import FeedbackModal from "~/components/modal/feedbackModal";
import { useInspectionById } from "~/hooks/useInspectionById";
import { db } from '~/utils/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { colors, fontSize, padding } from '~/theme';
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
                  <Text style={styles.itemTitle}>Item {id}</Text>
                </View>
                <View style={styles.inspection}>
                  <View style={styles.viewItem}>
                    <Text style={styles.itemTitle}>Resposta:</Text>
                    <Text style={[styles.itemText, { marginLeft: 4 }]}>{question.answer.toUpperCase()}</Text>
                  </View>
                  <View style={styles.viewItem}>
                    <Text style={styles.itemTitle}>Prioridade:</Text>
                    <Text style={[styles.itemText, { marginLeft: 4 }]}>{capitalize(question.priority)}</Text>
                  </View>
                  <View >
                    <Text style={styles.itemTitle}>Verificação:</Text>
                    <Text style={styles.itemText}>{question.verification}</Text>
                  </View>
                </View>

                {(question.uploads?.length || 0) > 0 && (
                  <View style={styles.uploadedList}>
                    <Text style={styles.uploadedTitle}>📷 Imagens:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {(question.uploads || []).map((file, idx) => (
                        <TouchableOpacity
                          key={`${file.nome}-${idx}`}
                          onPress={() =>
                            router.push({
                              pathname: '/previewImage',
                              params: { uri: file.arquivo },
                            })
                          }
                          style={styles.thumbnailWrapper}
                        >
                          <Text numberOfLines={1} style={styles.imageLabel}>{file.nome}</Text>
                          <View style={styles.imageContainer}>
                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            ))}
          </View>
        </SecondarySection>

        <SecondarySection
          icon={<Feather name="tool" size={20} color="#173A64" />}
          title="Implementações"
          showChevron={false}
        >
          <View style={styles.sectionContent}>
            {Object.entries(inspection.answers)
              .filter(([, question]) => question.answer === 'nao')
              .map(([id, question]) => (
                <View key={id} style={styles.answerItem}>
                  <View style={styles.inspection}>
                    <Text style={styles.itemTitle}>Item {id}</Text>
                    <Text style={styles.itemTitle}>Norma: {question.normaID}</Text>
                    <View>
                      <Text style={styles.itemTitle}>Descrição:</Text>
                      <Text style={styles.itemText}>{question.mitigation}</Text>
                    </View>
                    <View>
                      <Text style={styles.itemTitle}>Necessidade de implementação:</Text>
                      <Text style={styles.itemText}>{question.limit}</Text>
                    </View>
                  </View>

                </View>
              ))}
            {Object.values(inspection.answers).filter(q => q.answer === 'nao').length === 0 && (
              <Text style={styles.text}>Nenhuma implementação necessária.</Text>
            )}
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
    paddingVertical: 10,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  menuText: {
    marginTop: 4,
    fontSize: fontSize.placeholder,
  },
  answerItem: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: "#ccc9",
    borderStyle: "dashed",
    paddingBottom: 20,
    paddingTop: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: fontSize.label,
    fontWeight: '500',
    color: colors.primaryDark,
  },
  itemText: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    lineHeight: 20,
    marginBottom: 4,
  },
  uploadedList: {
    marginTop: 8,
    width: '100%',
  },
  uploadedTitle: {
    fontWeight: '600',
    fontSize: 13,
    color: colors.primaryDark,
    marginBottom: 4,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  thumbnailWrapper: {
    marginRight: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  imageLabel: {
    fontSize: 11,
    color: '#444',
    marginBottom: 4,
    maxWidth: 80,
    textAlign: 'center',
  },
  inspection: {
    gap: 4,
  },
  viewItem: {
    flexDirection: "row",
    alignItems: "baseline",
    width: "100%",
  },
});
