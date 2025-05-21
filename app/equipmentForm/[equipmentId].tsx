import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";

import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from '~/theme';
import { useEquipmentById } from '~/hooks/useEquipmentById';

export default function EquipmentForm() {
  const { equipmentId } = useLocalSearchParams();
  const { equipment, loading } = useEquipmentById(String(equipmentId));

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
});
