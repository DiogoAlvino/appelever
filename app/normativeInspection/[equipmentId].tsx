import Feather from "@expo/vector-icons/build/Feather";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AlertMessage from "~/components/messages/alertMessage";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from '~/theme';
import { router, useLocalSearchParams } from "expo-router";
import MainButton from "~/components/buttons/mainButton";
import { useEquipmentById } from '~/hooks/useEquipmentById';
import InspectionSection from "~/components/sections/inspectionSection";

export default function EquipmentPage() {
  const { equipmentId } = useLocalSearchParams<{ equipmentId: string }>();
  const [respostas, setRespostas] = useState<{ [id: string]: 'sim' | 'nao' | 'na' | null }>({});

  const { equipment: selectedEquipment, loading } = useEquipmentById(String(equipmentId));

 

  const handleReport = () => {
    router.push({
      pathname: '/equipments',
      params: { equipmentId },
    });
  };

  const handleResponder = (id: string, value: 'sim' | 'nao' | 'na' | null) => {
    setRespostas((prev) => ({ ...prev, [id]: value }));
  };

  const handleViewEquipment = (equipmentId: any) => {
    router.push({
      pathname: '/equipmentForm/[equipmentId]',
      params: { equipmentId },
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!selectedEquipment) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Equipamento não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <SecondarySection
        icon={<Feather name="tag" size={20} color="#173A64" />}
        title={`${selectedEquipment.detalhes_equipamento?.identificacaoEquipamento}`}
        onPress={() => handleViewEquipment(equipmentId)}
      >
        <Text style={styles.text}>{selectedEquipment.id}</Text>
        <Text style={styles.text}>{selectedEquipment.local?.edificacao}</Text>
      </SecondarySection>

      <AlertMessage
        type="info"
        message="Itens a serem verificados quanto à conformidade com a ABNT NBR 16858-1"
      />
      <AlertMessage
        type="info"
        message="Selecione pelos menos 1 item abaixo para finalizar a inspeção"
      />

      <InspectionSection
        respostas={respostas}
        onResponder={handleResponder}
      />

      {Object.values(respostas).some(res => res !== null && res !== undefined) && (
        <View style={{ width: '100%', gap: 10 }}>
          <MainButton title="Finalizar" onPress={handleReport} />
          <MainButton title="Cancelar" onPress={handleReport} type="secondary" />
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: "column",
    gap: 8,
    paddingVertical: 5,
  },
  text: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
});
