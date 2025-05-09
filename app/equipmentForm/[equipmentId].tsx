import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from '~/theme';
import { equipment as equipmentList } from '~/data/questions';

export default function EquipmentForm() {
    const { equipmentId } = useLocalSearchParams();
    const selectedEquipment = equipmentList.find(eq => eq.id === equipmentId);

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
                icon={<Feather name="map-pin" size={20} color="#173A64" />}
                title="Local de instalação"
                showChevron={false}
            >
                <Text style={styles.text}>{selectedEquipment.building}</Text>
                <Text style={styles.text}>{selectedEquipment.address}</Text>
            </SecondarySection>

            <SecondarySection
                icon={<Feather name="user" size={20} color="#173A64" />}
                title="Responsavel técnico"
                showChevron={false}
            >
                <Text style={styles.text}>{selectedEquipment.technician.name}</Text>
                <Text style={styles.text}>{selectedEquipment.technician.role}</Text>
                <Text style={styles.text}>{selectedEquipment.technician.phone}</Text>
                <Text style={styles.text}>{selectedEquipment.technician.email}</Text>
            </SecondarySection>

            <SecondarySection
                icon={<Feather name="tag" size={20} color="#173A64" />}
                title="Dados do equipamento"
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
                <Text style={styles.text}>{selectedEquipment.occupancy}</Text>
                <Text style={styles.text}>{selectedEquipment.speed}</Text>
                <Text style={styles.text}>{selectedEquipment.usageType}</Text>
                <Text style={styles.text}>{selectedEquipment.stops}</Text>
                <Text style={styles.text}>{selectedEquipment.machineRoom}</Text>
            </SecondarySection>

            <SecondarySection
                icon={<Feather name="briefcase" size={20} color="#173A64" />}
                title="Empresa conservadora"
                showChevron={false}
            >
                <Text style={styles.text}>{selectedEquipment.maintenanceCompany.name}</Text>
                <Text style={styles.text}>{selectedEquipment.maintenanceCompany.cnpj}</Text>
            </SecondarySection>

            <SecondarySection
                icon={<Feather name="paperclip" size={20} color="#173A64" />}
                title="Arquivos relacionados"
                showChevron={false}
            >
                {selectedEquipment.files.map((file, index) => (
                    <Text key={index} style={styles.text}>{file}</Text>
                ))}
            </SecondarySection>

            <SecondarySection
                icon={<Feather name="clipboard" size={20} color="#173A64" />}
                title="Inpeções realizadas"
                showChevron={false}
            >
                {selectedEquipment.inspections.map((insp) => (
                    <Text key={insp.id} style={styles.text}>
                        {new Date(insp.date).toLocaleDateString('pt-BR')} - {insp.name}
                    </Text>
                ))}
            </SecondarySection>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: "column",
        gap: 10,
        paddingVertical: 5,
        paddingBottom: 25   
    },
    text: {
        fontSize: fontSize.placeholder,
        color: colors.primaryDark,
    },
});
