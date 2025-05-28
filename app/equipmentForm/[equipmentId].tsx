import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from '~/theme';
import { useEquipmentById } from '~/hooks/useEquipmentById';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { useState } from "react";
import FeedbackModal from "~/components/modal/feedbackModal";

export default function EquipmentForm() {
  const { equipmentId } = useLocalSearchParams();
  const { equipment, loading } = useEquipmentById(String(equipmentId));

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'confirm' | 'loading' | 'success' | 'error'>('confirm');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleDelete = () => {
    setFeedbackType('confirm');
    setFeedbackMessage('Deseja realmente excluir este equipamento?');
    setFeedbackVisible(true);
  };

  const confirmDelete = async () => {
    if (!equipment) return;

    try {
      setFeedbackType('loading');
      setFeedbackMessage('Excluindo equipamento...');

      await deleteDoc(doc(db, 'equipamentos', String(equipment.id)));

      setFeedbackType('success');
      setFeedbackMessage('Equipamento excluído com sucesso!');

      setTimeout(() => {
        setFeedbackVisible(false);
        router.replace('/equipments');
      }, 1000);
    } catch (error) {
      console.error(error);
      setFeedbackType('error');
      setFeedbackMessage('Erro ao excluir o equipamento.');
    }
  };

  const handleInspection = () => {
    if (!equipment) return;

    router.push({
      pathname: '/normativeInspection/[equipmentId]',
      params: { equipmentId: String(equipment.id) },
    });
  };


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!equipment) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Equipamento não encontrado.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <SecondarySection
          icon={<Feather name="map-pin" size={20} color="#173A64" />}
          title="Local de instalação"
          showChevron={false}
        >
          <Text style={styles.text}>{equipment.local.edificacao}</Text>
          <Text style={styles.text}>
            {equipment.local.logradouro}, {equipment.local.numero} - {equipment.local.bairro}
          </Text>
        </SecondarySection>

        <SecondarySection
          icon={<Feather name="user" size={20} color="#173A64" />}
          title="Responsável técnico"
          showChevron={false}
        >
          <Text style={styles.text}>{equipment.responsavel.nome}</Text>
          <Text style={styles.text}>{equipment.responsavel.funcao}</Text>
          <Text style={styles.text}>{equipment.responsavel.telefone}</Text>
          <Text style={styles.text}>{equipment.responsavel.email}</Text>
        </SecondarySection>

        <SecondarySection
          icon={<Feather name="tag" size={20} color="#173A64" />}
          title="Dados do equipamento"
          showChevron={false}
        >
          <Text style={styles.text}>
            {new Date(equipment.detalhes_equipamento.dataInstalacao).toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.text}>ID: {equipment.id}</Text>
          <Text style={styles.text}>Fabricante: {equipment.detalhes_equipamento.fabricante}</Text>
          <Text style={styles.text}>CNPJ: {equipment.detalhes_equipamento.cnpj}</Text>
          <Text style={styles.text}>Modelo: {equipment.detalhes_equipamento.modelo}</Text>
          <Text style={styles.text}>Capacidade: {equipment.detalhes_equipamento.capacidadeNominal}kg</Text>
          <Text style={styles.text}>Tipo de uso: {equipment.detalhes_equipamento.tipoDeUso}</Text>
          <Text style={styles.text}>Número de paradas: {equipment.detalhes_equipamento.numeroDeParadas}</Text>
          <Text style={styles.text}>Casa de máquinas: {equipment.detalhes_equipamento.casaDeMaquinas ? 'Sim' : 'Não'}</Text>
        </SecondarySection>

        <SecondarySection
          icon={<Feather name="briefcase" size={20} color="#173A64" />}
          title="Empresa conservadora"
          showChevron={false}
        >
          <Text style={styles.text}>{equipment.empresa_conservadora.razaoSocial}</Text>
          <Text style={styles.text}>{equipment.empresa_conservadora.cnpj}</Text>
        </SecondarySection>

        <SecondarySection
          icon={<Feather name="paperclip" size={20} color="#173A64" />}
          title="Arquivos relacionados"
          showChevron={false}
        >
          {equipment.uploads.length > 0 ? (
            equipment.uploads.map((file, index) => (
              <Text key={index} style={styles.text}>
                {file.nome}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>Nenhum arquivo encontrado</Text>
          )}
        </SecondarySection>

      </ScrollView>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Editar')}>
          <Feather name="edit" size={20} color="#173A64" />
          <Text style={styles.menuText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={handleDelete}>
          <Feather name="trash-2" size={20} color="red" />
          <Text style={[styles.menuText, { color: 'red' }]}>Excluir</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.menuButton} onPress={handleInspection}>
          <Feather name="navigation" size={20} color="#173A64" />
          <Text style={styles.menuText}>Inspeção</Text>
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
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 5,
    paddingBottom: 25,
  },
  text: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },

  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuText: {
    marginTop: 4,
    color: '#173A64',
    fontSize: fontSize.placeholder,
  },

});
