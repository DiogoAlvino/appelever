import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useForensicById } from "~/hooks/useForensicById";
import FeedbackModal from "~/components/modal/feedbackModal";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from "~/theme";
import { generateForensicPDF } from '~/services/pdfService';
import { Image } from 'react-native';
import { materials } from '~/data/materials';


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
                        icon={<Feather name="info" size={20} color="#173A64" />}
                        title="Dados Iniciais"
                        showChevron={false}
                    >
                        <Text style={styles.text}>Autoridade Policial: {data?.dadosIniciais?.autoridadePolicial}</Text>
                        <Text style={styles.text}>Nome da Autoridade: {data?.dadosIniciais?.autoridadePolicialNome}</Text>
                        <Text style={styles.text}>Cargo do Perito: {data?.dadosIniciais?.cargoPerito}</Text>
                        <Text style={styles.text}>Condição das Vítimas: {data?.dadosIniciais?.condicaoVitimas}</Text>
                        <Text style={styles.text}>Data/Hora: {formatarData(data?.dadosIniciais?.dataHora)}</Text>
                        <Text style={styles.text}>Matrícula do Perito: {data?.dadosIniciais?.matriculaPerito}</Text>
                        <Text style={styles.text}>Número de Vítimas: {data?.dadosIniciais?.numeroVitimas}</Text>
                        <Text style={styles.text}>Responsável: {data?.dadosIniciais?.peritoResponsavel}</Text>
                        <Text style={styles.text}>Tipo de Ocorrência: {data?.dadosIniciais?.tipoOcorrencia}</Text>
                        <Text style={styles.text}>Viatura: {data?.dadosIniciais?.viatura}</Text>
                        <Text style={styles.text}>Endereço: {data?.dadosIniciais?.localizacao?.address}</Text>
                        <Text style={styles.text}>Latitude: {data?.dadosIniciais?.localizacao?.latitude}</Text>
                        <Text style={styles.text}>Longitude: {data?.dadosIniciais?.localizacao?.longitude}</Text>
                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="users" size={20} color="#173A64" />}
                        title="Equipe Pericial"
                        showChevron={false}
                    >
                        {Array.isArray(data?.equipePericial) && data.equipePericial.length > 0 ? (
                            data.equipePericial.map((membro, index) => (
                                <View key={index} style={{ marginBottom: 8 }}>
                                    <Text style={styles.text}>Nome: {membro.nome}</Text>
                                    <Text style={styles.text}>Matrícula: {membro.matricula}</Text>
                                    <Text style={styles.text}>Cargo: {membro.cargo}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.text}>Nenhum membro da equipe pericial registrado.</Text>
                        )}
                    </SecondarySection>


                    <SecondarySection
                        icon={<Feather name="map" size={20} color="#173A64" />}
                        title="Análise Preliminar"
                        showChevron={false}
                    >
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Reconhecimento da área: </Text>
                            {data?.analisePreliminar?.reconhecimentoArea}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Condições Ambientais: </Text>
                            {data?.analisePreliminar?.condicoesAmbientais}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Características do Local: </Text>
                            {data?.analisePreliminar?.caracteristicasLocal}
                        </Text>

                        {Array.isArray(data?.analisePreliminar?.informacoes) &&
                            data.analisePreliminar.informacoes.map((info, index) => (
                                <View key={index} style={{ marginTop: 8 }}>
                                    <Text style={styles.text}>
                                        <Text style={styles.bold}>Informação: </Text>
                                        {info.descricao}
                                    </Text>
                                    {info.observacao ? (
                                        <Text style={styles.text}>
                                            <Text style={styles.bold}>Observação: </Text>
                                            {info.observacao}
                                        </Text>
                                    ) : null}
                                </View>
                            ))}

                        {Array.isArray(data?.analisePreliminar?.arquivosReconhecimentoArea) &&
                            data.analisePreliminar.arquivosReconhecimentoArea.length > 0 && (
                                <View style={styles.uploadedList}>
                                    <Text style={styles.uploadedTitle}>📷 Imagens da área:</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {data.analisePreliminar.arquivosReconhecimentoArea.map((file, idx) => (
                                            !!file.uri && typeof file.uri === 'string' && (
                                                <TouchableOpacity
                                                    key={`${file.nome}-${idx}`}
                                                    style={styles.thumbnailWrapper}
                                                    onPress={() =>
                                                        router.push({
                                                            pathname: '/previewImage',
                                                            params: { uri: file.uri },
                                                        })
                                                    }
                                                >
                                                    <Text numberOfLines={1} style={styles.imageLabel}>{file.nome}</Text>
                                                    <View style={styles.imageContainer}>
                                                        <Image
                                                            source={{ uri: file.arquivo }}
                                                            style={styles.thumbnail}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                    </SecondarySection>


                    <SecondarySection
                        icon={<Feather name="alert-circle" size={20} color="#173A64" />}
                        title="Risco"
                        showChevron={false}
                    >
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Risco Acidente: </Text>{data?.risco?.riscoAPR?.riscoAcidente}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Risco Biológico: </Text>{data?.risco?.riscoAPR?.riscoBiologico ? 'Sim' : 'Não'}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Risco Físico: </Text>{data?.risco?.riscoAPR?.riscoFisico}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Risco Químico: </Text>{data?.risco?.riscoAPR?.riscoQuimico ? 'Sim' : 'Não'}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.bold}>Gravidade: </Text>{data?.risco?.riscoAPR?.gravidade}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Probabilidade: </Text>{data?.risco?.riscoAPR?.probabilidade}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Medidas Mitigatórias: </Text>{data?.risco?.riscoAPR?.medidasMitigatoria}
                        </Text>

                        <Text style={styles.text}>
                            <Text style={styles.bold}>Perito Responsável: </Text>{data?.risco?.riscoAPR?.peritoResponsavel}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Matrícula do Perito: </Text>{data?.risco?.riscoAPR?.peritoMatricula}
                        </Text>

                        {/* Técnicos */}
                        {Array.isArray(data?.risco?.tecnico) && data.risco.tecnico.length > 0 && (
                            <View style={{ marginTop: 8 }}>
                                <Text style={styles.bold}>Técnicos:</Text>
                                {data.risco.tecnico.map((t, idx) => (
                                    <Text key={idx} style={styles.text}>• {t.nome} ({t.matricula})</Text>
                                ))}
                            </View>
                        )}

                        {/* Peritos Auxiliares */}
                        {Array.isArray(data?.risco?.peritoAuxiliar) && data.risco.peritoAuxiliar.length > 0 && (
                            <View style={{ marginTop: 8 }}>
                                <Text style={styles.bold}>Peritos Auxiliares:</Text>
                                {data.risco.peritoAuxiliar.map((p, idx) => (
                                    <Text key={idx} style={styles.text}>• {p.nome} ({p.matricula})</Text>
                                ))}
                            </View>
                        )}

                        {/* Outros */}
                        {Array.isArray(data?.risco?.outros) && data.risco.outros.length > 0 && (
                            <View style={{ marginTop: 8 }}>
                                <Text style={styles.bold}>Outros envolvidos:</Text>
                                {data.risco.outros.map((o, idx) => (
                                    <Text key={idx} style={styles.text}>• {o.nome} ({o.matricula})</Text>
                                ))}
                            </View>
                        )}
                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="box" size={20} color="#173A64" />}
                        title="Materiais, Equipamentos, EPI e EPC"
                        showChevron={false}
                    >
                        {Array.isArray(data?.materiais?.selecionados) && data.materiais.selecionados.length > 0 ? (
                            data.materiais.selecionados.map((id, idx) => {
                                // Busca o material dentro de qualquer categoria
                                const material = materials.flatMap((grupo) => grupo.items).find((item) => item.id === id);
                                return (
                                    <Text key={idx} style={styles.text}>
                                        • {material?.label || `ID ${id}`}
                                    </Text>
                                );
                            })
                        ) : (
                            <Text style={styles.text}>Nenhum material selecionado.</Text>
                        )}

                        {!!data?.materiais?.outroDescricao && (
                            <Text style={styles.text}>
                                <Text style={styles.bold}>Outro: </Text>
                                {data.materiais.outroDescricao}
                            </Text>
                        )}
                    </SecondarySection>

                    <SecondarySection
                        icon={<Feather name="file-text" size={20} color="#173A64" />}
                        title="5. Exames"
                        showChevron={false}
                    >
                        {/* Documentação */}
                        <Text style={styles.bold}>📁 Documentação:</Text>
                        <Text style={styles.text}>Projetos: {data?.exames?.documentacao?.projetos}</Text>
                        <Text style={styles.text}>Memorial de Cálculo: {data?.exames?.documentacao?.memorialCalculo}</Text>
                        <Text style={styles.text}>Licença/Alvará: {data?.exames?.documentacao?.licencaAlvara}</Text>
                        <Text style={styles.text}>ART: {data?.exames?.documentacao?.art}</Text>
                        <Text style={styles.text}>Plano de Manutenção: {data?.exames?.documentacao?.planoManutencao}</Text>
                        <Text style={styles.text}>Contrato de Manutenção: {data?.exames?.documentacao?.contratoManutencao}</Text>
                        <Text style={styles.text}>Registro de Manutenção: {data?.exames?.documentacao?.registroManutencao}</Text>
                        <Text style={styles.text}>Relatório RIA: {data?.exames?.documentacao?.relatorioRia}</Text>
                        <Text style={styles.text}>Outro: {data?.exames?.documentacao?.outro}</Text>

                        {/* Observações */}
                        <Text style={styles.text}>Observações: {data?.exames?.observacoesDocumentacao}</Text>

                        {/* Exibe todos os arquivos agrupados */}
                        {[
                            { title: 'Projetos', arquivos: data?.exames?.documentacao?.projetosArquivos },
                            { title: 'Memorial de Cálculo', arquivos: data?.exames?.documentacao?.memorialCalculoArquivos },
                            { title: 'Licença/Alvará', arquivos: data?.exames?.documentacao?.licencaAlvaraArquivos },
                            { title: 'ART', arquivos: data?.exames?.documentacao?.artArquivos },
                            { title: 'Plano de Manutenção', arquivos: data?.exames?.documentacao?.planoManutencaoArquivos },
                            { title: 'Contrato de Manutenção', arquivos: data?.exames?.documentacao?.contratoManutencaoArquivos },
                            { title: 'Registro de Manutenção', arquivos: data?.exames?.documentacao?.registroManutencaoArquivos },
                            { title: 'Relatório RIA', arquivos: data?.exames?.documentacao?.relatorioRiaArquivos },
                            { title: 'Outro', arquivos: data?.exames?.documentacao?.outroArquivos },
                        ].map(({ title, arquivos }, idx) =>
                            Array.isArray(arquivos) && arquivos.length > 0 ? (
                                <View key={idx} style={styles.uploadedList}>
                                    <Text style={styles.uploadedTitle}>📎 {title}:</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {arquivos.map((file, fIdx) => (
                                            !!file.uri && (
                                                <TouchableOpacity
                                                    key={`${file.nome}-${fIdx}`}
                                                    style={styles.thumbnailWrapper}
                                                    onPress={() =>
                                                        router.push({
                                                            pathname: '/previewImage',
                                                            params: { uri: file.uri },
                                                        })
                                                    }
                                                >
                                                    <Text numberOfLines={1} style={styles.imageLabel}>{file.nome}</Text>
                                                    <View style={styles.imageContainer}>
                                                        <Image
                                                            source={{ uri: file.arquivo }}
                                                            style={styles.thumbnail}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        ))}
                                    </ScrollView>
                                </View>
                            ) : null
                        )}
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

            {data && (
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => generateForensicPDF(data)}
                >
                    <Feather name="download" size={20} color="#173A64" />
                    <Text style={styles.menuText}>PDF</Text>
                </TouchableOpacity>
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
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    menuText: {
        marginTop: 4,
        fontSize: 10,
    },
    bold: {
        fontWeight: 'bold',
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

});