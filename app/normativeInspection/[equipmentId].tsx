import Feather from "@expo/vector-icons/build/Feather";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import PrimaryList from "~/components/lists/primaryList";
import QuestionsList from "~/components/lists/questionsList";
import AlertMessage from "~/components/messages/alertMessage";
import SecondarySection from "~/components/sections/secondarySection";
import { questions } from "~/data/questions";
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';
import { router, useLocalSearchParams } from "expo-router";
import { equipment as equipmentList } from '~/data/questions';
import MainButton from "~/components/buttons/mainButton";


export default function EquipmentPage() {
    const { equipmentId } = useLocalSearchParams<{ equipmentId: string }>();
    const [respostas, setRespostas] = useState<{ [id: string]: 'sim' | 'nao' | 'na' | null }>({});
    const selectedEquipment = equipmentList.find(eq => eq.id === equipmentId);

    const handleReport = () => {
        router.push({
            pathname: '/reportInspection/[equipmentId]',
            params: { equipmentId: equipmentId },
        });
    };

    if (!selectedEquipment) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Equipamento não encontrado.</Text>
            </View>
        );
    }

    const handleResponder = (id: string, value: 'sim' | 'nao' | 'na') => {
        setRespostas((prev) => ({ ...prev, [id]: value }));
    };

    const handleViewEquipment = (equipmentId: any) => {
        router.push({
            pathname: '/equipmentForm/[equipmentId]',
            params: { equipmentId },
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <SecondarySection
                icon={<Feather name="tag" size={20} color="#173A64" />}
                title="Equipamento para inspeção"
                onPress={() => handleViewEquipment(equipmentId)}
            >
                <Text style={styles.text}>{selectedEquipment.name}</Text>
                <Text style={styles.text}>{selectedEquipment.id}</Text>
            </SecondarySection>
            <AlertMessage
                type="info"
                message="Itens a serem verificados quanto à conformidade com a ABNT NBR 16858-1"
            />
            <AlertMessage
                type="info"
                message="Selecione pelos menos 1 item abaixo para finalizar a inspeção"
            />
            <PrimaryList title="1. Quadro de comando"
                helperEnabled helperTitle="1. Quadro de comando"
                helperDescription="O quadro de comando é o painel elétrico que controla o funcionamento do elevador. É também conhecido como painel elétrico de comando.">
                <QuestionsList
                    questoes={questions}
                    respostas={respostas}
                    onResponder={handleResponder}
                />
            </PrimaryList>

            {
                Object.values(respostas).some(res => res !== null && res !== undefined) && (
                    <>
                        <MainButton title="Finalizar" onPress={handleReport} />
                    </>
                )
            }

        </ScrollView>
    )
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
})