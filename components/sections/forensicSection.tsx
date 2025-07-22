import PrimaryList from '~/components/lists/primaryList';
import PrimaryInput from '../inputs/primaryInput';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';
import RemoveButton from '../buttons/removeButton';
import AddButton from '../buttons/addButton';
import LocationButton from '../buttons/locationButton';
import FileUpload from '../inputs/fileUpload';
import VoiceInput from '../inputs/voiceInput';
import PrimarySelect from '../inputs/primarySelect';
import MaterialList from '../lists/materialList';
import CheckBox from '../inputs/CheckBox';
import { useForensic } from '~/hooks/useForensic';
import { inspecaoCampos } from '~/data/inspecaoCampos';
import { useState } from 'react';
import FormDrawer from '../modal/formDrawer';

import CroquiModal from '../croqui';
import { ScrollView } from 'react-native-gesture-handler';
import ResumoVestigio from './vestigioSection';
import Modal from 'react-native-modal';

import { saveForensicModular } from '~/services/saveForensic';
import MainButton from '../buttons/mainButton';
import { ForensicModel } from '~/models/forensicModel';
import FeedbackModal from '../modal/feedbackModal';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { DepoimentoItem } from './depoimentoItem';
import { VestigioResumo } from '~/models/forensicModel';
import { DadosPreliminares, Acondicionamento } from '~/models/forensicModel';

import { isDadosIniciaisRespondido, isMateriaisRespondido, isAnalisePreliminarRespondido, isRiscoAPRRespondido, isExamesRespondido } from '~/utils/forensicUtils';

