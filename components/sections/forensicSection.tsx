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
    const [origemVestigio, setOrigemVestigio] = useState<'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia' | null>(null);

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

    const [vestigioTemp, setVestigioTemp] = useState({
        numeroVestigio: '',
        unidadeOrigem: '',
        procedimento: '',
        naturezaVestigio: '',
        naturezaOutros: '',
        descricaoDetalhada: '',
        responsavelColeta: '',
        matricula: '',
        tipoAcondicionamento: '',
        tipoAcondicionamentoOutros: '',
        numeroLacre: '',
    });

    type VestigioResumo = {
        numeroVestigio: string;
        naturezaVestigio: string;
        origem: 'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia';
        dadosCompletos: {
            dadosPreliminares: {
                numeroVestigio: string;
                unidadeOrigem: string;
                procedimento: string;
                naturezaVestigio: string;
                naturezaOutros: string;
                descricaoDetalhada: string;
            }[];
            acondicionamento: {
                responsavelColeta: string;
                matricula: string;
                tipoAcondicionamento: string;
                tipoAcondicionamentoOutros: string;
                numeroLacre: string;
            }[];
        };
    };

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
            };

            await saveForensicModular(payload);
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

    function handleVisualizarVestigio(vestigio: VestigioResumo) {
        setVestigioSelecionado(vestigio);
        setOrigemVestigio(vestigio.origem);
        setModalVestigioVisible(true);
    }

    const handleAvancarVestigio = () => {
        const resumoVestigio: VestigioResumo = {
            numeroVestigio: dadosPreliminares[0].numeroVestigio,
            naturezaVestigio: dadosPreliminares[0].naturezaVestigio,
            origem: origemVestigio as 'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia',
            dadosCompletos: {
                dadosPreliminares,
                acondicionamento,
            },
        };

        if (origemVestigio === 'equipamentos') {
            setVestigiosEquipamentos(prev => [...prev, resumoVestigio]);
        } else if (origemVestigio === 'entrevistas') {
            setVestigiosEntrevistas(prev => [...prev, resumoVestigio]);
        } else if (origemVestigio === 'documentacao') {
            setVestigiosDocumentacao(prev => [...prev, resumoVestigio]);
        } else if (origemVestigio === 'perinecroscopia') {
            setVestigiosPerinecroscopia(prev => [...prev, resumoVestigio]);
        }

        setModalVestigioVisible(false);
    };

    const origemLabels: Record<'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia', string> = {
        equipamentos: 'Equipamentos',
        entrevistas: 'Entrevistas',
        documentacao: 'Documentação',
        perinecroscopia: 'Perinecroscopia',
    };

    const respondidoMateriais =
  materiaisSelecionados.length > 0 ||
  !!materialOutroDescricao?.trim();

    return (
        <View style={styles.section}>
            <PrimaryList
                title="1. Dados iniciais"
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

                        <LocationButton />

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
                respondido={respondidoMateriais}
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


            <PrimaryList title="3. Análise preliminar do local">
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


            <PrimaryList title="4. Análise preliminar de risco (APR)">
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
                                    onVisualizar={() => handleVisualizarVestigio(vestigio)}
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
                                    setOrigemVestigio('documentacao');
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
                                        onVisualizar={() => handleVisualizarVestigio(vestigio)}
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
                                        setOrigemVestigio('equipamentos');
                                        setModalVestigioVisible(true);
                                    }}
                                />


                            </View>

                            <View style={styles.campoInterno}>
                                <Text style={styles.titulos}>5.3 Entrevistas</Text>

                                {depoimentos.map((item, index) => (
                                    <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                        <Text style={styles.titulos}>Registro e análise de depoimentos {index + 1}</Text>

                                        <PrimarySelect
                                            label="Tipo do entrevistado"
                                            selected={item.tipoEntrevistado}
                                            onSelect={(value) => {
                                                const copia = [...depoimentos];
                                                copia[index].tipoEntrevistado = value;

                                                if (value !== 'Vítimas sobreviventes') {
                                                    copia[index].genero = '';
                                                    copia[index].idade = '';
                                                    copia[index].descricaoLesoes = '';
                                                }

                                                setDepoimentos(copia);
                                            }}
                                            placeholder="Selecione"
                                            options={[
                                                'Vítimas sobreviventes',
                                                'Testemunhas',
                                                'Síndico/Administrador',
                                                'Zelador',
                                                'Técnicos de manutenção',
                                            ]}
                                        />

                                        {item.tipoEntrevistado !== '' && (
                                            <>
                                                <PrimaryInput
                                                    label="Nome"
                                                    placeholder="Informe"
                                                    value={item.nomeEntrevistado}
                                                    onChangeText={(text) => {
                                                        const copia = [...depoimentos];
                                                        copia[index].nomeEntrevistado = text;
                                                        setDepoimentos(copia);
                                                    }}
                                                />

                                                <PrimaryInput
                                                    label="Identificação (CPF, RG)"
                                                    placeholder="Informe"
                                                    value={item.identificacao}
                                                    onChangeText={(text) => {
                                                        const copia = [...depoimentos];
                                                        copia[index].identificacao = text;
                                                        setDepoimentos(copia);
                                                    }}
                                                />

                                                <PrimaryInput
                                                    label="Endereço"
                                                    placeholder="Informe"
                                                    value={item.endereco}
                                                    onChangeText={(text) => {
                                                        const copia = [...depoimentos];
                                                        copia[index].endereco = text;
                                                        setDepoimentos(copia);
                                                    }}
                                                />

                                                {item.tipoEntrevistado === 'Vítimas sobreviventes' && (
                                                    <>
                                                        <PrimarySelect
                                                            label="Sexo"
                                                            selected={item.genero}
                                                            onSelect={(value) => {
                                                                const copia = [...depoimentos];
                                                                copia[index].genero = value;
                                                                setDepoimentos(copia);
                                                            }}
                                                            placeholder="Selecione"
                                                            options={['Masculino', 'Feminino']}
                                                        />

                                                        <PrimaryInput
                                                            label="Idade"
                                                            placeholder="Informe"
                                                            value={item.idade}
                                                            onChangeText={(text) => {
                                                                const copia = [...depoimentos];
                                                                copia[index].idade = text;
                                                                setDepoimentos(copia);
                                                            }}
                                                        />

                                                        <Text style={styles.textos}>Descrição das lesões</Text>
                                                        <VoiceInput
                                                            value={item.descricaoLesoes}
                                                            onChangeText={(text) => {
                                                                const copia = [...depoimentos];
                                                                copia[index].descricaoLesoes = text;
                                                                setDepoimentos(copia);
                                                            }}
                                                        />
                                                        <FileUpload />
                                                    </>
                                                )}

                                                <Text style={styles.textos}>Depoimento/Relato</Text>
                                                <VoiceInput
                                                    value={item.depoimentoRelato}
                                                    onChangeText={(text) => {
                                                        const copia = [...depoimentos];
                                                        copia[index].depoimentoRelato = text;
                                                        setDepoimentos(copia);
                                                    }}
                                                />
                                            </>
                                        )}

                                        {index > 0 && (
                                            <RemoveButton
                                                label="Remover entrevista"
                                                onPress={() => {
                                                    setDepoimentos((prev) => prev.filter((_, i) => i !== index));
                                                }}
                                            />
                                        )}
                                    </View>
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
                                            },
                                        ])
                                    }
                                />

                                {vestigiosEntrevistas.map((vestigio, index) => (
                                    <ResumoVestigio
                                        key={index}
                                        index={index}
                                        vestigio={vestigio}
                                        onVisualizar={() => handleVisualizarVestigio(vestigio)}
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
                                        setOrigemVestigio('entrevistas');
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
                                            onSelect={setCadaverSexo}
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
                                                onVisualizar={() => handleVisualizarVestigio(vestigio)}
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
                                                setOrigemVestigio('perinecroscopia');
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
                                                <Text style={[styles.titulos, { flex: 1 }]}>
                                                    Vestígio - Coleta ({origemVestigio ? origemLabels[origemVestigio] : ''})
                                                </Text>

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
                                                        value={dadosPreliminares[0].numeroVestigio}
                                                        onChangeText={(text) => {
                                                            const copia = [...dadosPreliminares];
                                                            copia[0].numeroVestigio = text;
                                                            setDadosPreliminares(copia);
                                                        }}
                                                    />

                                                    <PrimaryInput
                                                        label="Unidade de Origem"
                                                        placeholder="Informe"
                                                        value={dadosPreliminares[0].unidadeOrigem}
                                                        onChangeText={(text) => {
                                                            const copia = [...dadosPreliminares];
                                                            copia[0].unidadeOrigem = text;
                                                            setDadosPreliminares(copia);
                                                        }}
                                                    />

                                                    <PrimaryInput
                                                        label="Nº do Procedimento (IP/TCO/Outros)"
                                                        placeholder="Informe"
                                                        value={dadosPreliminares[0].procedimento}
                                                        onChangeText={(text) => {
                                                            const copia = [...dadosPreliminares];
                                                            copia[0].procedimento = text;
                                                            setDadosPreliminares(copia);
                                                        }}
                                                    />

                                                    <PrimarySelect
                                                        label="Natureza do Vestígio"
                                                        selected={dadosPreliminares[0].naturezaVestigio}
                                                        onSelect={(value) => {
                                                            const copia = [...dadosPreliminares];
                                                            copia[0].naturezaVestigio = value;
                                                            if (value !== 'Outros') copia[0].naturezaOutros = '';
                                                            setDadosPreliminares(copia);
                                                        }}
                                                        placeholder="Selecione"
                                                        options={['Biológico', 'Documental', 'Equipamento', 'Material', 'Mídia de armazenamento', 'Cadáver', 'Outros']}
                                                    />

                                                    {dadosPreliminares[0].naturezaVestigio === 'Outros' && (
                                                        <PrimaryInput
                                                            label="Descreva a natureza"
                                                            placeholder="Informe"
                                                            value={dadosPreliminares[0].naturezaOutros}
                                                            onChangeText={(text) => {
                                                                const copia = [...dadosPreliminares];
                                                                copia[0].naturezaOutros = text;
                                                                setDadosPreliminares(copia);
                                                            }}
                                                        />
                                                    )}

                                                    <Text style={styles.textos}>Descrição Detalhada do(s) Vestígio(s)</Text>
                                                    <Text>Quantidades, características, numerações, estado de conservação, possíveis danos, etc</Text>

                                                    <VoiceInput
                                                        value={dadosPreliminares[0].descricaoDetalhada}
                                                        onChangeText={(text) => {
                                                            const copia = [...dadosPreliminares];
                                                            copia[0].descricaoDetalhada = text;
                                                            setDadosPreliminares(copia);
                                                        }}
                                                    />

                                                    <FileUpload
                                                        value={dadosPreliminares[0].descricaoDetalhadaArquivos || []}
                                                        onChange={(arquivos) => {
                                                            const copia = [...dadosPreliminares];
                                                            copia[0].descricaoDetalhadaArquivos = arquivos;
                                                            setDadosPreliminares(copia);
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
                                                        value={acondicionamento[0].responsavelColeta}
                                                        onChangeText={(text) => {
                                                            const copia = [...acondicionamento];
                                                            copia[0].responsavelColeta = text;
                                                            setAcondicionamento(copia);
                                                        }}
                                                    />

                                                    <PrimaryInput
                                                        label="Matrícula"
                                                        placeholder="Informe"
                                                        value={acondicionamento[0].matricula}
                                                        onChangeText={(text) => {
                                                            const copia = [...acondicionamento];
                                                            copia[0].matricula = text;
                                                            setAcondicionamento(copia);
                                                        }}
                                                    />

                                                    <LocationButton />

                                                    <PrimarySelect
                                                        label="Tipo de acondicionamento"
                                                        selected={acondicionamento[0].tipoAcondicionamento}
                                                        onSelect={(value) => {
                                                            const copia = [...acondicionamento];
                                                            copia[0].tipoAcondicionamento = value;
                                                            if (value !== 'Outros') copia[0].tipoAcondicionamentoOutros = '';
                                                            setAcondicionamento(copia);
                                                        }}
                                                        placeholder="Selecione"
                                                        options={['Saco plástico', 'Frasco', 'Caixa térmica', 'Outros']}
                                                    />

                                                    {acondicionamento[0].tipoAcondicionamento === 'Outros' && (
                                                        <PrimaryInput
                                                            label="Descreva o tipo de acondicionamento"
                                                            placeholder="Informe"
                                                            value={acondicionamento[0].tipoAcondicionamentoOutros}
                                                            onChangeText={(text) => {
                                                                const copia = [...acondicionamento];
                                                                copia[0].tipoAcondicionamentoOutros = text;
                                                                setAcondicionamento(copia);
                                                            }}
                                                        />
                                                    )}

                                                    <PrimaryInput
                                                        label="Nº do lacre/ Invólucro de segurança"
                                                        placeholder="Informe"
                                                        value={acondicionamento[0].numeroLacre}
                                                        onChangeText={(text) => {
                                                            const copia = [...acondicionamento];
                                                            copia[0].numeroLacre = text;
                                                            setAcondicionamento(copia);
                                                        }}
                                                    />

                                                    <FileUpload
                                                        value={acondicionamento[0].arquivos || []}
                                                        onChange={(arquivos) => {
                                                            const copia = [...acondicionamento];
                                                            copia[0].arquivos = arquivos;
                                                            setAcondicionamento(copia);
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>

                                        <View style={styles.modalVestigio}>
                                            <TouchableOpacity
                                                style={{
                                                    paddingVertical: 12,
                                                    paddingHorizontal: 20,
                                                    borderRadius: 8,
                                                    backgroundColor: '#ccc',
                                                }}
                                                onPress={() => setModalVestigioVisible(false)}
                                            >
                                                <Text style={{ color: '#333' }}>Cancelar</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{
                                                    paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#0066cc',
                                                }}
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
