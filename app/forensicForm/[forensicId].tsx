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
import { useNavigation } from '@react-navigation/native';

import { useLayoutEffect } from 'react';
import HeaderMenu from "~/components/buttons/headerMenu";
import TabBar from "~/components/layout/tabBar";


export default function ForensicForm() {
    const { forensicId } = useLocalSearchParams();
    const { forensic: data, loading } = useForensicById(String(forensicId));

    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (!data) return;

        navigation.setOptions({
            headerRight: () => (
                <HeaderMenu
                    onEdit={() =>
                        router.push({
                            pathname: '/forensicPage',
                            params: { mode: 'edit', forensicId: String(forensicId) },
                        })
                    }
                    onGeneratePDF={() => generateForensicPDF(data)}
                    onDelete={() => {
                        // coloque aqui a função que irá excluir a análise forense
                        // ex: handleDeleteForensic();
                    }}
                />
            ),
        });
    }, [data]);


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
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Perito Responsavel</Text>
                            <Text style={styles.itemText}>{data?.dadosIniciais?.peritoResponsavel}</Text>
                            <Text style={styles.itemText}>{data?.dadosIniciais?.cargoPerito}</Text>
                            <Text style={styles.text}>{data?.dadosIniciais?.matriculaPerito}</Text>

                        </View>
                        <View style={styles.campoInterno}>
                            {Array.isArray(data?.equipePericial) && data.equipePericial.length > 0 ? (
                                data.equipePericial.map((membro, index) => (
                                    <View key={index} style={{ gap: 10}}>
                                        <Text style={styles.itemTitle}>Equipe pericial - Auxiliar {index}</Text>
                                        <Text style={styles.itemText}>Nome: {membro.nome}</Text>
                                        <Text style={styles.itemText}>Matrícula: {membro.matricula}</Text>
                                        <Text style={styles.itemText}>Cargo: {membro.cargo}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.text}>Nenhum membro da equipe pericial registrado.</Text>
                            )}
                        </View>
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Solicitação</Text>
                            <Text style={styles.text}>Data/Hora: {formatarData(data?.dadosIniciais?.dataHora)}</Text>
                            <Text style={styles.text}>Tipo de Ocorrência: {data?.dadosIniciais?.tipoOcorrencia}</Text>
                            <Text style={styles.text}>Nome da Autoridade: {data?.dadosIniciais?.autoridadePolicialNome}</Text>
                        </View>
                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.itemTitle}>Atendimento</Text>
                            <Text style={styles.text}>Endereço: {data?.dadosIniciais?.localizacao?.address}</Text>
                            <Text style={styles.text}>Latitude: {data?.dadosIniciais?.localizacao?.latitude}</Text>
                            <Text style={styles.text}>Longitude: {data?.dadosIniciais?.localizacao?.longitude}</Text>
                            <Text style={styles.text}>Viatura: {data?.dadosIniciais?.viatura}</Text>
                            <Text style={styles.text}>Número de Vítimas: {data?.dadosIniciais?.numeroVitimas}</Text>
                            <Text style={styles.text}>Condição das Vítimas: {data?.dadosIniciais?.condicaoVitimas}</Text>
                            <Text style={styles.text}>Autoridade Policial: {data?.dadosIniciais?.autoridadePolicial}</Text>
                        </View>


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
                        icon={<Feather name="map" size={20} color="#173A64" />}
                        title="Análise Preliminar do Local"
                        showChevron={false}
                    >
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Reconhecimento da área</Text>
                            <Text style={styles.itemText}> {data?.analisePreliminar?.reconhecimentoArea}</Text>
         
                        {Array.isArray(data?.analisePreliminar?.arquivosReconhecimentoArea) &&
                            data.analisePreliminar.arquivosReconhecimentoArea.length > 0 && (
                                <View style={styles.uploadedList}>
                                    <Text style={styles.uploadedTitle}>Imagens da área:</Text>
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
                        </View>
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Condições Ambientais </Text>
                            <Text style={styles.itemText}>{data?.analisePreliminar?.condicoesAmbientais}</Text>
                        </View>
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Características do Local </Text>
                            <Text style={styles.itemText}>{data?.analisePreliminar?.caracteristicasLocal}</Text>
                        </View>
                        <View style={styles.campoInternoSecundario}>
                            {Array.isArray(data?.analisePreliminar?.informacoes) &&
                                data.analisePreliminar.informacoes.map((info, index) => (
                                    <View key={index} style={{ marginTop: 8 }}>
                                        <View style={styles.campoInternoSecundario}>
                                            <Text style={styles.itemTitle}>Informação do fato {index}</Text>
                                            <Text style={styles.itemText}>{info.descricao}</Text>
                                        </View>
                                        {info.observacao ? (
                                            <View style={styles.campoInternoSecundario}>
                                                <Text style={styles.itemTitle}>Observação: </Text>
                                                <Text style={styles.itemText}>{info.observacao}</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                ))}
                        </View>
                       
                    </SecondarySection>


                    <SecondarySection
                        icon={<Feather name="alert-circle" size={20} color="#173A64" />}
                        title="Risco"
                        showChevron={false}
                    >
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Composição da equipe</Text>
                            <Text style={styles.itemText}>Perito responsavel: {data?.risco?.riscoAPR?.peritoResponsavel}</Text>
                            <Text style={styles.itemText}>Matrícula: {data?.risco?.riscoAPR?.peritoMatricula}</Text>
                        </View>
                        <View style={styles.campoInterno}>
                            {Array.isArray(data?.risco?.peritoAuxiliar) && data.risco.peritoAuxiliar.length > 0 && (
                                <View style={{ gap: 8 }}>
                                    <Text style={styles.itemTitle}>Peritos Auxiliares:</Text>
                                    {data.risco.peritoAuxiliar.map((p, idx) => (
                                        <Text key={idx} style={styles.text}>• {p.nome} ({p.matricula})</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={styles.campoInterno}>
                            {Array.isArray(data?.risco?.tecnico) && data.risco.tecnico.length > 0 && (
                                <View style={{ gap: 8 }}>
                                    <Text style={styles.itemTitle}>Técnicos:</Text>
                                    {data.risco.tecnico.map((t, idx) => (
                                        <Text key={idx} style={styles.itemText}>• {t.nome} ({t.matricula})</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={styles.campoInterno}>
                            {Array.isArray(data?.risco?.outros) && data.risco.outros.length > 0 && (
                                <View style={{ gap: 8 }}>
                                    <Text style={styles.itemTitle}>Outros envolvidos:</Text>
                                    {data.risco.outros.map((o, idx) => (
                                        <Text key={idx} style={styles.itemText}>• {o.nome} ({o.matricula})</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Identificação dos riscos</Text>
                            <Text style={styles.itemText}>Risco Acidente: {data?.risco?.riscoAPR?.riscoAcidente}</Text>
                            <Text style={styles.itemText}>Risco Físico: {data?.risco?.riscoAPR?.riscoFisico}</Text>
                            <Text style={styles.itemText}>Risco Biológico: {data?.risco?.riscoAPR?.riscoBiologico ? 'Sim' : 'Não'}</Text>
                            <Text style={styles.itemText}>Risco Químico: {data?.risco?.riscoAPR?.riscoQuimico ? 'Sim' : 'Não'}</Text>
                        </View>
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>Avaliação dos riscos</Text>
                            <Text style={styles.itemText}>Gravidade: {data?.risco?.riscoAPR?.gravidade}</Text>
                            <Text style={styles.itemText}>Probabilidade: {data?.risco?.riscoAPR?.probabilidade}</Text>
                        </View>
                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.itemTitle}>Medidas mitigatórias</Text>
                            <Text style={styles.itemText}>{data?.risco?.riscoAPR?.medidasMitigatoria}</Text>
                        </View>
                    </SecondarySection>


                    <SecondarySection
                        icon={<Feather name="file-text" size={20} color="#173A64" />}
                        title="5. Exames"
                        showChevron={false}
                    >
                        {/* Documentação */}
                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>5.1. Documentação</Text>
                            <Text style={styles.itemText}>Projetos: {data?.exames?.documentacao?.projetos}</Text>
                            <Text style={styles.itemText}>Memorial de Cálculo: {data?.exames?.documentacao?.memorialCalculo}</Text>
                            <Text style={styles.itemText}>Licença/Alvará: {data?.exames?.documentacao?.licencaAlvara}</Text>
                            <Text style={styles.itemText}>ART: {data?.exames?.documentacao?.art}</Text>
                            <Text style={styles.itemText}>Plano de Manutenção: {data?.exames?.documentacao?.planoManutencao}</Text>
                            <Text style={styles.itemText}>Contrato de Manutenção: {data?.exames?.documentacao?.contratoManutencao}</Text>
                            <Text style={styles.itemText}>Registro de Manutenção: {data?.exames?.documentacao?.registroManutencao}</Text>
                            <Text style={styles.itemText}>Relatório RIA: {data?.exames?.documentacao?.relatorioRia}</Text>
                            <Text style={styles.itemText}>Outro: {data?.exames?.documentacao?.outro}</Text>

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
                                        <Text style={styles.itemText}>{title}:</Text>
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

                        </View>

                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>5.2. Equiapmentos</Text>
                        </View>

                        <View style={styles.campoInterno}>
                            <Text style={styles.itemTitle}>5.3. Entrevistas</Text>
                        </View>

                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.itemTitle}>5.4. Perinecroscopia</Text>
                            <Text style={styles.itemText}>Sexo: {data?.exames?.cadaverSexo}</Text>
                            <Text style={styles.itemText}>Cor da Pele: {data?.exames?.cadaverCorPele}</Text>
                            <Text style={styles.itemText}>Cabelo: {data?.exames?.cadaverCabelo}</Text>
                            <Text style={styles.itemText}>Sinais identificadores: {data?.exames?.cadaverSinaisIdentificadores}</Text>
                            <Text style={styles.itemText}>Descrição das vestes e pertences pessoais: {data?.exames?.cadaverDescricaoVestes}</Text>
                            <Text style={styles.itemText}>Outro: {data?.exames?.cadaverOutro}</Text>
                        </View>
                    </SecondarySection>
                </ScrollView>
            )}

            <TabBar
                tabs={[
                    { icon: 'home', label: 'Inicio', route: '/' },
                    { icon: 'plus-circle', label: 'Nova análise', route: '/forensicPage' },
                    { icon: 'list', label: 'Inpeções', route: '/inspections' },
                ]}
            />


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
    campoInterno: {
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#D0CECE",
        borderStyle: "dashed",
        paddingBottom: 20,
        width: "100%",
    },
    campoInternoSecundario: {
        gap: 10,
        width: "100%",
    },

});