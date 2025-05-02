import Feather from "@expo/vector-icons/build/Feather";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import PrimaryList from "~/components/lists/primaryList";
import QuestionsList from "~/components/lists/questionsList";
import AlertMessage from "~/components/messages/alertMessage";
import SecondarySection from "~/components/sections/secondarySection";
import { questions } from "~/data/questions";
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';


export default function NormativeInspection() {
    const [respostas, setRespostas] = useState<{ [id: string]: 'sim' | 'nao' | 'na' | null }>({});

    const handleResponder = (id: string, value: 'sim' | 'nao' | 'na') => {
        setRespostas((prev) => ({ ...prev, [id]: value }));
      };


    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <SecondarySection
                icon={<Feather name="sun" size={20} color="#173A64" />}
                title="Equipamento para inspeção"
                onPress={() => "/modal"}
            >
                <Text style={styles.text}>Nome do equipamento</Text>
                <Text style={styles.text}>IP ou Numero de Identificação</Text>
            </SecondarySection>
            <AlertMessage
                    type="info"
                    message="Itens a serem verificados quanto à conformidade com a ABNT NBR 16858-1"
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


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: "column",
        gap: 10,
        backgroundColor: colors.bgScreen,
        height: "100%"
    },
    text: {
        fontSize: fontSize.placeholder,
        color: colors.primaryDark,
    },
})