import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { useForensicById } from "~/hooks/useForensicById";
import FeedbackModal from "~/components/modal/feedbackModal";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from "~/theme";
import { generateForensicPDF } from '~/services/pdfService';
import { Image } from 'react-native';
import { materials } from '~/data/materials';
import { useNavigation } from '@react-navigation/native';

import { useLayoutEffect, useState } from 'react';
import HeaderMenu from "~/components/buttons/headerMenu";
import TabBar from "~/components/layout/tabBar";
import { auth } from "~/utils/firebase";
import { deleteForensicById } from '~/services/forensicService';
import { Container } from "~/components/Container";


export default function ForensicForm() {
    const { forensicId } = useLocalSearchParams();
    const { forensic: data, loading } = useForensicById(String(forensicId));



    const navigation = useNavigation();

    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackType, setFeedbackType] = useState<'confirm' | 'loading' | 'success' | 'error'>('confirm');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [vestigiosExpandido, setVestigiosExpandido] = useState<{ [idx: number]: boolean }>({});


    const handleDeleteForensic = () => {
        setFeedbackType('confirm');
        setFeedbackMessage('Deseja realmente excluir esta análise forense?');
        setFeedbackVisible(true);
    };

    const confirmDelete = async () => {
        try {
            setFeedbackType('loading');
            setFeedbackMessage('Excluindo análise...');

            await deleteForensicById(String(forensicId));

            setFeedbackType('success');
            setFeedbackMessage('Análise excluída com sucesso!');

            setTimeout(() => {
                setFeedbackVisible(false);
                router.replace('/forensics');
            }, 1000);
        } catch (error) {
            console.error(error);
            setFeedbackType('error');
            setFeedbackMessage('Erro ao excluir a análise forense.');
        }
    };



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
                    onDelete={handleDeleteForensic}
                />
            ),
        });
    }, [data]);




    const hasError = !loading && !data;

    function formatarData(rawData: any): string {
        if (rawData instanceof Date) {
            return rawData.toLocaleString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (typeof rawData === 'object' && rawData?.seconds) {
            const parsed = new Date(rawData.seconds * 1000);
            return parsed.toLocaleString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (typeof rawData === 'string' || typeof rawData === 'number') {
            const parsed = new Date(rawData);
            if (!isNaN(parsed.getTime())) {
                return parsed.toLocaleString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        }
        return 'Data inválida';
    }


    console.warn("exames: ", data?.exames)


    console.log('croquiBase64:', data?.exames?.documentacao?.croquiBase64?.substring(0, 30));


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
                        <Text style={styles.text}>{auth.currentUser?.displayName || 'usuário'}</Text>
                        <Text style={styles.text}>
                            Data: {formatarData(data?.dataCriacao)}
                        </Text>


                    </SecondarySection>

                    {data?.dadosIniciais &&
                        (
                            // Verifica se ao menos um campo relevante está preenchido
                            !!data.dadosIniciais.peritoResponsavel?.trim() ||
                            !!data.dadosIniciais.cargoPerito?.trim() ||
                            !!data.dadosIniciais.matriculaPerito?.trim() ||
                            (Array.isArray(data.equipePericial) && data.equipePericial.some(m => m.nome || m.matricula || m.cargo)) ||
                            !!data.dadosIniciais.dataHora ||
                            !!data.dadosIniciais.tipoOcorrencia?.trim() ||
                            !!data.dadosIniciais.autoridadePolicialNome?.trim() ||
                            !!data.dadosIniciais.localizacao?.address?.trim() ||
                            !!data.dadosIniciais.localizacao?.latitude ||
                            !!data.dadosIniciais.localizacao?.longitude ||
                            !!data.dadosIniciais.viatura?.trim() ||
                            !!data.dadosIniciais.numeroVitimas ||
                            !!data.dadosIniciais.condicaoVitimas?.trim() ||
                            !!data.dadosIniciais.autoridadePolicial?.trim()
                        ) && (
                            <SecondarySection
                                icon={<Feather name="info" size={20} color="#173A64" />}
                                title="Dados Iniciais"
                                showChevron={false}
                            >
                                {/* Perito Responsável */}
                                {(data.dadosIniciais.peritoResponsavel || data.dadosIniciais.cargoPerito || data.dadosIniciais.matriculaPerito) && (
                                    <View style={styles.campoInterno}>
                                        <Text style={styles.itemTitle}>Perito Responsável</Text>
                                        {data.dadosIniciais.peritoResponsavel && <Text style={styles.itemText}>{data.dadosIniciais.peritoResponsavel}</Text>}
                                        {data.dadosIniciais.cargoPerito && <Text style={styles.itemText}>{data.dadosIniciais.cargoPerito}</Text>}
                                        {data.dadosIniciais.matriculaPerito && <Text style={styles.itemText}>{data.dadosIniciais.matriculaPerito}</Text>}
                                    </View>
                                )}

                                {/* Equipe Pericial */}
                                {Array.isArray(data.equipePericial) && data.equipePericial.some(m => m.nome || m.matricula || m.cargo) && (
                                    <View style={styles.campoInterno}>
                                        <Text style={styles.itemTitle}>Equipe Pericial</Text>
                                        {data.equipePericial.map((membro, index) => {
                                            const hasInfo = membro.nome || membro.matricula || membro.cargo;
                                            return hasInfo ? (
                                                <View key={index} style={{ gap: 10 }}>
                                                    {membro.nome && <Text style={styles.itemText}>Nome: {membro.nome}</Text>}
                                                    {membro.matricula && <Text style={styles.itemText}>Matrícula: {membro.matricula}</Text>}
                                                    {membro.cargo && <Text style={styles.itemText}>Cargo: {membro.cargo}</Text>}
                                                </View>
                                            ) : null;
                                        })}
                                    </View>
                                )}

                                {/* Solicitação */}
                                {(data.dadosIniciais.dataHora || data.dadosIniciais.tipoOcorrencia || data.dadosIniciais.autoridadePolicialNome) && (
                                    <View style={styles.campoInterno}>
                                        <Text style={styles.itemTitle}>Solicitação</Text>
                                        {data.dadosIniciais.dataHora && (
                                            <Text style={styles.text}>Data/Hora: {formatarData(data.dadosIniciais.dataHora)}</Text>
                                        )}
                                        {data.dadosIniciais.tipoOcorrencia && (
                                            <Text style={styles.text}>Tipo de Ocorrência: {data.dadosIniciais.tipoOcorrencia}</Text>
                                        )}
                                        {data.dadosIniciais.autoridadePolicialNome && (
                                            <Text style={styles.text}>Nome da Autoridade: {data.dadosIniciais.autoridadePolicialNome}</Text>
                                        )}
                                    </View>
                                )}

                                {/* Atendimento */}
                                {(data.dadosIniciais.localizacao?.address ||
                                    data.dadosIniciais.localizacao?.latitude ||
                                    data.dadosIniciais.localizacao?.longitude ||
                                    data.dadosIniciais.viatura ||
                                    data.dadosIniciais.numeroVitimas ||
                                    data.dadosIniciais.condicaoVitimas ||
                                    data.dadosIniciais.autoridadePolicial) && (
                                        <View style={styles.campoInternoSecundario}>
                                            <Text style={styles.itemTitle}>Atendimento</Text>
                                            {data.dadosIniciais.localizacao?.address && (
                                                <Text style={styles.text}>Endereço: {data.dadosIniciais.localizacao.address}</Text>
                                            )}
                                            {data.dadosIniciais.localizacao?.latitude && (
                                                <Text style={styles.text}>Latitude: {data.dadosIniciais.localizacao.latitude}</Text>
                                            )}
                                            {data.dadosIniciais.localizacao?.longitude && (
                                                <Text style={styles.text}>Longitude: {data.dadosIniciais.localizacao.longitude}</Text>
                                            )}
                                            {data.dadosIniciais.viatura && (
                                                <Text style={styles.text}>Viatura: {data.dadosIniciais.viatura}</Text>
                                            )}
                                            {data.dadosIniciais.numeroVitimas && (
                                                <Text style={styles.text}>Número de Vítimas: {data.dadosIniciais.numeroVitimas}</Text>
                                            )}
                                            {data.dadosIniciais.condicaoVitimas && (
                                                <Text style={styles.text}>Condição das Vítimas: {data.dadosIniciais.condicaoVitimas}</Text>
                                            )}
                                            {data.dadosIniciais.autoridadePolicial && (
                                                <Text style={styles.text}>Autoridade Policial: {data.dadosIniciais.autoridadePolicial}</Text>
                                            )}
                                        </View>
                                    )}
                            </SecondarySection>
                        )}


                    {((Array.isArray(data?.materiais?.selecionados) && data.materiais.selecionados.length > 0) ||
                        !!data?.materiais?.outroDescricao) && (
                            <SecondarySection
                                icon={<Feather name="box" size={20} color="#173A64" />}
                                title="Materiais, Equipamentos, EPI e EPC"
                                showChevron={false}
                            >
                                {data.materiais.selecionados.map((id, idx) => {
                                    const material = materials.flatMap((grupo) => grupo.items).find((item) => item.id === id);
                                    return (
                                        <Text key={idx} style={styles.text}>
                                            • {material?.label || `ID ${id}`}
                                        </Text>
                                    );
                                })}

                                {!!data.materiais.outroDescricao && (
                                    <Text style={styles.text}>
                                        <Text style={styles.bold}>Outro: </Text>
                                        {data.materiais.outroDescricao}
                                    </Text>
                                )}
                            </SecondarySection>
                        )}



                    {data?.analisePreliminar && (
                        (() => {
                            const ap = data.analisePreliminar;

                            const temReconhecimentoArea = ap.reconhecimentoArea?.trim() !== '';
                            const temArquivosArea = Array.isArray(ap.arquivosReconhecimentoArea) && ap.arquivosReconhecimentoArea.length > 0;
                            const temCondicoesAmbientais = ap.condicoesAmbientais?.trim() !== '';
                            const temCaracteristicasLocal = ap.caracteristicasLocal?.trim() !== '';
                            const temLocalizacao = ap.localizacao?.address?.trim() !== '';
                            const temInformacoesValidas = Array.isArray(ap.informacoes) && ap.informacoes.some(info =>
                                (info.descricao && info.descricao.trim() !== '') ||
                                (info.observacao && info.observacao.trim() !== '')
                            );

                            const mostrarSecao =
                                temReconhecimentoArea ||
                                temArquivosArea ||
                                temCondicoesAmbientais ||
                                temCaracteristicasLocal ||
                                temLocalizacao ||
                                temInformacoesValidas;

                            if (!mostrarSecao) return null;

                            return (
                                <SecondarySection
                                    icon={<Feather name="map" size={20} color="#173A64" />}
                                    title="Análise Preliminar do Local"
                                    showChevron={false}
                                >
                                    {temReconhecimentoArea && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Reconhecimento da área</Text>
                                            <Text style={styles.itemText}>{ap.reconhecimentoArea}</Text>
                                        </View>
                                    )}

                                    {temArquivosArea && (
                                        <View style={styles.uploadedList}>
                                            <Text style={styles.uploadedTitle}>Imagens da área:</Text>
                                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                {ap.arquivosReconhecimentoArea.map((file, idx) => (
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

                                    {temCondicoesAmbientais && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Condições Ambientais</Text>
                                            <Text style={styles.itemText}>{ap.condicoesAmbientais}</Text>
                                        </View>
                                    )}

                                    {temCaracteristicasLocal && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Características do Local</Text>
                                            <Text style={styles.itemText}>{ap.caracteristicasLocal}</Text>
                                        </View>
                                    )}

                                    {temLocalizacao && ap.localizacao && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Localização</Text>
                                            <Text style={styles.itemText}>Endereço: {ap.localizacao.address}</Text>
                                            <Text style={styles.itemText}>Latitude: {ap.localizacao.latitude}</Text>
                                            <Text style={styles.itemText}>Longitude: {ap.localizacao.longitude}</Text>
                                        </View>
                                    )}

                                    {temInformacoesValidas && (
                                        <View style={styles.campoInternoSecundario}>
                                            {ap.informacoes.map((info, index) => {
                                                const hasDescricao = info.descricao?.trim() !== '';
                                                const hasObs = info.observacao?.trim() !== '';
                                                if (!hasDescricao && !hasObs) return null;

                                                return (
                                                    <View key={index} style={{ marginTop: 8 }}>
                                                        {hasDescricao && (
                                                            <View style={styles.campoInternoSecundario}>
                                                                <Text style={styles.itemTitle}>Informação do fato {index + 1}</Text>
                                                                <Text style={styles.itemText}>{info.descricao}</Text>
                                                            </View>
                                                        )}
                                                        {hasObs && (
                                                            <View style={styles.campoInternoSecundario}>
                                                                <Text style={styles.itemTitle}>Observação:</Text>
                                                                <Text style={styles.itemText}>{info.observacao}</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </SecondarySection>
                            );
                        })()
                    )}


                    {Array.isArray(data?.risco?.aprs) && data.risco.aprs.map((risco, index) => {
                        if (!risco) return null;

                        const riscoAPR = risco.riscoAPR || {};
                        const equipe = risco;

                        const exibir =
                            riscoAPR.peritoResponsavel?.trim() ||
                            riscoAPR.peritoMatricula?.trim() ||
                            riscoAPR.riscoAcidente?.trim() ||
                            riscoAPR.riscoFisico?.trim() ||
                            riscoAPR.riscoBiologico === true ||
                            riscoAPR.riscoQuimico === true ||
                            riscoAPR.gravidade?.trim() ||
                            riscoAPR.probabilidade?.trim() ||
                            riscoAPR.medidasMitigatoria?.trim() ||
                            (Array.isArray(equipe.peritoAuxiliar) && equipe.peritoAuxiliar.some(p => p.nome || p.matricula)) ||
                            (Array.isArray(equipe.tecnico) && equipe.tecnico.some(t => t.nome || t.matricula)) ||
                            (Array.isArray(equipe.outros) && equipe.outros.some(o => o.nome || o.matricula));

                        if (!exibir) return null;

                        return (
                            <SecondarySection
                                key={index}
                                icon={<Feather name="alert-circle" size={20} color="#173A64" />}
                                title={`Análise preliminar de risco (APR) ${data.risco.aprs.length > 1 ? `#${index + 1}` : ''}`}
                                showChevron={false}
                            >
                                {/* Composição da equipe */}
                                {(riscoAPR.peritoResponsavel || riscoAPR.peritoMatricula) && (
                                    <View style={styles.campoInterno}>
                                        <Text style={styles.itemTitle}>Composição da equipe</Text>
                                        {riscoAPR.peritoResponsavel && (
                                            <Text style={styles.itemText}>Perito responsável: {riscoAPR.peritoResponsavel}</Text>
                                        )}
                                        {riscoAPR.peritoMatricula && (
                                            <Text style={styles.itemText}>Matrícula: {riscoAPR.peritoMatricula}</Text>
                                        )}
                                    </View>
                                )}

                                {/* Peritos auxiliares */}
                                {Array.isArray(equipe.peritoAuxiliar) &&
                                    equipe.peritoAuxiliar.some(p => p.nome || p.matricula) && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Peritos Auxiliares</Text>
                                            {equipe.peritoAuxiliar.map((p, idx) =>
                                                p.nome || p.matricula ? (
                                                    <Text key={idx} style={styles.itemText}>• {p.nome} ({p.matricula})</Text>
                                                ) : null
                                            )}
                                        </View>
                                    )}

                                {/* Técnicos */}
                                {Array.isArray(equipe.tecnico) &&
                                    equipe.tecnico.some(t => t.nome || t.matricula) && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Técnicos</Text>
                                            {equipe.tecnico.map((t, idx) =>
                                                t.nome || t.matricula ? (
                                                    <Text key={idx} style={styles.itemText}>• {t.nome} ({t.matricula})</Text>
                                                ) : null
                                            )}
                                        </View>
                                    )}

                                {/* Outros envolvidos */}
                                {Array.isArray(equipe.outros) &&
                                    equipe.outros.some(o => o.nome || o.matricula) && (
                                        <View style={styles.campoInterno}>
                                            <Text style={styles.itemTitle}>Outros envolvidos</Text>
                                            {equipe.outros.map((o, idx) =>
                                                o.nome || o.matricula ? (
                                                    <Text key={idx} style={styles.itemText}>• {o.nome} ({o.matricula})</Text>
                                                ) : null
                                            )}
                                        </View>
                                    )}

                                {/* Identificação dos riscos */}
                                {(riscoAPR.riscoAcidente || riscoAPR.riscoFisico || riscoAPR.riscoBiologico !== undefined || riscoAPR.riscoQuimico !== undefined) && (
                                    <View style={styles.campoInterno}>
                                        <Text style={styles.itemTitle}>Identificação dos riscos</Text>
                                        {riscoAPR.riscoAcidente && (
                                            <Text style={styles.itemText}>Risco Acidente: {riscoAPR.riscoAcidente}</Text>
                                        )}
                                        {riscoAPR.riscoFisico && (
                                            <Text style={styles.itemText}>Risco Físico: {riscoAPR.riscoFisico}</Text>
                                        )}
                                        {riscoAPR.riscoBiologico !== undefined && (
                                            <Text style={styles.itemText}>Risco Biológico: {riscoAPR.riscoBiologico ? 'Sim' : 'Não'}</Text>
                                        )}
                                        {riscoAPR.riscoQuimico !== undefined && (
                                            <Text style={styles.itemText}>Risco Químico: {riscoAPR.riscoQuimico ? 'Sim' : 'Não'}</Text>
                                        )}
                                    </View>
                                )}

                                {/* Avaliação dos riscos */}
                                {(riscoAPR.gravidade || riscoAPR.probabilidade) && (
                                    <View style={styles.campoInterno}>
                                        <Text style={styles.itemTitle}>Avaliação dos riscos</Text>
                                        {riscoAPR.gravidade && (
                                            <Text style={styles.itemText}>Gravidade: {riscoAPR.gravidade}</Text>
                                        )}
                                        {riscoAPR.probabilidade && (
                                            <Text style={styles.itemText}>Probabilidade: {riscoAPR.probabilidade}</Text>
                                        )}
                                    </View>
                                )}

                                {/* Medidas mitigatórias */}
                                {riscoAPR.medidasMitigatoria && (
                                    <View style={styles.campoInternoSecundario}>
                                        <Text style={styles.itemTitle}>Medidas mitigatórias</Text>
                                        <Text style={styles.itemText}>{riscoAPR.medidasMitigatoria}</Text>
                                    </View>
                                )}
                            </SecondarySection>
                        );
                    })}





                    {data?.exames &&

                        (
                            Object.values(data.exames.documentacao || {}).some(v =>
                                typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) ? v.length > 0 : !!v
                            ) ||
                            (data.exames.observacoesDocumentacao?.trim?.() || '') !== '' ||
                            !!data.exames.perinecroscopia?.cadaverSexo?.trim() ||
                            !!data.exames.perinecroscopia?.cadaverCorPele?.trim() ||
                            !!data.exames.perinecroscopia?.cadaverCabelo?.trim() ||
                            !!data.exames.perinecroscopia?.cadaverSinaisIdentificadores?.trim() ||
                            !!data.exames.perinecroscopia?.cadaverDescricaoVestes?.trim() ||
                            !!data.exames.perinecroscopia?.cadaverOutro?.trim() ||
                            Array.isArray(data.exames.equipamentosExame?.cabine) && data.exames.equipamentosExame.cabine.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.cabos) && data.exames.equipamentosExame.cabos.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.portas) && data.exames.equipamentosExame.portas.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.maquinaTracao) && data.exames.equipamentosExame.maquinaTracao.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.sensores) && data.exames.equipamentosExame.sensores.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.freiosEmergencia) && data.exames.equipamentosExame.freiosEmergencia.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.pocoElevador) && data.exames.equipamentosExame.pocoElevador.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.sistemaControle) && data.exames.equipamentosExame.sistemaControle.length > 0 ||
                            Array.isArray(data.exames.equipamentosExame?.limitadorVelocidade) && data.exames.equipamentosExame.limitadorVelocidade.length > 0 ||
                            Array.isArray(data.exames.depoimentos) && data.exames.depoimentos.some(dep =>
                                Object.values(dep).some(v =>
                                    typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) ? v.length > 0 : !!v
                                )
                            )
                        ) && (
                            <SecondarySection
                                icon={<Feather name="file-text" size={20} color="#173A64" />}
                                title="Exames"
                                showChevron={false}
                            >
                                {(
                                    Object.values(data?.exames?.documentacao || {}).some(v =>
                                        typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) ? v.length > 0 : !!v
                                    ) || (data?.exames?.observacoesDocumentacao?.trim() !== '')
                                ) && (
                                        <View style={styles.campoInterno}>
                                            <View style={styles.titleIcon}>
                                                <MaterialCommunityIcons name="folder-open" size={20} color="#4B4A4A" />
                                                <Text style={styles.itemTitle}>Documentação</Text>
                                            </View>
                                            {data.exames.documentacao.dataHora && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Data e hora do registro: </Text>
                                                    <Text style={styles.itemText}>{formatarData(data.exames.documentacao.dataHora)}</Text>
                                                </View>
                                            )}
                                            {data?.exames?.documentacao?.croquiBase64 && (
                                                <View style={styles.uploadedList}>
                                                    <Text style={[styles.subTitle, {paddingBottom: 10}]}>Croqui:</Text>
                                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                        <TouchableOpacity
                                                            style={styles.thumbnailWrapper}
                                                            onPress={() =>
                                                                router.push({
                                                                    pathname: '/previewImage',
                                                                    params: { uri: data.exames.documentacao.croquiBase64 },
                                                                })
                                                            }
                                                        >
                                                            <View style={styles.imageContainer}>
                                                                <Image
                                                                    source={{ uri: data.exames.documentacao.croquiBase64 }}
                                                                    style={styles.thumbnail}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </ScrollView>
                                                </View>
                                            )}


                                            {data.exames.documentacao.projetos && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Projetos: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.projetos}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.memorialCalculo && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Memorial de Cálculo: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.memorialCalculo}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.licencaAlvara && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Licença e Alvará: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.licencaAlvara}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.art && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>ART: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.art}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.planoManutencao && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Plano de Manutenção: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.planoManutencao}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.contratoManutencao && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Contrato de Manutenção: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.contratoManutencao}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.registroManutencao && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Registro de Manutenção: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.registroManutencao}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.relatorioRia && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Relatório RIA: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.relatorioRia}</Text>
                                                </View>
                                            )}
                                            {data.exames.documentacao.outro && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Outro documento: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.documentacao?.outro}</Text>
                                                </View>
                                            )}

                                            {data?.exames?.observacoesDocumentacao?.trim() && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Outro documento: </Text>
                                                    <Text style={styles.itemText}>{data?.exames?.observacoesDocumentacao}</Text>
                                                </View>
                                            )}


                                            {/* Arquivos */}
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
                                                        <Text style={styles.subTitle}>{title}:</Text>
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

                                            {Array.isArray(data.exames.vestigiosDocumentacao) &&
                                                data.exames.vestigiosDocumentacao.length > 0 && (
                                                    <View>
                                                        {data.exames.vestigiosDocumentacao.map((vestigio, idx) => {
                                                            const expandido = vestigiosExpandido[idx] || false;

                                                            return (
                                                                <View key={idx} style={styles.ContainerVestigio}>
                                                                    <View style={styles.vetigioTop}>
                                                                        <View style={styles.titleIcon}>
                                                                            <MaterialCommunityIcons name="flask" size={18} color="#4B4A4A" />
                                                                            <Text style={styles.subTitle}>Vestígios (Documentação)</Text>
                                                                        </View>
                                                                        <Text style={styles.subTitle}>nº {1 + idx}</Text>
                                                                    </View>

                                                                    {/* Resumo sempre visível */}
                                                                    <View style={[styles.campoInternoSecundario, { marginBottom: 10 }]}>

                                                                        <Text style={styles.subTitle}>Dados preliminares</Text>

                                                                        {!!vestigio.numeroVestigio && (
                                                                            <Text style={styles.itemText}>• Nº {vestigio.numeroVestigio}</Text>
                                                                        )}
                                                                        {!!vestigio.naturezaVestigio && (
                                                                            <Text style={styles.itemText}>• Natureza: {vestigio.naturezaVestigio}</Text>
                                                                        )}
                                                                        {!!vestigio.dataHora && (
                                                                            <Text style={styles.itemText}>• Data e hora: {formatarData(vestigio.dataHora)}</Text>
                                                                        )}
                                                                    </View>

                                                                    {/* Detalhes visíveis somente se expandido */}
                                                                    {expandido && (
                                                                        <>
                                                                            <View style={styles.campoInterno}>

                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.unidadeOrigem && (
                                                                                    <Text style={styles.itemText}>• Unidade de origem: {vestigio.dadosCompletos.dadosPreliminares.unidadeOrigem}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.procedimento && (
                                                                                    <Text style={styles.itemText}>• Procedimento: {vestigio.dadosCompletos.dadosPreliminares.procedimento}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhada && (
                                                                                    <Text style={styles.itemText}>• Descrição: {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhada}</Text>
                                                                                )}

                                                                                {Array.isArray(vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhadaArquivos) &&
                                                                                    vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.length > 0 && (
                                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                            {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.map((file, idx) =>
                                                                                                !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                ) : null
                                                                                            )}
                                                                                        </ScrollView>
                                                                                    )}
                                                                            </View>

                                                                            <View style={styles.campoInternoSecundario}>
                                                                                <Text style={styles.subTitle}>Acondicionamento</Text>
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.responsavelColeta && (
                                                                                    <Text style={styles.itemText}>• Responsável: {vestigio.dadosCompletos.acondicionamento.responsavelColeta}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.matricula && (
                                                                                    <Text style={styles.itemText}>• Matrícula: {vestigio.dadosCompletos.acondicionamento.matricula}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.localizacao?.address && (
                                                                                    <Text style={styles.itemText}>
                                                                                        • Localização: {vestigio.dadosCompletos.acondicionamento.localizacao.address}, Lat.: {vestigio.dadosCompletos.acondicionamento.localizacao.latitude}, Lgt.: {vestigio.dadosCompletos.acondicionamento.localizacao.longitude}
                                                                                    </Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamento && (
                                                                                    <Text style={styles.itemText}>• Tipo de acondicionamento: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamento}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamentoOutros && (
                                                                                    <Text style={styles.itemText}>• Outros: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamentoOutros}</Text>
                                                                                )}

                                                                                {Array.isArray(vestigio.dadosCompletos?.acondicionamento?.arquivos) &&
                                                                                    vestigio.dadosCompletos.acondicionamento.arquivos.length > 0 && (
                                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                            {vestigio.dadosCompletos.acondicionamento.arquivos.map((file, idx) =>
                                                                                                !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                ) : null
                                                                                            )}
                                                                                        </ScrollView>
                                                                                    )}
                                                                            </View>
                                                                        </>
                                                                    )}

                                                                    {/* Botão alternar */}
                                                                    <TouchableOpacity
                                                                        onPress={() =>
                                                                            setVestigiosExpandido(prev => ({
                                                                                ...prev,
                                                                                [idx]: !expandido,
                                                                            }))
                                                                        }
                                                                    >
                                                                        <Text style={styles.toggleText}>
                                                                            {expandido ? 'Ver menos ▲' : 'Ver mais ▼'}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}

                                        </View>
                                    )}

                                {(() => {
                                    const equipamentos = data.exames?.equipamentosExame;

                                    const temDadosMaquinaTracao = Array.isArray(equipamentos?.maquinaTracao) &&
                                        equipamentos.maquinaTracao.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosLimitadorVelocidade = Array.isArray(equipamentos?.limitadorVelocidade) &&
                                        equipamentos.limitadorVelocidade.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosCabos = Array.isArray(equipamentos?.cabos) &&
                                        equipamentos.cabos.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosContrapeso = Array.isArray(equipamentos?.contrapeso) &&
                                        equipamentos.contrapeso.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosCabine = Array.isArray(equipamentos?.cabine) &&
                                        equipamentos.cabine.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosPortas = Array.isArray(equipamentos?.portas) &&
                                        equipamentos.portas.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosFreios = Array.isArray(equipamentos?.freiosEmergencia) &&
                                        equipamentos.freiosEmergencia.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadosControle = Array.isArray(equipamentos?.sistemaControle) &&
                                        equipamentos.sistemaControle.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadoEletrico = Array.isArray(equipamentos?.sistemaEletrico) &&
                                        equipamentos.sistemaEletrico.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadoSensores = Array.isArray(equipamentos?.sensores) &&
                                        equipamentos.sensores.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const temDadoPoco = Array.isArray(equipamentos?.pocoElevador) &&
                                        equipamentos.pocoElevador.some(item =>
                                            item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                        );

                                    const mostrarEquipamentos =
                                        temDadosMaquinaTracao || temDadosLimitadorVelocidade || temDadosCabos || temDadosContrapeso || temDadosCabine || temDadosPortas ||
                                        temDadosFreios || temDadosControle || temDadoEletrico || temDadoSensores || temDadoPoco || !!data.exames.equipamentosExame.dataHoraMaquinaTracao ||
                                        !!data.exames.equipamentosExame.dataHoraLimitador || !! !!data.exames.equipamentosExame.dataHoraCabine || !!data.exames.equipamentosExame.dataHoraCabos
                                        || !!data.exames.equipamentosExame.dataHoraPocoElevador || !!data.exames.equipamentosExame.dataHoraFreios || !!data.exames.equipamentosExame.dataHoraSistemaControle || !!data.exames.equipamentosExame.dataHoraSistemaEletrico
                                        || !!data.exames.equipamentosExame.dataHoraSensores || !!data.exames.equipamentosExame.dataHoraPocoElevador;

                                    if (!mostrarEquipamentos) return null;

                                    return (
                                        <View style={styles.campoInterno}>
                                            <View style={styles.titleIcon}>
                                                <MaterialCommunityIcons name="tools" size={20} color="#4B4A4A" />
                                                <Text style={styles.itemTitle}>Equipamentos</Text>
                                            </View>
                                            {Array.isArray(data.exames.equipamentosExame?.maquinaTracao) &&
                                                data.exames.equipamentosExame.maquinaTracao.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Casa de Maquinas - Maquina tração</Text>
                                                        {data.exames.equipamentosExame.dataHoraMaquinaTracao && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraMaquinaTracao)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.maquinaTracao.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;


                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}



                                                    </View>
                                                )}

                                            {Array.isArray(data.exames.equipamentosExame?.limitadorVelocidade) &&
                                                data.exames.equipamentosExame.limitadorVelocidade.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Casa de Maquinas - Limitador de Velocidade</Text>
                                                        {data.exames.equipamentosExame.dataHoraLimitador && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraLimitador)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.limitadorVelocidade.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.cabos) &&
                                                data.exames.equipamentosExame.cabos.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Cabos e contrapeso - Cabos</Text>
                                                        {data.exames.equipamentosExame.dataHoraCabos && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraCabos)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.cabos.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.contrapeso) &&
                                                data.exames.equipamentosExame.contrapeso.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Cabos e contrapeso - Contrapeso</Text>
                                                        {data.exames.equipamentosExame.dataHoraContrapeso && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraContrapeso)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.contrapeso.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.cabine) &&
                                                data.exames.equipamentosExame.cabine.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Cabine e portas - Cabine</Text>
                                                        {data.exames.equipamentosExame.dataHoraMaquinaTracao && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraCabine)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.cabine.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.portas) &&
                                                data.exames.equipamentosExame.portas.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Cabine e portas - Portas</Text>
                                                        {data.exames.equipamentosExame.dataHoraPortas && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraPortas)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.portas.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.freiosEmergencia) &&
                                                data.exames.equipamentosExame.freiosEmergencia.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Freios de Emergência</Text>
                                                        {data.exames.equipamentosExame.dataHoraFreios && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraFreios)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.freiosEmergencia.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}

                                            {Array.isArray(data.exames.equipamentosExame?.sistemaControle) &&
                                                data.exames.equipamentosExame.sistemaControle.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Quadro de comando - Sistema de controle</Text>
                                                        {data.exames.equipamentosExame.dataHoraSistemaControle && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraSistemaControle)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.sistemaControle.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}

                                            {Array.isArray(data.exames.equipamentosExame?.sistemaEletrico) &&
                                                data.exames.equipamentosExame.sistemaEletrico.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Quadro de comando - Sistema elétrico</Text>
                                                        {data.exames.equipamentosExame.dataHoraSistemaEletrico && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraSistemaEletrico)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.sistemaEletrico.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.sensores) &&
                                                data.exames.equipamentosExame.sensores.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Quandro de comando - Sensores</Text>
                                                        {data.exames.equipamentosExame.dataHoraSensores && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraSensores)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.sensores.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}


                                            {Array.isArray(data.exames.equipamentosExame?.pocoElevador) &&
                                                data.exames.equipamentosExame.pocoElevador.some(item =>
                                                    item.observacao?.trim() ||
                                                    (Array.isArray(item.arquivos) && item.arquivos.length > 0)
                                                ) && (
                                                    <View style={styles.campoInterno}>
                                                        <Text style={styles.itemTitle}>Quadro de comando - Poço elevador</Text>
                                                        {data.exames.equipamentosExame.dataHoraPocoElevador && (
                                                            <Text style={styles.itemText}>
                                                                Data e hora: {formatarData(data.exames.equipamentosExame.dataHoraPocoElevador)}
                                                            </Text>
                                                        )}
                                                        {data.exames.equipamentosExame.pocoElevador.map((item, index) => {
                                                            const temTitulo = item.titulo?.trim();
                                                            const temObservacao = item.observacao?.trim();
                                                            const temArquivos = Array.isArray(item.arquivos) && item.arquivos.length > 0;

                                                            if (!temObservacao && !temArquivos) return null; // ignora item sem observação e sem arquivos

                                                            return (
                                                                <View key={item.id || index} style={[styles.campoInternoSecundario, { marginBottom: 12 }]}>
                                                                    {!!temObservacao && !!temTitulo && (
                                                                        <Text style={styles.itemText}>{1 + index}. {item.titulo} </Text>
                                                                    )}
                                                                    {!!temObservacao && (
                                                                        <Text style={styles.itemText}>Observação: {item.observacao}</Text>
                                                                    )}
                                                                    {temArquivos && (
                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                                                                            {item.arquivos?.map((file, idx) =>
                                                                                !!file.uri ? (
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
                                                                                        <Image source={{ uri: file.uri }} style={styles.thumbnail} />
                                                                                    </TouchableOpacity>
                                                                                ) : null
                                                                            )}
                                                                        </ScrollView>
                                                                    )}
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}

                                            {Array.isArray(data.exames.vestigiosEquipamentos) &&
                                                data.exames.vestigiosEquipamentos.length > 0 && (
                                                    <View>
                                                        {data.exames.vestigiosEquipamentos.map((vestigio, idx) => {
                                                            const expandido = vestigiosExpandido[idx] || false;

                                                            return (
                                                                <View key={idx} style={styles.ContainerVestigio}>
                                                                    <View style={styles.vetigioTop}>
                                                                        <View style={styles.titleIcon}>
                                                                            <MaterialCommunityIcons name="flask" size={18} color="#4B4A4A" />
                                                                            <Text style={styles.subTitle}>Vestígios (Equipamento)</Text>
                                                                        </View>
                                                                        <Text style={styles.subTitle}>nº {1 + idx}</Text>
                                                                    </View>

                                                                    {/* Resumo sempre visível */}
                                                                    <View style={[styles.campoInternoSecundario, { marginBottom: 10 }]}>

                                                                        <Text style={styles.subTitle}>Dados preliminares</Text>

                                                                        {!!vestigio.numeroVestigio && (
                                                                            <Text style={styles.itemText}>• Nº {vestigio.numeroVestigio}</Text>
                                                                        )}
                                                                        {!!vestigio.naturezaVestigio && (
                                                                            <Text style={styles.itemText}>• Natureza: {vestigio.naturezaVestigio}</Text>
                                                                        )}
                                                                        {!!vestigio.dataHora && (
                                                                            <Text style={styles.itemText}>• Data e hora: {formatarData(vestigio.dataHora)}</Text>
                                                                        )}
                                                                    </View>

                                                                    {/* Detalhes visíveis somente se expandido */}
                                                                    {expandido && (
                                                                        <>
                                                                            <View style={styles.campoInterno}>
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.unidadeOrigem && (
                                                                                    <Text style={styles.itemText}>• Unidade de origem: {vestigio.dadosCompletos.dadosPreliminares.unidadeOrigem}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.procedimento && (
                                                                                    <Text style={styles.itemText}>• Procedimento: {vestigio.dadosCompletos.dadosPreliminares.procedimento}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhada && (
                                                                                    <Text style={styles.itemText}>• Descrição: {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhada}</Text>
                                                                                )}

                                                                                {Array.isArray(vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhadaArquivos) &&
                                                                                    vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.length > 0 && (
                                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                            {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.map((file, idx) =>
                                                                                                !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                ) : null
                                                                                            )}
                                                                                        </ScrollView>
                                                                                    )}
                                                                            </View>

                                                                            <View style={styles.campoInternoSecundario}>
                                                                                <Text style={styles.subTitle}>Acondicionamento</Text>
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.responsavelColeta && (
                                                                                    <Text style={styles.itemText}>• Responsável: {vestigio.dadosCompletos.acondicionamento.responsavelColeta}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.matricula && (
                                                                                    <Text style={styles.itemText}>• Matrícula: {vestigio.dadosCompletos.acondicionamento.matricula}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.localizacao?.address && (
                                                                                    <Text style={styles.itemText}>
                                                                                        • Localização: {vestigio.dadosCompletos.acondicionamento.localizacao.address}, Lat.: {vestigio.dadosCompletos.acondicionamento.localizacao.latitude}, Lgt.: {vestigio.dadosCompletos.acondicionamento.localizacao.longitude}
                                                                                    </Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamento && (
                                                                                    <Text style={styles.itemText}>• Tipo de acondicionamento: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamento}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamentoOutros && (
                                                                                    <Text style={styles.itemText}>• Outros: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamentoOutros}</Text>
                                                                                )}

                                                                                {Array.isArray(vestigio.dadosCompletos?.acondicionamento?.arquivos) &&
                                                                                    vestigio.dadosCompletos.acondicionamento.arquivos.length > 0 && (
                                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                            {vestigio.dadosCompletos.acondicionamento.arquivos.map((file, idx) =>
                                                                                                !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                ) : null
                                                                                            )}
                                                                                        </ScrollView>
                                                                                    )}
                                                                            </View>
                                                                        </>
                                                                    )}

                                                                    {/* Botão alternar */}
                                                                    <TouchableOpacity
                                                                        onPress={() =>
                                                                            setVestigiosExpandido(prev => ({
                                                                                ...prev,
                                                                                [idx]: !expandido,
                                                                            }))
                                                                        }
                                                                    >
                                                                        <Text style={styles.toggleText}>
                                                                            {expandido ? 'Ver menos ▲' : 'Ver mais ▼'}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}




                                        </View>

                                    );
                                })()}



                                {Array.isArray(data.exames?.depoimentos) &&
                                    data.exames.depoimentos.some(dep =>
                                        dep.dataHoraEntrevista ||
                                        dep.tipoEntrevistado?.trim() ||
                                        dep.nomeEntrevistado?.trim() ||
                                        dep.identificacao?.trim() ||
                                        dep.endereco?.trim() ||
                                        dep.idade ||
                                        dep.genero?.trim() ||
                                        dep.depoimentoRelato?.trim() ||
                                        dep.descricaoLesoes?.trim() ||
                                        (Array.isArray(dep.arquivoLesoes) && dep.arquivoLesoes.length > 0)
                                    ) && (
                                        <View style={styles.campoInternoSecundario}>
                                            <View style={styles.titleIcon}>
                                                <MaterialCommunityIcons name="account-voice" size={20} color="#4B4A4A" />
                                                <Text style={styles.itemTitle}>Entrevistas</Text>
                                            </View>

                                            {data.exames.depoimentos.map((depoimento, index) => (
                                                <View key={index} style={styles.campoInterno}>
                                                    <Text style={styles.subTitle}>Entrevista {index + 1}</Text>

                                                    {depoimento.dataHoraEntrevista && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Data do registro: </Text>
                                                            <Text style={styles.itemText}>{formatarData(data.exames.perinecroscopia.dataHora)}</Text>
                                                        </View>
                                                    )}
                                                    {depoimento.tipoEntrevistado && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Categoria: </Text>
                                                            <Text style={styles.itemText}>{depoimento.tipoEntrevistado}</Text>
                                                        </View>
                                                    )}
                                                    {depoimento.nomeEntrevistado && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Nome: </Text>
                                                            <Text style={styles.itemText}>{depoimento.nomeEntrevistado}</Text>
                                                        </View>
                                                    )}
                                                    {depoimento.identificacao && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Identificação: </Text>
                                                            <Text style={styles.itemText}>{depoimento.identificacao}</Text>
                                                        </View>
                                                    )}
                                                    {depoimento.endereco && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Endereço: </Text>
                                                            <Text style={styles.itemText}>{depoimento.endereco}</Text>
                                                        </View>
                                                    )}
                                                    {depoimento.idade && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Idade: </Text>
                                                            <Text style={styles.itemText}>{depoimento.idade}</Text>
                                                        </View>
                                                    )}
                                                    {depoimento.genero && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Sexo: </Text>
                                                            <Text style={styles.itemText}>{depoimento.genero}</Text>
                                                        </View>
                                                    )}

                                                    {depoimento.depoimentoRelato && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Depoimento: </Text>
                                                            <Text style={styles.itemText}>{depoimento.depoimentoRelato}</Text>
                                                        </View>
                                                    )}

                                                    {depoimento.descricaoLesoes && (
                                                        <View style={styles.viewText}>
                                                            <Text style={styles.subTitle}>Descrição das lesões: </Text>
                                                            <Text style={styles.itemText}>{depoimento.genero}</Text>
                                                        </View>
                                                    )}


                                                    {Array.isArray(depoimento.arquivoLesoes) &&
                                                        depoimento.arquivoLesoes.length > 0 && (
                                                            <View style={{ gap: 10 }}>
                                                                <Text style={styles.subTitle}>Arquivos:</Text>
                                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 10 }}>
                                                                    {depoimento.arquivoLesoes.map((file, idx) => (
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


                                                    {Array.isArray(data.exames.vestigiosEntrevistas) &&
                                                        data.exames.vestigiosEntrevistas.length > 0 && (
                                                            <View>
                                                                {data.exames.vestigiosEntrevistas.map((vestigio, idx) => {
                                                                    const expandido = vestigiosExpandido[idx] || false;

                                                                    return (
                                                                        <View key={idx} style={styles.ContainerVestigio}>
                                                                            <View style={styles.vetigioTop}>
                                                                                <View style={styles.titleIcon}>
                                                                                    <MaterialCommunityIcons name="flask" size={18} color="#4B4A4A" />
                                                                                    <Text style={styles.subTitle}>Vestígios (Perinecroscopia)</Text>
                                                                                </View>
                                                                                <Text style={styles.subTitle}>nº {1 + idx}</Text>
                                                                            </View>

                                                                            {/* Resumo sempre visível */}
                                                                            <View style={[styles.campoInternoSecundario, { marginBottom: 10 }]}>

                                                                                <Text style={styles.subTitle}>Dados preliminares</Text>

                                                                                {!!vestigio.numeroVestigio && (
                                                                                    <Text style={styles.itemText}>• Nº {vestigio.numeroVestigio}</Text>
                                                                                )}
                                                                                {!!vestigio.naturezaVestigio && (
                                                                                    <Text style={styles.itemText}>• Natureza: {vestigio.naturezaVestigio}</Text>
                                                                                )}
                                                                                {!!vestigio.dataHora && (
                                                                                    <Text style={styles.itemText}>• Data e hora: {formatarData(vestigio.dataHora)}</Text>
                                                                                )}
                                                                            </View>

                                                                            {/* Detalhes visíveis somente se expandido */}
                                                                            {expandido && (
                                                                                <>
                                                                                    <View style={styles.campoInterno}>
                                                                                        {!!vestigio.dadosCompletos?.dadosPreliminares?.unidadeOrigem && (
                                                                                            <Text style={styles.itemText}>• Unidade de origem: {vestigio.dadosCompletos.dadosPreliminares.unidadeOrigem}</Text>
                                                                                        )}
                                                                                        {!!vestigio.dadosCompletos?.dadosPreliminares?.procedimento && (
                                                                                            <Text style={styles.itemText}>• Procedimento: {vestigio.dadosCompletos.dadosPreliminares.procedimento}</Text>
                                                                                        )}
                                                                                        {!!vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhada && (
                                                                                            <Text style={styles.itemText}>• Descrição: {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhada}</Text>
                                                                                        )}

                                                                                        {Array.isArray(vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhadaArquivos) &&
                                                                                            vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.length > 0 && (
                                                                                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                                    {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.map((file, idx) =>
                                                                                                        !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                                    <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                                </View>
                                                                                                            </TouchableOpacity>
                                                                                                        ) : null
                                                                                                    )}
                                                                                                </ScrollView>
                                                                                            )}
                                                                                    </View>

                                                                                    <View style={styles.campoInternoSecundario}>
                                                                                        <Text style={styles.subTitle}>Acondicionamento</Text>
                                                                                        {!!vestigio.dadosCompletos?.acondicionamento?.responsavelColeta && (
                                                                                            <Text style={styles.itemText}>• Responsável: {vestigio.dadosCompletos.acondicionamento.responsavelColeta}</Text>
                                                                                        )}
                                                                                        {!!vestigio.dadosCompletos?.acondicionamento?.matricula && (
                                                                                            <Text style={styles.itemText}>• Matrícula: {vestigio.dadosCompletos.acondicionamento.matricula}</Text>
                                                                                        )}
                                                                                        {!!vestigio.dadosCompletos?.acondicionamento?.localizacao?.address && (
                                                                                            <Text style={styles.itemText}>
                                                                                                • Localização: {vestigio.dadosCompletos.acondicionamento.localizacao.address}, Lat.: {vestigio.dadosCompletos.acondicionamento.localizacao.latitude}, Lgt.: {vestigio.dadosCompletos.acondicionamento.localizacao.longitude}
                                                                                            </Text>
                                                                                        )}
                                                                                        {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamento && (
                                                                                            <Text style={styles.itemText}>• Tipo de acondicionamento: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamento}</Text>
                                                                                        )}
                                                                                        {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamentoOutros && (
                                                                                            <Text style={styles.itemText}>• Outros: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamentoOutros}</Text>
                                                                                        )}

                                                                                        {Array.isArray(vestigio.dadosCompletos?.acondicionamento?.arquivos) &&
                                                                                            vestigio.dadosCompletos.acondicionamento.arquivos.length > 0 && (
                                                                                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                                    {vestigio.dadosCompletos.acondicionamento.arquivos.map((file, idx) =>
                                                                                                        !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                                    <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                                </View>
                                                                                                            </TouchableOpacity>
                                                                                                        ) : null
                                                                                                    )}
                                                                                                </ScrollView>
                                                                                            )}
                                                                                    </View>
                                                                                </>
                                                                            )}

                                                                            {/* Botão alternar */}
                                                                            <TouchableOpacity
                                                                                onPress={() =>
                                                                                    setVestigiosExpandido(prev => ({
                                                                                        ...prev,
                                                                                        [idx]: !expandido,
                                                                                    }))
                                                                                }
                                                                            >
                                                                                <Text style={styles.toggleText}>
                                                                                    {expandido ? 'Ver menos ▲' : 'Ver mais ▼'}
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    );
                                                                })}
                                                            </View>
                                                        )}


                                                </View>
                                            ))}
                                        </View>
                                    )}


                                {(
                                    data?.exames?.perinecroscopia?.cadaverSexo ||
                                    data?.exames?.perinecroscopia?.cadaverCorPele ||
                                    data?.exames?.perinecroscopia?.cadaverCabelo ||
                                    data?.exames?.perinecroscopia?.cadaverSinaisIdentificadores ||
                                    data?.exames?.perinecroscopia?.cadaverDescricaoVestes ||
                                    data?.exames?.perinecroscopia?.cadaverOutro
                                ) && (
                                        <View style={styles.campoInternoSecundario}>
                                            <View style={styles.titleIcon}>
                                                <Feather name="activity" size={20} color="#4B4A4A" />
                                                <Text style={styles.itemTitle}>Perinecroscopia</Text>
                                            </View>
                                            <Text style={styles.itemTitle}>Caracterização do Cadáver.</Text>


                                            {data.exames.perinecroscopia.dataHora && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Data do registro: </Text>
                                                    <Text style={styles.itemText}>{formatarData(data.exames.perinecroscopia.dataHora)}</Text>
                                                </View>
                                            )}
                                            {data.exames.perinecroscopia.cadaverSexo && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Sexo: </Text>
                                                    <Text style={styles.itemText}>{data.exames.perinecroscopia.cadaverSexo}</Text>
                                                </View>
                                            )}
                                            {data.exames.perinecroscopia.cadaverCorPele && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Cor da Pele: </Text>
                                                    <Text style={styles.itemText}>{data.exames.perinecroscopia.cadaverCorPele}</Text>
                                                </View>
                                            )}
                                            {data.exames.perinecroscopia.cadaverCabelo && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Cabelo: </Text>
                                                    <Text style={styles.itemText}>{data.exames.perinecroscopia.cadaverCabelo}</Text>
                                                </View>
                                            )}
                                            {data.exames.perinecroscopia.cadaverSinaisIdentificadores && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Sinais identificadores: </Text>
                                                    <Text style={styles.itemText}>{data.exames.perinecroscopia.cadaverSinaisIdentificadores}</Text>
                                                </View>
                                            )}
                                            {data.exames.perinecroscopia.cadaverDescricaoVestes && (
                                                <View style={styles.viewText}>
                                                    <Text style={styles.subTitle}>Descrição das vestes e pertences pessoais: </Text>
                                                    <Text style={styles.itemText}>{data.exames.perinecroscopia.cadaverDescricaoVestes}</Text>
                                                </View>
                                            )}
                                            {data.exames.perinecroscopia.cadaverOutro && (
                                                <Text style={styles.itemText}>Outro: {data.exames.perinecroscopia.cadaverOutro}</Text>
                                            )}

                                            {(
                                                data.exames.perinecroscopia.analiseDisposicaoCadaver ||
                                                (Array.isArray(data.exames.perinecroscopia.arquivosDisposicaoCadaver) &&
                                                    data.exames.perinecroscopia.arquivosDisposicaoCadaver.length > 0)
                                            ) && (
                                                    <View style={{ gap: 10, }}>
                                                        <Text style={styles.itemTitle}>Análise da disposição do Cadáver.</Text>

                                                        {!!data.exames.perinecroscopia.analiseDisposicaoCadaver && (
                                                            <Text style={styles.itemText}>
                                                                Analise: {data.exames.perinecroscopia.analiseDisposicaoCadaver}
                                                            </Text>
                                                        )}

                                                        {Array.isArray(data.exames.perinecroscopia.arquivosDisposicaoCadaver) &&
                                                            data.exames.perinecroscopia.arquivosDisposicaoCadaver.length > 0 && (
                                                                <View style={{ gap: 10 }}>
                                                                    <Text style={styles.subTitle}>Arquivos:</Text>
                                                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 10 }}>
                                                                        {data.exames.perinecroscopia.arquivosDisposicaoCadaver.map((file, idx) => (
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
                                                )}

                                            {(
                                                data.exames.perinecroscopia.sinaisTanatologicos ||
                                                (Array.isArray(data.exames.perinecroscopia.arquivosTanatologicos) &&
                                                    data.exames.perinecroscopia.arquivosTanatologicos.length > 0)
                                            ) && (
                                                    <View style={{ gap: 10, }}>
                                                        <Text style={styles.itemTitle}>Descrição dos sinais tanatológicos.</Text>

                                                        {!!data.exames.perinecroscopia.sinaisTanatologicos && (
                                                            <Text style={styles.itemText}>
                                                                Descrição: {data.exames.perinecroscopia.sinaisTanatologicos}
                                                            </Text>
                                                        )}

                                                        {Array.isArray(data.exames.perinecroscopia.arquivosTanatologicos) &&
                                                            data.exames.perinecroscopia.arquivosTanatologicos.length > 0 && (
                                                                <View style={{ gap: 10 }}>
                                                                    <Text style={styles.subTitle}>Arquivos:</Text>
                                                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                                                        {data.exames.perinecroscopia.arquivosTanatologicos.map((file, idx) => (
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
                                                )}


                                            {(
                                                data.exames.perinecroscopia.descricaoLesoesCadaver ||
                                                (Array.isArray(data.exames.perinecroscopia.arquivosLesoesCadaver) &&
                                                    data.exames.perinecroscopia.arquivosLesoesCadaver.length > 0)
                                            ) && (
                                                    <View style={{ gap: 10, }}>
                                                        <Text style={styles.itemTitle}>Descrição das lesões.</Text>

                                                        {!!data.exames.perinecroscopia.descricaoLesoesCadaver && (
                                                            <Text style={styles.itemText}>
                                                                Descrição: {data.exames.perinecroscopia.descricaoLesoesCadaver}
                                                            </Text>
                                                        )}

                                                        {Array.isArray(data.exames.perinecroscopia.arquivosLesoesCadaver) &&
                                                            data.exames.perinecroscopia.arquivosLesoesCadaver.length > 0 && (
                                                                <View style={{ gap: 10 }}>
                                                                    <Text style={styles.subTitle}>Arquivos:</Text>
                                                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                        {data.exames.perinecroscopia.arquivosLesoesCadaver.map((file, idx) => (
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
                                                )}





                                            {Array.isArray(data.exames.vestigiosPerinecroscopia) &&
                                                data.exames.vestigiosPerinecroscopia.length > 0 && (
                                                    <View>
                                                        {data.exames.vestigiosPerinecroscopia.map((vestigio, idx) => {
                                                            const expandido = vestigiosExpandido[idx] || false;

                                                            return (
                                                                <View key={idx} style={styles.ContainerVestigio}>
                                                                    <View style={styles.vetigioTop}>
                                                                        <View style={styles.titleIcon}>
                                                                            <MaterialCommunityIcons name="flask" size={18} color="#4B4A4A" />
                                                                            <Text style={styles.subTitle}>Vestígios (Perinecroscopia)</Text>
                                                                        </View>
                                                                        <Text style={styles.subTitle}>nº {1 + idx}</Text>
                                                                    </View>

                                                                    {/* Resumo sempre visível */}
                                                                    <View style={[styles.campoInternoSecundario, { marginBottom: 10 }]}>

                                                                        <Text style={styles.subTitle}>Dados preliminares</Text>

                                                                        {!!vestigio.numeroVestigio && (
                                                                            <Text style={styles.itemText}>• Nº {vestigio.numeroVestigio}</Text>
                                                                        )}
                                                                        {!!vestigio.naturezaVestigio && (
                                                                            <Text style={styles.itemText}>• Natureza: {vestigio.naturezaVestigio}</Text>
                                                                        )}
                                                                        {!!vestigio.dataHora && (
                                                                            <Text style={styles.itemText}>• Data e hora: {formatarData(vestigio.dataHora)}</Text>
                                                                        )}
                                                                    </View>

                                                                    {/* Detalhes visíveis somente se expandido */}
                                                                    {expandido && (
                                                                        <>
                                                                            <View style={styles.campoInterno}>
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.unidadeOrigem && (
                                                                                    <Text style={styles.itemText}>• Unidade de origem: {vestigio.dadosCompletos.dadosPreliminares.unidadeOrigem}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.procedimento && (
                                                                                    <Text style={styles.itemText}>• Procedimento: {vestigio.dadosCompletos.dadosPreliminares.procedimento}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhada && (
                                                                                    <Text style={styles.itemText}>• Descrição: {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhada}</Text>
                                                                                )}

                                                                                {Array.isArray(vestigio.dadosCompletos?.dadosPreliminares?.descricaoDetalhadaArquivos) &&
                                                                                    vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.length > 0 && (
                                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                            {vestigio.dadosCompletos.dadosPreliminares.descricaoDetalhadaArquivos.map((file, idx) =>
                                                                                                !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                ) : null
                                                                                            )}
                                                                                        </ScrollView>
                                                                                    )}
                                                                            </View>

                                                                            <View style={styles.campoInternoSecundario}>
                                                                                <Text style={styles.subTitle}>Acondicionamento</Text>
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.responsavelColeta && (
                                                                                    <Text style={styles.itemText}>• Responsável: {vestigio.dadosCompletos.acondicionamento.responsavelColeta}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.matricula && (
                                                                                    <Text style={styles.itemText}>• Matrícula: {vestigio.dadosCompletos.acondicionamento.matricula}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.localizacao?.address && (
                                                                                    <Text style={styles.itemText}>
                                                                                        • Localização: {vestigio.dadosCompletos.acondicionamento.localizacao.address}, Lat.: {vestigio.dadosCompletos.acondicionamento.localizacao.latitude}, Lgt.: {vestigio.dadosCompletos.acondicionamento.localizacao.longitude}
                                                                                    </Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamento && (
                                                                                    <Text style={styles.itemText}>• Tipo de acondicionamento: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamento}</Text>
                                                                                )}
                                                                                {!!vestigio.dadosCompletos?.acondicionamento?.tipoAcondicionamentoOutros && (
                                                                                    <Text style={styles.itemText}>• Outros: {vestigio.dadosCompletos.acondicionamento.tipoAcondicionamentoOutros}</Text>
                                                                                )}

                                                                                {Array.isArray(vestigio.dadosCompletos?.acondicionamento?.arquivos) &&
                                                                                    vestigio.dadosCompletos.acondicionamento.arquivos.length > 0 && (
                                                                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                                                            {vestigio.dadosCompletos.acondicionamento.arquivos.map((file, idx) =>
                                                                                                !!file.uri && typeof file.uri === 'string' ? (
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
                                                                                                            <Image source={{ uri: file.arquivo }} style={styles.thumbnail} />
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                ) : null
                                                                                            )}
                                                                                        </ScrollView>
                                                                                    )}
                                                                            </View>
                                                                        </>
                                                                    )}

                                                                    {/* Botão alternar */}
                                                                    <TouchableOpacity
                                                                        onPress={() =>
                                                                            setVestigiosExpandido(prev => ({
                                                                                ...prev,
                                                                                [idx]: !expandido,
                                                                            }))
                                                                        }
                                                                    >
                                                                        <Text style={styles.toggleText}>
                                                                            {expandido ? 'Ver menos ▲' : 'Ver mais ▼'}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}
                                        </View>
                                    )}
                            </SecondarySection>

                        )}


                </ScrollView>
            )}

            <TabBar
                tabs={[
                    { icon: 'home', label: 'Inicio', route: '/' },
                    { icon: 'plus-circle', label: 'Nova análise', route: '/forensicPage' },
                    { icon: 'search', label: 'Análises', route: '/forensics' },
                ]}
            />

            <FeedbackModal
                visible={feedbackVisible}
                type={feedbackType}
                message={feedbackMessage}
                onClose={() => setFeedbackVisible(false)}
                onConfirm={confirmDelete}
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
    subTitle: {
        fontSize: fontSize.placeholder,
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
    titleIcon: {
        flexDirection: 'row',
        gap: 10,
    },
    vetigioTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 4,
        marginBottom: 5,

    },
    viewText: {
        flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline'
    },
    ContainerVestigio: {
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#cccc',
        padding: 10,
        borderRadius: 10,
    },
    toggleText: {
        color: '#173A64',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 8,
    }

});