export default function ForensicSection() {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    const {
        // 1. Dados Iniciais
        dadosIniciais, setDadosIniciais,
        equipePericial, setEquipePericial,
        peritoAuxiliar, setPeritoAuxiliar,
        tecnico, setTecnico,
        outros, setOutros,

        // 2. Informações Gerais
        informacoes, setInformacoes,

        // 3. Análise do local
        reconhecimentoArea, setReconhecimentoArea,
        condicoesAmbientais, setCondicoesAmbientais,
        caracteristicasLocal, setCaracteristicasLocal,
        observacoesDocumentacao, setObservacoesDocumentacao,

        // 4. APR
        riscoAPR, setRiscoAPR,

        // 5. Exames e Documentação
        documentacao, setDocumentacao,

        // 5.3 Entrevistas
        depoimentos, setDepoimentos,

        // 5.4 Perinecroscopia
        cadaverSexo, setCadaverSexo,
        cadaverCorPele, setCadaverCorPele,
        cadaverCabelo, setCadaverCabelo,
        cadaverSinaisIdentificadores, setCadaverSinaisIdentificadores,
        cadaverDescricaoVestes, setCadaverDescricaoVestes,
        cadaverOutro, setCadaverOutro,
        analiseDisposicaoCadaver, setAnaliseDisposicaoCadaver,
        sinaisTanatologicos, setSinaisTanatologicos,
        descricaoLesoesCadaver, setDescricaoLesoesCadaver,
        arquivosDisposicaoCadaver, setArquivosDisposicaoCadaver,
        arquivosTanatologicos, setArquivosTanatologicos,
        arquivosLesoesCadaver, setArquivosLesoesCadaver,

        // Vestígios
        dadosPreliminares, setDadosPreliminares,
        acondicionamento, setAcondicionamento,

        // Utilitários
        adicionarCampo, atualizarCampo, removerCampo,
        clearFieldError, errors, setErrors,

        maquinaTracao, setMaquinaTracao,
        limitadorVelocidade, setLimitadorVelocidade,

        cabos, setCabos,
        contrapeso, setContrapeso,

        cabine, setCabine,
        portas, setPortas,

        freiosEmergencia, setFreiosEmergencia,

        sistemaControle, setSistemaControle,
        sistemaEletrico, setSistemaEletrico,
        sensores, setSensores,
        pocoElevador, setPocoElevador,
        arquivosReconhecimentoArea, setArquivosReconhecimentoArea,
    } = useForensic();

    const [modalVestigioVisible, setModalVestigioVisible] = useState(false);
    const [origemVestigio, setOrigemVestigio] = useState<'equipamentos' | 'documentacao' | 'entrevistas' | 'perinecroscopia' | null>(null);

    const [vestigiosEquipamentos, setVestigiosEquipamentos] = useState<VestigioResumo[]>([]);
    const [vestigiosEntrevistas, setVestigiosEntrevistas] = useState<VestigioResumo[]>([]);
    const [vestigiosDocumentacao, setVestigiosDocumentacao] = useState<VestigioResumo[]>([]);
    const [vestigiosPerinecroscopia, setVestigiosPerinecroscopia] = useState<VestigioResumo[]>([]);

    const [vestigioSelecionado, setVestigioSelecionado] = useState<VestigioResumo | null>(null);
    const [mostrarRegistros, setMostrarRegistros] = useState(false);
    const [mostrarPerinecroscopia, setMostrarPerinecroscopia] = useState(false);

    const [materiaisSelecionados, setMateriaisSelecionados] = useState<number[]>([]);
    const [materialOutroDescricao, setMaterialOutroDescricao] = useState('');
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackType, setFeedbackType] = useState<'loading' | 'success' | 'error'>('loading');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const [vestigioIndex, setVestigioIndex] = useState(0);

    const respondidoDadosIniciais = isDadosIniciaisRespondido({
        dadosIniciais,
        equipePericial,
    } as any);

    const respondidoMateriais = isMateriaisRespondido({
        materiais: {
            selecionados: materiaisSelecionados,
            outroDescricao: materialOutroDescricao,
        },
    } as any);

    const analiseRespondida = isAnalisePreliminarRespondido({
        analisePreliminar: {
            reconhecimentoArea,
            condicoesAmbientais,
            caracteristicasLocal,
            informacoes,
            arquivosReconhecimentoArea,
        }
    } as any);

    const riscoRespondido = isRiscoAPRRespondido({
        risco: {
            riscoAPR,
            peritoAuxiliar: [],
            tecnico: [],
            outros: []
        }
    } as any);

    const examesRespondido = isExamesRespondido({
        exames: {
            documentacao,
            observacoesDocumentacao,
            vestigiosDocumentacao,
            maquinaTracao,
            limitadorVelocidade,
            cabos,
            contrapeso,
            cabine,
            portas,
            freiosEmergencia,
            sistemaControle,
            sistemaEletrico,
            sensores,
            pocoElevador,
            vestigiosEquipamentos,
            depoimentos,
            vestigiosEntrevistas,
            cadaverSexo,
            cadaverCorPele,
            cadaverCabelo,
            cadaverSinaisIdentificadores,
            cadaverDescricaoVestes,
            cadaverOutro,
            analiseDisposicaoCadaver,
            arquivosDisposicaoCadaver,
            sinaisTanatologicos,
            arquivosTanatologicos,
            descricaoLesoesCadaver,
            arquivosLesoesCadaver,
            vestigiosPerinecroscopia,
        }
    } as any);

    function cleanObject<T>(obj: T): T {
        if (typeof obj !== 'object' || obj === null) return obj;

        const newObj: any = Array.isArray(obj) ? [] : {};
        Object.entries(obj).forEach(([key, value]) => {
            if (value === undefined) return;

            if (Array.isArray(value)) {
                const cleanedArray = value.map(item => cleanObject(item)).filter(item => item !== undefined);
                newObj[key] = cleanedArray;
            } else if (typeof value === 'object') {
                const cleaned = cleanObject(value);
                if (
                    (Array.isArray(cleaned) && cleaned.length > 0) ||
                    (typeof cleaned === 'object' && Object.keys(cleaned).length > 0)
                ) {
                    newObj[key] = cleaned;
                } else if (!Array.isArray(cleaned)) {
                    newObj[key] = cleaned;
                }
            } else {
                newObj[key] = value;
            }
        });
        return newObj;
    }



    const handleSave = async () => {

        setFeedbackType('loading');
        setFeedbackMessage('Salvando análise forense...');
        setFeedbackVisible(true);

        try {
            const payload: ForensicModel = {
                id: '',
                dataCriacao: new Date(),
                usuario: currentUser?.email || 'desconhecido',
                dadosIniciais,
                equipePericial,
                materiais: {
                    selecionados: materiaisSelecionados,
                    outroDescricao: materialOutroDescricao,
                },
                analisePreliminar: {
                    reconhecimentoArea,
                    condicoesAmbientais,
                    caracteristicasLocal,
                    informacoes,
                    arquivosReconhecimentoArea,
                },
                risco: {
                    riscoAPR,
                    peritoAuxiliar,
                    tecnico,
                    outros,
                },
                exames: {
                    documentacao,
                    observacoesDocumentacao,
                    vestigiosDocumentacao,
                    maquinaTracao,
                    limitadorVelocidade,
                    cabos,
                    contrapeso,
                    cabine,
                    portas,
                    freiosEmergencia,
                    sistemaControle,
                    sistemaEletrico,
                    sensores,
                    pocoElevador,
                    vestigiosEquipamentos,
                    depoimentos,
                    vestigiosEntrevistas,
                    cadaverSexo,
                    cadaverCorPele,
                    cadaverCabelo,
                    cadaverSinaisIdentificadores,
                    cadaverDescricaoVestes,
                    cadaverOutro,
                    analiseDisposicaoCadaver,
                    arquivosDisposicaoCadaver,
                    sinaisTanatologicos,
                    arquivosTanatologicos,
                    descricaoLesoesCadaver,
                    arquivosLesoesCadaver,
                    vestigiosPerinecroscopia,
                },
                condicaoVitimas: undefined,
                numeroVitimas: undefined,
                viatura: undefined,
                autoridadePolicialNome: undefined,
                tipoOcorrencia: undefined,
                matriculaPerito: undefined,
                cargoPerito: false,
                peritoResponsavel: undefined
            };

            console.warn("VESITGIOS DOCUMENTACAO >>>>>>> ", payload.exames.vestigiosDocumentacao)
            console.warn("VESITGIOS EQUIPAMENTOS >>>>>>> ", payload.exames.vestigiosEquipamentos)
            console.warn("VESITGIOS ENTREVISTAS >>>>>>> ", payload.exames.vestigiosEntrevistas)
            console.warn("VESITGIOS PERINECROSCOPIA >>>>>>> ", payload.exames.vestigiosPerinecroscopia)

            const cleanedPayload = cleanObject(payload);

            await saveForensicModular(cleanedPayload);
            setFeedbackType('success');
            setFeedbackMessage('Análise forense salva com sucesso!');
            setTimeout(() => {
                setFeedbackVisible(false);
                router.push('/forensics');
            }, 1200);
        } catch (error) {
            console.error(error);
            setFeedbackType('error');
            setFeedbackMessage('Erro ao salvar análise forense.');
            setTimeout(() => setFeedbackVisible(false), 1500);
        }
    };

    function handleVisualizarVestigio(vestigio: VestigioResumo, index: number) {
        setVestigioSelecionado(vestigio);
        setOrigemVestigio(vestigio.origem);
        setVestigioIndex(index);
        setModalVestigioVisible(true);
    }

    const handleAvancarVestigio = () => {
        if (!origemVestigio) return;

        const dados = dadosPreliminares[origemVestigio] || [];
        const acond = acondicionamento[origemVestigio] || [];

        const resumoVestigio: VestigioResumo = {
            numeroVestigio: dados[vestigioIndex]?.numeroVestigio || '',
            naturezaVestigio: dados[vestigioIndex]?.naturezaVestigio || '',
            origem: origemVestigio,
            dadosCompletos: {
                dadosPreliminares: dados,
                acondicionamento: acond,
            },
        };

        const atualizaVestigios = (setFn: React.Dispatch<React.SetStateAction<VestigioResumo[]>>) => {
            setFn(prev => {
                const copia = [...prev];
                copia[vestigioIndex] = resumoVestigio;
                return copia;
            });
        };

        if (origemVestigio === 'equipamentos') atualizaVestigios(setVestigiosEquipamentos);
        else if (origemVestigio === 'entrevistas') atualizaVestigios(setVestigiosEntrevistas);
        else if (origemVestigio === 'documentacao') atualizaVestigios(setVestigiosDocumentacao);
        else if (origemVestigio === 'perinecroscopia') atualizaVestigios(setVestigiosPerinecroscopia);

        setModalVestigioVisible(false);
    };


    const origemLabels: Record<'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia', string> = {
        equipamentos: 'Equipamentos',
        entrevistas: 'Entrevistas',
        documentacao: 'Documentação',
        perinecroscopia: 'Perinecroscopia',
    };


    return (
        <View style={styles.section}>
            <PrimaryList
                title="1. Dados iniciais"
                respondido={!!respondidoDadosIniciais}
            >
                <View style={styles.campos}>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Perito responsável</Text>

                        <PrimaryInput
                            label="Nome completo"
                            placeholder="Informe"
                            value={dadosIniciais.peritoResponsavel}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, peritoResponsavel: text }))
                            }
                        />

                        <PrimaryInput
                            label="Cargo"
                            placeholder="Informe"
                            value={dadosIniciais.cargoPerito}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, cargoPerito: text }))
                            }
                        />

                        <PrimaryInput
                            label="Matrícula"
                            placeholder="Informe"
                            value={dadosIniciais.matriculaPerito}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, matriculaPerito: text }))
                            }
                        />
                    </View>

                    {/* Equipe Pericial */}
                    <View style={styles.campoInterno}>
                        {equipePericial.map((membro, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <Text style={styles.titulos}>Equipe Pericial - Auxiliar {index + 1}</Text>

                                <PrimaryInput
                                    label="Nome completo"
                                    placeholder="Informe"
                                    value={membro.nome}
                                    onChangeText={(text) => {
                                        const copia = [...equipePericial];
                                        copia[index].nome = text;
                                        setEquipePericial(copia);
                                    }}
                                />

                                <PrimaryInput
                                    label="Cargo"
                                    placeholder="Informe"
                                    value={membro.cargo}
                                    onChangeText={(text) => {
                                        const copia = [...equipePericial];
                                        copia[index].cargo = text;
                                        setEquipePericial(copia);
                                    }}
                                />

                                <PrimaryInput
                                    label="Matrícula"
                                    placeholder="Informe"
                                    value={membro.matricula}
                                    onChangeText={(text) => {
                                        const copia = [...equipePericial];
                                        copia[index].matricula = text;
                                        setEquipePericial(copia);
                                    }}
                                />

                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover auxiliar"
                                        onPress={() =>
                                            setEquipePericial((prev) => prev.filter((_, i) => i !== index))
                                        }
                                    />
                                )}
                            </View>
                        ))}

                        <AddButton
                            label="Adicionar mais um membro da equipe"
                            onPress={() =>
                                setEquipePericial((prev) => [
                                    ...prev,
                                    { nome: '', cargo: '', matricula: '' },
                                ])
                            }
                        />
                    </View>

                    {/* Solicitação */}
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Solicitação</Text>

                        <PrimaryInput
                            label="Data e hora"
                            placeholder="Informe"
                            value={dadosIniciais.dataHora.toLocaleString()}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, dataHora: new Date() }))
                            }
                        />

                        <PrimaryInput
                            label="Tipo de ocorrência"
                            placeholder="Informe"
                            value={dadosIniciais.tipoOcorrencia}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, tipoOcorrencia: text }))
                            }
                        />

                        <PrimaryInput
                            label="Autoridade policial solicitante"
                            placeholder="Informe"
                            value={dadosIniciais.autoridadePolicialNome}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, autoridadePolicialNome: text }))
                            }
                        />
                    </View>

                    {/* Atendimento */}
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Atendimento</Text>

                        <LocationButton
                            value={dadosIniciais.localizacao || null}
                            onChange={(loc) => setDadosIniciais((prev) => ({ ...prev, localizacao: loc }))}
                        />

                        <PrimaryInput
                            label="Viatura (placa)"
                            placeholder="Informe"
                            value={dadosIniciais.viatura}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, viatura: text }))
                            }
                        />

                        <PrimaryInput
                            label="Número de vítimas (Óbitos, feridos)"
                            placeholder="Informe"
                            value={dadosIniciais.numeroVitimas}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, numeroVitimas: text }))
                            }
                        />

                        <PrimaryInput
                            label="Condição das vítimas (Óbitos, feridos)"
                            placeholder="Informe"
                            value={dadosIniciais.condicaoVitimas}
                            onChangeText={(text) =>
                                setDadosIniciais((prev) => ({ ...prev, condicaoVitimas: text }))
                            }
                        />

                        <PrimarySelect
                            label="Autoridade policial no local"
                            selected={dadosIniciais.autoridadePolicial}
                            onSelect={(value) =>
                                setDadosIniciais((prev) => ({ ...prev, autoridadePolicial: value }))
                            }
                            placeholder="Selecione"
                            options={['Sim', 'Não']}
                        />
                    </View>

                </View>
            </PrimaryList>

            <PrimaryList
                title="2. Materiais, Equipamentos, EPI e EPC"
                respondido={!!respondidoMateriais}
            >
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        {/* Lista de materiais, equipamentos, EPIs e EPCs */}
                        <MaterialList
                            materiaisSelecionados={materiaisSelecionados}
                            setMateriaisSelecionados={setMateriaisSelecionados}
                            materialOutroDescricao={materialOutroDescricao}
                            setMaterialOutroDescricao={setMaterialOutroDescricao}
                        />

                    </View>
                </View>
            </PrimaryList>


            <PrimaryList title="3. Análise preliminar do local" respondido={!!analiseRespondida}>
                <View style={styles.campos}>

                    {/* Reconhecimento da área */}
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Reconhecimento da área imediata e mediata</Text>
                        <FileUpload
                            value={arquivosReconhecimentoArea}
                            onChange={setArquivosReconhecimentoArea}
                        />
                        <VoiceInput value={reconhecimentoArea} onChangeText={setReconhecimentoArea} />
                    </View>

                    {/* Condições ambientais */}
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Condições ambientais</Text>
                        <Text>Descreva as condições como: barulho, fumaça, iluminação e etc</Text>
                        <VoiceInput value={condicoesAmbientais} onChangeText={setCondicoesAmbientais} />
                    </View>

                    {/* Características do local */}
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Características do local</Text>
                        <Text>Condições especiais relevantes</Text>
                        <VoiceInput value={caracteristicasLocal} onChangeText={setCaracteristicasLocal} />
                    </View>

                    {/* Informações do fato */}
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Informações do fato</Text>
                        <Text>Você pode informar testemunhas, técnico, policial e etc</Text>

                        {informacoes.map((item, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Informação ${index + 1}`}
                                    placeholder="Informe"
                                    value={item.descricao}
                                    onChangeText={(text) => atualizarCampo(setInformacoes, index, 'descricao', text)}
                                />

                                <VoiceInput
                                    value={item.observacao}
                                    onChangeText={(text) => atualizarCampo(setInformacoes, index, 'observacao', text)}
                                />

                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover informação"
                                        onPress={() => removerCampo(setInformacoes, index)}
                                    />
                                )}
                            </View>
                        ))}

                        <AddButton
                            label="Adicionar outra informação"
                            onPress={() =>
                                adicionarCampo(setInformacoes, { descricao: '', observacao: '' })
                            }
                        />
                    </View>

                </View>
            </PrimaryList>


            <PrimaryList title="4. Análise preliminar de risco (APR)" respondido={!!riscoRespondido}>
                <View style={styles.campos}>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Composição da Equipe</Text>
                        <PrimaryInput
                            label="Perito responsável"
                            placeholder="Informe"
                            value={riscoAPR.peritoResponsavel}
                            onChangeText={(text) => setRiscoAPR({ ...riscoAPR, peritoResponsavel: text })}
                        />
                        <PrimaryInput
                            label="Matrícula"
                            placeholder="Informe"
                            value={riscoAPR.peritoMatricula}
                            onChangeText={(text) => setRiscoAPR({ ...riscoAPR, peritoMatricula: text })}
                        />
                    </View>

                    <View style={styles.campoInterno}>
                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.titulos}>Peritos auxiliares</Text>
                            {peritoAuxiliar.map((auxiliar, index) => (
                                <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                    <PrimaryInput
                                        label={`Perito auxiliar ${index + 1}`}
                                        placeholder="Informe o nome"
                                        value={auxiliar.nome}
                                        onChangeText={(text) => {
                                            const copia = [...peritoAuxiliar];
                                            copia[index].nome = text;
                                            setPeritoAuxiliar(copia);
                                        }}
                                    />
                                    <PrimaryInput
                                        label="Matrícula"
                                        placeholder="Informe a matrícula"
                                        value={auxiliar.matricula}
                                        onChangeText={(text) => {
                                            const copia = [...peritoAuxiliar];
                                            copia[index].matricula = text;
                                            setPeritoAuxiliar(copia);
                                        }}
                                    />
                                    {index > 0 && (
                                        <RemoveButton
                                            label="Remover perito auxiliar"
                                            onPress={() =>
                                                setPeritoAuxiliar((prev) => prev.filter((_, i) => i !== index))
                                            }
                                        />
                                    )}
                                </View>
                            ))}
                            <AddButton
                                label="Adicionar outro perito auxiliar"
                                onPress={() =>
                                    setPeritoAuxiliar((prev) => [...prev, { nome: '', matricula: '' }])
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Técnicos</Text>
                        {tecnico.map((item, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Técnico ${index + 1}`}
                                    placeholder="Informe o nome"
                                    value={item.nome}
                                    onChangeText={(text) => {
                                        const copia = [...tecnico];
                                        copia[index].nome = text;
                                        setTecnico(copia);
                                    }}
                                />
                                <PrimaryInput
                                    label="Matrícula"
                                    placeholder="Informe a matrícula"
                                    value={item.matricula}
                                    onChangeText={(text) => {
                                        const copia = [...tecnico];
                                        copia[index].matricula = text;
                                        setTecnico(copia);
                                    }}
                                />
                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover técnico"
                                        onPress={() =>
                                            setTecnico((prev) => prev.filter((_, i) => i !== index))
                                        }
                                    />
                                )}
                            </View>
                        ))}
                        <AddButton
                            label="Adicionar outro técnico"
                            onPress={() => setTecnico((prev) => [...prev, { nome: '', matricula: '' }])}
                        />
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Outros</Text>
                        {outros.map((item, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Outros ${index + 1}`}
                                    placeholder="Informe o nome"
                                    value={item.nome}
                                    onChangeText={(text) => {
                                        const copia = [...outros];
                                        copia[index].nome = text;
                                        setOutros(copia);
                                    }}
                                />
                                <PrimaryInput
                                    label="Matrícula"
                                    placeholder="Informe a matrícula"
                                    value={item.matricula}
                                    onChangeText={(text) => {
                                        const copia = [...outros];
                                        copia[index].matricula = text;
                                        setOutros(copia);
                                    }}
                                />
                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover"
                                        onPress={() =>
                                            setOutros((prev) => prev.filter((_, i) => i !== index))
                                        }
                                    />
                                )}
                            </View>
                        ))}
                        <AddButton
                            label="Adicionar outros"
                            onPress={() => setOutros((prev) => [...prev, { nome: '', matricula: '' }])}
                        />
                    </View>

                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Detalhamento das Etapas do Trabalho</Text>
                        <Text>Descrição da atividade</Text>

                        <View style={styles.campoInterno}>
                            <Text style={styles.titulos}>Identificação do Risco</Text>

                            <PrimarySelect
                                label="Risco de acidente"
                                selected={riscoAPR.riscoAcidente}
                                onSelect={(value) => setRiscoAPR({ ...riscoAPR, riscoAcidente: value })}
                                placeholder="Selecione"
                                options={['Queda', 'Lesão', 'Choque elétrico']}
                            />

                            <PrimarySelect
                                label="Risco físico"
                                selected={riscoAPR.riscoFisico}
                                onSelect={(value) => setRiscoAPR({ ...riscoAPR, riscoFisico: value })}
                                placeholder="Selecione"
                                options={['Temperatura', 'Vibração', 'Irradiação', 'Ruído', 'Pressão', 'Umidade']}
                            />

                            <Text style={styles.textos}>Tipo de Risco</Text>

                            <View style={styles.checkboxRow}>
                                <CheckBox
                                    checked={riscoAPR.riscoQuimico}
                                    onPress={() => setRiscoAPR({ ...riscoAPR, riscoQuimico: !riscoAPR.riscoQuimico })}
                                />
                                <Text style={styles.checkboxLabel}>Risco Químico</Text>
                            </View>

                            <View style={styles.checkboxRow}>
                                <CheckBox
                                    checked={riscoAPR.riscoBiologico}
                                    onPress={() => setRiscoAPR({ ...riscoAPR, riscoBiologico: !riscoAPR.riscoBiologico })}
                                />
                                <Text style={styles.checkboxLabel}>Risco Biológico</Text>
                            </View>
                        </View>

                        <View style={styles.campoInterno}>
                            <Text style={styles.titulos}>Avaliação do risco</Text>

                            <PrimarySelect
                                label="Gravidade"
                                selected={riscoAPR.gravidade}
                                onSelect={(value) => setRiscoAPR({ ...riscoAPR, gravidade: value })}
                                placeholder="Selecione"
                                options={['Baixo', 'Moderado', 'Alto']}
                            />

                            <PrimarySelect
                                label="Probabilidade"
                                selected={riscoAPR.probabilidade}
                                onSelect={(value) => setRiscoAPR({ ...riscoAPR, probabilidade: value })}
                                placeholder="Selecione"
                                options={['Baixa', 'Moderada', 'Alta']}
                            />
                        </View>

                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.titulos}>Medidas Mitigatórias</Text>
                            <PrimaryInput
                                label="(Isolamento do Local, uso de EPI, EPC;)"
                                placeholder="Informe"
                                value={riscoAPR.medidasMitigatoria}
                                onChangeText={(text) => setRiscoAPR({ ...riscoAPR, medidasMitigatoria: text })}
                            />
                        </View>
                    </View>
                </View>
            </PrimaryList>


            <PrimaryList
                title="5. Exames"
                respondido={!!examesRespondido}
            >
                <View style={styles.campoInternoSecundario}>
                    <View style={styles.campoInterno}>
                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.titulos}>5.1 Documentação</Text>
                            <Text style={styles.textos}>Croqui (detalhamento ou observações)</Text>
                            <CroquiModal />

                            <Text style={styles.textos}>Registros</Text>
                            <AddButton
                                label={mostrarRegistros ? 'Ocultar registros' : 'Adicionar registros'}
                                icon={mostrarRegistros ? 'minus' : 'plus'}
                                onPress={() => setMostrarRegistros(prev => !prev)}
                            />

                            {mostrarRegistros && (
                                <>
                                    <PrimaryInput
                                        label="Projetos"
                                        placeholder="Informe"
                                        value={documentacao.projetos}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, projetos: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.projetosArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, projetosArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Memorial de Cálculo"
                                        placeholder="Informe"
                                        value={documentacao.memorialCalculo}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, memorialCalculo: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.memorialCalculoArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, memorialCalculoArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Licenças e Alvará"
                                        placeholder="Informe"
                                        value={documentacao.licencaAlvara}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, licencaAlvara: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.licencaAlvaraArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, licencaAlvaraArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="ART"
                                        placeholder="Informe"
                                        value={documentacao.art}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, art: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.artArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, artArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Plano de Manutenção"
                                        placeholder="Informe"
                                        value={documentacao.planoManutencao}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, planoManutencao: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.planoManutencaoArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, planoManutencaoArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Contrato de Manutenção"
                                        placeholder="Informe"
                                        value={documentacao.contratoManutencao}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, contratoManutencao: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.contratoManutencaoArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, contratoManutencaoArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Registro de manutenção"
                                        placeholder="Informe"
                                        value={documentacao.registroManutencao}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, registroManutencao: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.registroManutencaoArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, registroManutencaoArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Relatório de Inspeção Anual – RIA"
                                        placeholder="Informe"
                                        value={documentacao.relatorioRia}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, relatorioRia: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.relatorioRiaArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, relatorioRiaArquivos: arquivos })}
                                    />

                                    <PrimaryInput
                                        label="Outro (especificar)"
                                        placeholder="Informe"
                                        value={documentacao.outro}
                                        onChangeText={(text) => setDocumentacao({ ...documentacao, outro: text })}
                                    />
                                    <FileUpload
                                        value={documentacao.outroArquivos}
                                        onChange={(arquivos) => setDocumentacao({ ...documentacao, outroArquivos: arquivos })}
                                    />
                                </>
                            )}

                            <Text style={styles.textos}>Observações</Text>
                            <VoiceInput
                                value={observacoesDocumentacao}
                                onChangeText={setObservacoesDocumentacao}
                            />

                            {vestigiosDocumentacao.map((vestigio, index) => (
                                <ResumoVestigio
                                    key={index}
                                    index={index}
                                    vestigio={vestigio}
                                    onVisualizar={() => handleVisualizarVestigio(vestigio, index)}
                                    onRemover={() => {
                                        const copia = [...vestigiosDocumentacao];
                                        copia.splice(index, 1);
                                        setVestigiosDocumentacao(copia);
                                    }}
                                />
                            ))}

                            <AddButton
                                label="Adicionar vestígio"
                                onPress={() => {
                                    const origem = 'documentacao'; // ou 'equipamentos', 'entrevistas', etc

                                    const novoIndex = dadosPreliminares[origem]?.length || 0;

                                    setDadosPreliminares(prev => ({
                                        ...prev,
                                        [origem]: [
                                            ...(prev[origem] || []),
                                            {
                                                numeroVestigio: '',
                                                unidadeOrigem: '',
                                                procedimento: '',
                                                naturezaVestigio: '',
                                                naturezaOutros: '',
                                                descricaoDetalhada: '',
                                                descricaoDetalhadaArquivos: [],
                                            },
                                        ],
                                    }));

                                    setAcondicionamento(prev => ({
                                        ...prev,
                                        [origem]: [
                                            ...(prev[origem] || []),
                                            {
                                                responsavelColeta: '',
                                                matricula: '',
                                                tipoAcondicionamento: '',
                                                tipoAcondicionamentoOutros: '',
                                                numeroLacre: '',
                                                arquivos: [],
                                                localizacao: undefined,
                                            },
                                        ],
                                    }));

                                    setVestigioIndex(novoIndex);
                                    setOrigemVestigio(origem);
                                    setModalVestigioVisible(true);
                                }}
                            />

                        </View>
                    </View>


                    <View style={styles.campoInternoSecundario}>
                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.titulos}>5.2 Equipamentos</Text>
                            <View style={styles.campoInterno}>
                                <View style={styles.nivel1}>

                                    <View style={styles.sectionSpacing}>
                                        <PrimaryList title="7.1 Casa de Máquinas">
                                            <View style={styles.campos}>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Máquina de tração"
                                                        buttonLabel="Máquina de tração"
                                                        campos={inspecaoCampos.maquinaTracao}
                                                        valor={maquinaTracao}
                                                        onChange={setMaquinaTracao}
                                                    />
                                                </View>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Limitador de Velocidade"
                                                        buttonLabel="Limitador de Velocidade"
                                                        campos={inspecaoCampos.limitadorVelocidade}
                                                        valor={limitadorVelocidade}
                                                        onChange={setLimitadorVelocidade}
                                                    />
                                                </View>
                                            </View>
                                        </PrimaryList>
                                    </View>


                                    <View style={styles.sectionSpacing}>
                                        <PrimaryList title="7.2 Cabos e Contrapeso">
                                            <View style={styles.campos}>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Cabos"
                                                        buttonLabel="Cabos"
                                                        campos={inspecaoCampos.cabos}
                                                        valor={cabos}
                                                        onChange={setCabos}
                                                    />
                                                </View>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Contrapeso"
                                                        buttonLabel="Contrapeso"
                                                        campos={inspecaoCampos.contrapeso}
                                                        valor={contrapeso}
                                                        onChange={setContrapeso}
                                                    />
                                                </View>
                                            </View>
                                        </PrimaryList>
                                    </View>


                                    <View style={styles.sectionSpacing}>
                                        <PrimaryList title="7.3 Cabine e Portas">
                                            <View style={styles.campos}>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Cabine"
                                                        buttonLabel="Cabine"
                                                        campos={inspecaoCampos.cabine}
                                                        valor={cabine}
                                                        onChange={setCabine}
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Portas"
                                                        buttonLabel="Portas"
                                                        campos={inspecaoCampos.portas}
                                                        valor={portas}
                                                        onChange={setPortas}
                                                    />
                                                </View>
                                            </View>
                                        </PrimaryList>
                                    </View>


                                    <View style={styles.sectionSpacing}>
                                        <PrimaryList title="7.4 Freios de Emergência">
                                            <View style={styles.campos}>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Freios de Emergência"
                                                        buttonLabel="Freios de Emergência"
                                                        campos={inspecaoCampos.freiosEmergencia}
                                                        valor={freiosEmergencia}
                                                        onChange={setFreiosEmergencia}
                                                    />
                                                </View>
                                            </View>
                                        </PrimaryList>
                                    </View>


                                    <View style={styles.sectionSpacing}>
                                        <PrimaryList title="7.5 Quadro de Comando">
                                            <View style={styles.campos}>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Sistema de Controle"
                                                        buttonLabel="Sistema de Controle"
                                                        campos={inspecaoCampos.sistemaControle}
                                                        valor={sistemaControle}
                                                        onChange={setSistemaControle}
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Sistema Elétrico"
                                                        buttonLabel="Sistema Elétrico"
                                                        campos={inspecaoCampos.sistemaEletrico}
                                                        valor={sistemaEletrico}
                                                        onChange={setSistemaEletrico}
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Sensores"
                                                        buttonLabel="Sensores"
                                                        campos={inspecaoCampos.sensores}
                                                        valor={sensores}
                                                        onChange={setSensores}
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Poço do Elevador"
                                                        buttonLabel="Poço do Elevador"
                                                        campos={inspecaoCampos.pocoElevador}
                                                        valor={pocoElevador}
                                                        onChange={setPocoElevador}
                                                    />
                                                </View>

                                            </View>
                                        </PrimaryList>
                                    </View>


                                </View>

                                {vestigiosEquipamentos.map((vestigio, index) => (
                                    <ResumoVestigio
                                        key={index}
                                        index={index}
                                        vestigio={vestigio}
                                        onVisualizar={() => handleVisualizarVestigio(vestigio, index)}
                                        onRemover={() => {
                                            const copia = [...vestigiosEquipamentos];
                                            copia.splice(index, 1);
                                            setVestigiosEquipamentos(copia);
                                        }}
                                    />
                                ))}


                                <AddButton
                                    label="Adicionar vestígio"
                                    onPress={() => {
                                        const origem = 'equipamentos';
                                        const novoIndex = dadosPreliminares[origem]?.length || 0;

                                        setDadosPreliminares(prev => ({
                                            ...prev,
                                            [origem]: [
                                                ...(prev[origem] || []),
                                                {
                                                    numeroVestigio: '',
                                                    unidadeOrigem: '',
                                                    procedimento: '',
                                                    naturezaVestigio: '',
                                                    naturezaOutros: '',
                                                    descricaoDetalhada: '',
                                                    descricaoDetalhadaArquivos: [],
                                                },
                                            ],
                                        }));

                                        setAcondicionamento(prev => ({
                                            ...prev,
                                            [origem]: [
                                                ...(prev[origem] || []),
                                                {
                                                    responsavelColeta: '',
                                                    matricula: '',
                                                    tipoAcondicionamento: '',
                                                    tipoAcondicionamentoOutros: '',
                                                    numeroLacre: '',
                                                    arquivos: [],
                                                    localizacao: undefined,
                                                },
                                            ],
                                        }));

                                        setVestigioIndex(novoIndex);
                                        setOrigemVestigio(origem);
                                        setModalVestigioVisible(true);
                                    }}
                                />



                            </View>

                            <View style={styles.campoInterno}>
                                <Text style={styles.titulos}>5.3 Entrevistas</Text>

                                {depoimentos.map((item, index) => (
                                    <DepoimentoItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        onUpdate={(i, novoItem) => {
                                            const copia = [...depoimentos];
                                            copia[i] = novoItem;
                                            setDepoimentos(copia);
                                        }}
                                        onRemove={() => {
                                            setDepoimentos((prev) => prev.filter((_, i) => i !== index));
                                        }}
                                    />
                                ))}

                                <AddButton
                                    label="Adicionar outra entrevista"
                                    onPress={() =>
                                        setDepoimentos((prev) => [
                                            ...prev,
                                            {
                                                tipoEntrevistado: '',
                                                genero: '',
                                                nomeEntrevistado: '',
                                                identificacao: '',
                                                endereco: '',
                                                idade: '',
                                                descricaoLesoes: '',
                                                depoimentoRelato: '',
                                                arquivoLesoes: [],
                                            },
                                        ])
                                    }
                                />

                                {vestigiosEntrevistas.map((vestigio, index) => (
                                    <ResumoVestigio
                                        key={index}
                                        index={index}
                                        vestigio={vestigio}
                                        onVisualizar={() => handleVisualizarVestigio(vestigio, index)}
                                        onRemover={() => {
                                            const copia = [...vestigiosEntrevistas];
                                            copia.splice(index, 1);
                                            setVestigiosEntrevistas(copia);
                                        }}
                                    />
                                ))}

                                <AddButton
                                    label="Adicionar vestígio"
                                    onPress={() => {
                                        const origem = 'entrevistas';
                                        const novoIndex = dadosPreliminares[origem]?.length || 0;

                                        setDadosPreliminares(prev => ({
                                            ...prev,
                                            [origem]: [
                                                ...(prev[origem] || []),
                                                {
                                                    numeroVestigio: '',
                                                    unidadeOrigem: '',
                                                    procedimento: '',
                                                    naturezaVestigio: '',
                                                    naturezaOutros: '',
                                                    descricaoDetalhada: '',
                                                    descricaoDetalhadaArquivos: [],
                                                },
                                            ],
                                        }));

                                        setAcondicionamento(prev => ({
                                            ...prev,
                                            [origem]: [
                                                ...(prev[origem] || []),
                                                {
                                                    responsavelColeta: '',
                                                    matricula: '',
                                                    tipoAcondicionamento: '',
                                                    tipoAcondicionamentoOutros: '',
                                                    numeroLacre: '',
                                                    arquivos: [],
                                                    localizacao: undefined,
                                                },
                                            ],
                                        }));

                                        setVestigioIndex(novoIndex);
                                        setOrigemVestigio(origem);
                                        setModalVestigioVisible(true);
                                    }}
                                />

                            </View>


                            <View style={styles.campoInternoSecundario}>
                                <Text style={styles.titulos}>5.4. Perinecroscopia</Text>

                                <Text style={styles.textos}>Caracterização do Cadáver</Text>
                                <AddButton
                                    label={mostrarPerinecroscopia ? 'Ocultar Perinecroscopia' : 'Adicionar Perinecroscopia'}
                                    icon={mostrarPerinecroscopia ? 'minus' : 'plus'}
                                    onPress={() => setMostrarPerinecroscopia(prev => !prev)}
                                />


                                {mostrarPerinecroscopia && (
                                    <>

                                        <PrimarySelect
                                            label="Sexo"
                                            selected={cadaverSexo}
                                            onSelect={(value) => setCadaverSexo(value || '')}
                                            placeholder="Selecione"
                                            options={['Masculino', 'Feminino']}
                                        />

                                        <PrimaryInput
                                            label="Cor da pele"
                                            placeholder="Informe"
                                            value={cadaverCorPele}
                                            onChangeText={setCadaverCorPele}
                                        />

                                        <PrimaryInput
                                            label="Características do Cabelo"
                                            placeholder="Informe"
                                            value={cadaverCabelo}
                                            onChangeText={setCadaverCabelo}
                                        />

                                        <PrimaryInput
                                            label="Sinais identificadores (tatuagem)"
                                            placeholder="Informe"
                                            value={cadaverSinaisIdentificadores}
                                            onChangeText={setCadaverSinaisIdentificadores}
                                        />

                                        <PrimaryInput
                                            label="Descrição das vestes e pertences pessoais"
                                            placeholder="Informe"
                                            value={cadaverDescricaoVestes}
                                            onChangeText={setCadaverDescricaoVestes}
                                        />

                                        <PrimaryInput
                                            label="Outro"
                                            placeholder="Informe"
                                            value={cadaverOutro}
                                            onChangeText={setCadaverOutro}
                                        />

                                        <Text style={styles.titulos}>Análise da disposição do Cadáver</Text>
                                        <FileUpload
                                            value={arquivosDisposicaoCadaver}
                                            onChange={setArquivosDisposicaoCadaver}
                                        />
                                        <VoiceInput
                                            value={analiseDisposicaoCadaver}
                                            onChangeText={setAnaliseDisposicaoCadaver}
                                        />

                                        <Text style={styles.titulos}>Descrição dos sinais tanatológicos</Text>
                                        <FileUpload
                                            value={arquivosTanatologicos}
                                            onChange={setArquivosTanatologicos}
                                        />
                                        <VoiceInput
                                            value={sinaisTanatologicos}
                                            onChangeText={setSinaisTanatologicos}
                                        />

                                        <Text style={styles.titulos}>Descrição das lesões</Text>
                                        <FileUpload
                                            value={arquivosLesoesCadaver}
                                            onChange={setArquivosLesoesCadaver}
                                        />
                                        <VoiceInput
                                            value={descricaoLesoesCadaver}
                                            onChangeText={setDescricaoLesoesCadaver}
                                        />

                                        {vestigiosPerinecroscopia.map((vestigio, index) => (
                                            <ResumoVestigio
                                                key={index}
                                                index={index}
                                                vestigio={vestigio}
                                                onVisualizar={() => handleVisualizarVestigio(vestigio, index)}
                                                onRemover={() => {
                                                    const copia = [...vestigiosPerinecroscopia];
                                                    copia.splice(index, 1);
                                                    setVestigiosPerinecroscopia(copia);
                                                }}
                                            />
                                        ))}

                                        <AddButton
                                            label="Adicionar vestígio"
                                            onPress={() => {
                                                const origem = 'perinecroscopia';
                                                const novoIndex = dadosPreliminares[origem]?.length || 0;

                                                setDadosPreliminares(prev => ({
                                                    ...prev,
                                                    [origem]: [
                                                        ...(prev[origem] || []),
                                                        {
                                                            numeroVestigio: '',
                                                            unidadeOrigem: '',
                                                            procedimento: '',
                                                            naturezaVestigio: '',
                                                            naturezaOutros: '',
                                                            descricaoDetalhada: '',
                                                            descricaoDetalhadaArquivos: [],
                                                        },
                                                    ],
                                                }));

                                                setAcondicionamento(prev => ({
                                                    ...prev,
                                                    [origem]: [
                                                        ...(prev[origem] || []),
                                                        {
                                                            responsavelColeta: '',
                                                            matricula: '',
                                                            tipoAcondicionamento: '',
                                                            tipoAcondicionamentoOutros: '',
                                                            numeroLacre: '',
                                                            arquivos: [],
                                                            localizacao: undefined,
                                                        },
                                                    ],
                                                }));

                                                setVestigioIndex(novoIndex);
                                                setOrigemVestigio(origem);
                                                setModalVestigioVisible(true);
                                            }}
                                        />

                                    </>
                                )}

                            </View>


                            {origemVestigio && (
                                <>
                                    <Modal
                                        isVisible={modalVestigioVisible}
                                        onBackdropPress={() => setModalVestigioVisible(false)}
                                        onBackButtonPress={() => setModalVestigioVisible(false)}
                                        animationIn="slideInUp"
                                        animationOut="slideOutDown"
                                        style={{ margin: 0, justifyContent: 'flex-end', backgroundColor: '#fff' }}
                                    >
                                        <ScrollView style={{ padding: 16, backgroundColor: '#fff' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                                <Text style={[styles.titulos, { flex: 1 }]}>Vestígio - Coleta ({origemLabels[origemVestigio]})</Text>
                                                <TouchableOpacity onPress={() => setModalVestigioVisible(false)}>
                                                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>✕</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.campoInterno}>
                                                <View style={{ marginBottom: 12, gap: 12 }}>
                                                    <Text style={styles.titulos}>Dados preliminares</Text>

                                                    <PrimaryInput
                                                        label="Nº do vestígio"
                                                        placeholder="Informe"
                                                        value={dadosPreliminares[origemVestigio][vestigioIndex]?.numeroVestigio || ''}
                                                        onChangeText={(text) => {
                                                            setDadosPreliminares((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], numeroVestigio: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <PrimaryInput
                                                        label="Unidade de Origem"
                                                        placeholder="Informe"
                                                        value={dadosPreliminares[origemVestigio][vestigioIndex]?.unidadeOrigem || ''}
                                                        onChangeText={(text) => {
                                                            setDadosPreliminares((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], unidadeOrigem: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <PrimaryInput
                                                        label="Nº do Procedimento (IP/TCO/Outros)"
                                                        placeholder="Informe"
                                                        value={dadosPreliminares[origemVestigio][vestigioIndex]?.procedimento || ''}
                                                        onChangeText={(text) => {
                                                            setDadosPreliminares((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], procedimento: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <PrimarySelect
                                                        label="Natureza do Vestígio"
                                                        selected={dadosPreliminares[origemVestigio][vestigioIndex]?.naturezaVestigio || ''}
                                                        onSelect={(value) => {
                                                            const safeValue = value || '';
                                                            setDadosPreliminares((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], naturezaVestigio: safeValue };
                                                                if (safeValue !== 'Outros') lista[vestigioIndex].naturezaOutros = '';
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                        placeholder="Selecione"
                                                        options={['Biológico', 'Documental', 'Equipamento', 'Material', 'Mídia de armazenamento', 'Cadáver', 'Outros']}
                                                    />

                                                    {dadosPreliminares[origemVestigio][vestigioIndex]?.naturezaVestigio === 'Outros' && (
                                                        <PrimaryInput
                                                            label="Descreva a natureza"
                                                            placeholder="Informe"
                                                            value={dadosPreliminares[origemVestigio][vestigioIndex]?.naturezaOutros || ''}
                                                            onChangeText={(text) => {
                                                                setDadosPreliminares((prev) => {
                                                                    const copia = { ...prev };
                                                                    const lista = [...(copia[origemVestigio] || [])];
                                                                    lista[vestigioIndex] = { ...lista[vestigioIndex], naturezaOutros: text };
                                                                    copia[origemVestigio] = lista;
                                                                    return copia;
                                                                });
                                                            }}
                                                        />
                                                    )}

                                                    <Text style={styles.textos}>Descrição Detalhada do(s) Vestígio(s)</Text>
                                                    <Text>Quantidades, características, numerações, estado de conservação, possíveis danos, etc</Text>

                                                    <VoiceInput
                                                        value={dadosPreliminares[origemVestigio][vestigioIndex]?.descricaoDetalhada || ''}
                                                        onChangeText={(text) => {
                                                            setDadosPreliminares((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], descricaoDetalhada: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <FileUpload
                                                        value={dadosPreliminares[origemVestigio][vestigioIndex]?.descricaoDetalhadaArquivos || []}
                                                        onChange={(arquivos) => {
                                                            setDadosPreliminares((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], descricaoDetalhadaArquivos: arquivos };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                            <View style={styles.campoInternoSecundario}>
                                                <View style={{ marginBottom: 12, gap: 12 }}>
                                                    <Text style={styles.titulos}>Coleta/Acondicionamento</Text>

                                                    <PrimaryInput
                                                        label="Responsável pela coleta"
                                                        placeholder="Informe"
                                                        value={acondicionamento[origemVestigio][vestigioIndex]?.responsavelColeta || ''}
                                                        onChangeText={(text) => {
                                                            setAcondicionamento((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], responsavelColeta: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <PrimaryInput
                                                        label="Matrícula"
                                                        placeholder="Informe"
                                                        value={acondicionamento[origemVestigio][vestigioIndex]?.matricula || ''}
                                                        onChangeText={(text) => {
                                                            setAcondicionamento((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], matricula: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <LocationButton
                                                        value={acondicionamento[origemVestigio][vestigioIndex]?.localizacao || null}
                                                        onChange={(loc) => {
                                                            setAcondicionamento((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], localizacao: loc };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <PrimarySelect
                                                        label="Tipo de acondicionamento"
                                                        selected={acondicionamento[origemVestigio][vestigioIndex]?.tipoAcondicionamento || ''}
                                                        onSelect={(value) => {
                                                            const safeValue = value || '';
                                                            setAcondicionamento((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = {
                                                                    ...lista[vestigioIndex],
                                                                    tipoAcondicionamento: safeValue,
                                                                    tipoAcondicionamentoOutros: safeValue !== 'Outros' ? '' : lista[vestigioIndex].tipoAcondicionamentoOutros,
                                                                };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                        placeholder="Selecione"
                                                        options={['Saco plástico', 'Frasco', 'Caixa térmica', 'Outros']}
                                                    />

                                                    {acondicionamento[origemVestigio][vestigioIndex]?.tipoAcondicionamento === 'Outros' && (
                                                        <PrimaryInput
                                                            label="Descreva o tipo de acondicionamento"
                                                            placeholder="Informe"
                                                            value={acondicionamento[origemVestigio][vestigioIndex]?.tipoAcondicionamentoOutros || ''}
                                                            onChangeText={(text) => {
                                                                setAcondicionamento((prev) => {
                                                                    const copia = { ...prev };
                                                                    const lista = [...(copia[origemVestigio] || [])];
                                                                    lista[vestigioIndex] = { ...lista[vestigioIndex], tipoAcondicionamentoOutros: text };
                                                                    copia[origemVestigio] = lista;
                                                                    return copia;
                                                                });
                                                            }}
                                                        />
                                                    )}

                                                    <PrimaryInput
                                                        label="Nº do lacre/ Invólucro de segurança"
                                                        placeholder="Informe"
                                                        value={acondicionamento[origemVestigio][vestigioIndex]?.numeroLacre || ''}
                                                        onChangeText={(text) => {
                                                            setAcondicionamento((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], numeroLacre: text };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />

                                                    <FileUpload
                                                        value={acondicionamento[origemVestigio][vestigioIndex]?.arquivos || []}
                                                        onChange={(arquivos) => {
                                                            setAcondicionamento((prev) => {
                                                                const copia = { ...prev };
                                                                const lista = [...(copia[origemVestigio] || [])];
                                                                lista[vestigioIndex] = { ...lista[vestigioIndex], arquivos: arquivos };
                                                                copia[origemVestigio] = lista;
                                                                return copia;
                                                            });
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>

                                        <View style={styles.modalVestigio}>
                                            <TouchableOpacity
                                                style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#ccc' }}
                                                onPress={() => setModalVestigioVisible(false)}
                                            >
                                                <Text style={{ color: '#333' }}>Cancelar</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#0066cc' }}
                                                onPress={handleAvancarVestigio}
                                            >
                                                <Text style={{ color: '#fff' }}>Avançar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                </>
                            )}


                        </View>
                    </View>
                </View>
            </PrimaryList>

            <View style={{ width: '100%', gap: 10, bottom: 0, }}>
                <MainButton title="Finalizar" onPress={handleSave} />
                <MainButton title="Cancelar" type="secondary" />
            </View>

            <FeedbackModal
                visible={feedbackVisible}
                type={feedbackType}
                message={feedbackMessage}
                onClose={() => setFeedbackVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        gap: 10,
        paddingHorizontal: 1,
        width: "100%",
    },
    titulos: {
        color: "#000",
        fontWeight: '600',
        fontSize: fontSize.label,
    },
    textos: {
        color: colors.primaryDark,
        fontSize: fontSize.label,
        paddingTop: 5,
    },
    campoInterno: {
        gap: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D0CECE",
        borderStyle: "dashed",
        paddingBottom: 20,
    },
    campoInternoSecundario: {
        gap: 15,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    checkboxLabel: {
        fontSize: fontSize.placeholder,
        color: colors.primaryDark,
    },
    nivel1: {
        padding: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginBottom: 16,
    },

    nivel2: {
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    subsecao: {
        gap: 16,
    },

    tituloGrupo: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primaryDark,
        marginTop: 12,
    },

    campoObservacao: {
        marginBottom: 20,
        gap: 12,
    },
    sectionSpacing: {
        marginBottom: 16,
    },
    modalVestigio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 5

    },
    campos: {}

});