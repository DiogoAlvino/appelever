import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from '~/theme';
import { equipment as equipmentList } from '~/data/questions';

export default function ReportInspection() {
    const { equipmentId } = useLocalSearchParams<{ equipmentId: string }>();
    const selectedEquipment = equipmentList.find(eq => eq.id === equipmentId);

    const handleViewEquipment = (equipmentId: string) => {
        router.push({
          pathname: '/equipmentForm/[equipmentId]',
          params: { equipmentId },
        });
      };

    if (!selectedEquipment) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Equipamento não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
                <SecondarySection
                    icon={<Feather name="tag" size={20} color="#173A64" />}
                    title="Equipamento"
                    showChevron={true}
                    onPress={() => handleViewEquipment(equipmentId)}
                >
                    <Text style={styles.text}>{selectedEquipment.building}</Text>
                    <Text style={styles.text}>{selectedEquipment.address}</Text>
                </SecondarySection>

                <SecondarySection
                    icon={<Feather name="search" size={20} color="#173A64" />}
                    title="Inspeção realizada"
                    showChevron={false}
                >
                    <Text style={styles.text}>{selectedEquipment.technician.name}</Text>
                    <Text style={styles.text}>{selectedEquipment.technician.role}</Text>
            
                </SecondarySection>

                <SecondarySection
                    icon={<Feather name="tool" size={20} color="#173A64" />}
                    title="Implementação"
                    showChevron={false}
                >
                    <Text style={styles.text}>
                        {new Date(selectedEquipment.installationDate).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text style={styles.text}>{equipmentId}</Text>
                    <Text style={styles.text}>{selectedEquipment.manufacturer}</Text>
                    <Text style={styles.text}>{selectedEquipment.cnpj}</Text>
                    <Text style={styles.text}>{selectedEquipment.model}</Text>
                    <Text style={styles.text}>{selectedEquipment.capacity}</Text>
                </SecondarySection>

            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: "column",
        gap: 10,
        height: "100%",
        paddingVertical: 5,
    },
    text: {
        fontSize: fontSize.placeholder,
        color: colors.primaryDark,
    },
});