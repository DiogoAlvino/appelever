import { useLocalSearchParams } from "expo-router";
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useForensicById } from "~/hooks/useForensicById";
import FeedbackModal from "~/components/modal/feedbackModal";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from "~/theme";

export default function ForensicForm() {
    const { forensicId } = useLocalSearchParams();
    const { forensic: data, loading } = useForensicById(String(forensicId));

    const hasError = !loading && !data;

    function formatarData(rawData: any): string {
        if (rawData instanceof Date) {
            return rawData.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
        } else if (typeof rawData === 'object' && rawData?.seconds) {
            const parsed = new Date(rawData.seconds * 1000);
            return parsed.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
        } else if (typeof rawData === 'string' || typeof rawData === 'number') {
            const parsed = new Date(rawData);
            if (!isNaN(parsed.getTime())) {
                return parsed.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
            }
        }
        return 'Data inválida';
    }


    return (
        <>
            {loading ? (
                <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : hasError ? (
                <View style={styles.container}>
                    <Text style={styles.text}>Análise forense não encontrada.</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
                    <SecondarySection
                        icon={<Feather name="user" size={20} color="#173A64" />}
                        title="Responsável"
                        showChevron={false}
                    >
                        <Text style={styles.text}>{data?.usuario}</Text>
                        <Text style={styles.text}>
                            Data: {formatarData(data?.dataCriacao)}
                        </Text>


                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="map" size={20} color="#173A64" />}
                        title="Análise Preliminar"
                        showChevron={false}
                    >
                        <Text style={styles.text}>{data?.analisePreliminar?.reconhecimentoArea}</Text>
                        <Text style={styles.text}>{data?.analisePreliminar?.condicoesAmbientais}</Text>
                        <Text style={styles.text}>{data?.analisePreliminar?.caracteristicasLocal}</Text>
                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="alert-circle" size={20} color="#173A64" />}
                        title="Risco"
                        showChevron={false}
                    >
                        <Text style={styles.text}>Risco Acidente: {data?.risco?.riscoAPR?.riscoAcidente}</Text>
                        <Text style={styles.text}>Gravidade: {data?.risco?.riscoAPR?.gravidade}</Text>
                        <Text style={styles.text}>Probabilidade: {data?.risco?.riscoAPR?.probabilidade}</Text>
                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="file-text" size={20} color="#173A64" />}
                        title="Documentação"
                        showChevron={false}
                    >
                        <Text style={styles.text}>Projetos: {data?.exames?.documentacao?.projetos}</Text>
                        <Text style={styles.text}>Memorial de Cálculo: {data?.exames?.documentacao?.memorialCalculo}</Text>
                        <Text style={styles.text}>Licença/Alvará: {data?.exames?.documentacao?.licencaAlvara}</Text>
                        <Text style={styles.text}>ART: {data?.exames?.documentacao?.art}</Text>
                        <Text style={styles.text}>Plano de Manutenção: {data?.exames?.documentacao?.planoManutencao}</Text>
                        <Text style={styles.text}>Contrato de Manutenção: {data?.exames?.documentacao?.contratoManutencao}</Text>
                        <Text style={styles.text}>Registro de Manutenção: {data?.exames?.documentacao?.registroManutencao}</Text>
                        <Text style={styles.text}>Relatório RIA: {data?.exames?.documentacao?.relatorioRia}</Text>
                        <Text style={styles.text}>Outro: {data?.exames?.documentacao?.outro}</Text>
                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="activity" size={20} color="#173A64" />}
                        title="Perinecroscopia"
                        showChevron={false}
                    >
                        <Text style={styles.text}>Sexo: {data?.exames?.cadaverSexo}</Text>
                        <Text style={styles.text}>Cor da Pele: {data?.exames?.cadaverCorPele}</Text>
                        <Text style={styles.text}>Cabelo: {data?.exames?.cadaverCabelo}</Text>
                    </SecondarySection>
                </ScrollView>
            )}

            <FeedbackModal
                visible={hasError}
                type="error"
                message="Erro ao carregar dados da análise."
                onClose={() => { }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        gap: 12,
    },
    text: {
        fontSize: fontSize.placeholder,
        color: colors.primaryDark,
        width: '100%',
    },
});