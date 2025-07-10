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
import MaquinaTracaoDrawer from '../modal/formDrawer';
import FormDrawer from '../modal/formDrawer';

import CroquiModal from '../croqui';
import { ScrollView } from 'react-native-gesture-handler';
import ResumoVestigio from './vestigioSection';
import Modal from 'react-native-modal';


export default function ForensicSection() {
    const {
        dadosIniciais, setDadosIniciais,
        informacoes, setInformacoes,
        peritoAuxiliar, setPeritoAuxiliar,
        equipePericial, setEquipePericial,
        tecnico, setTecnico,
        outros, setOutros,
        dadosPreliminares, setDadosPreliminares,
        acondicionamento, setAcondicionamento,
        documentacao, setDocumentacao,
        depoimentos, setDepoimentos,
        riscoAPR, setRiscoAPR,
        adicionarCampo, atualizarCampo, removerCampo,
        clearFieldError, errors,
        reconhecimentoArea,
        setReconhecimentoArea,
        mensagemInformacoesGerais,
        setMensagemInformacoesGerais,
        mensagemDepoimentos,
        setMensagemDepoimentos,
        mensagemLesoesDepoimentos,
        setMensagemLesoesDepoimentos,
        mensagemRiscoAPR,
        setMensagemRiscoAPR,
        mensagemDescricaoVestigio,
        setMensagemDescricaoVestigio,
        mensagemDescricaoPreliminar,
        setMensagemDescricaoPreliminar,
        mensagemAcondicionamentoOutro,
        setMensagemAcondicionamentoOutro,
        mensagemDocumentacaoOutro,
        setMensagemDocumentacaoOutro,
    } = useForensic();

    const [modalVestigioVisible, setModalVestigioVisible] = useState(false);
    const [origemVestigio, setOrigemVestigio] = useState<'equipamentos' | 'entrevistas' | 'documentacao' | null>(null);

    const [vestigiosEquipamentos, setVestigiosEquipamentos] = useState<VestigioResumo[]>([]);
    const [vestigiosEntrevistas, setVestigiosEntrevistas] = useState<VestigioResumo[]>([]);
    const [vestigiosDocumentacao, setVestigiosDocumentacao] = useState<VestigioResumo[]>([]);

    const [vestigioSelecionado, setVestigioSelecionado] = useState<VestigioResumo | null>(null);


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
        origem: 'equipamentos' | 'entrevistas' | 'documentacao';
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

    function handleVisualizarVestigio(vestigio: VestigioResumo) {
        setVestigioSelecionado(vestigio);
        setOrigemVestigio(vestigio.origem);
        setModalVestigioVisible(true);
    }

    const camposMaquinaTracao = inspecaoCampos.maquinaTracao;

    const [drawerMaquinaTracaoVisible, setDrawerMaquinaTracaoVisible] = useState(false);
    const [preenchidoMaquinaTracao, setPreenchidoMaquinaTracao] = useState(false);

    function handleAvancarVestigio() {
        const resumoVestigio: VestigioResumo = {
            numeroVestigio: dadosPreliminares[0].numeroVestigio,
            naturezaVestigio: dadosPreliminares[0].naturezaVestigio,
            origem: origemVestigio as 'equipamentos' | 'entrevistas' | 'documentacao',
            dadosCompletos: {
                dadosPreliminares,
                acondicionamento,
            },
        };

        if (origemVestigio === 'equipamentos') {
            setVestigiosEquipamentos(prev => [...prev, resumoVestigio]);
        } if (origemVestigio === 'entrevistas') {
            setVestigiosEntrevistas(prev => [...prev, resumoVestigio]);
        } else {
            setVestigiosDocumentacao(prev => [...prev, resumoVestigio]);
        }

        setModalVestigioVisible(false);
    }


    const origemLabels: Record<'equipamentos' | 'entrevistas' | 'documentacao', string> = {
        equipamentos: 'Equipamentos',
        entrevistas: 'Entrevistas',
        documentacao: 'Documentação',
    };



    return (
        <View style={styles.section}>
            <PrimaryList
                title="1. Dados iniciais"
                helperEnabled
                helperTitle="Ajuda"
                helperDescription="Insira as informações referentes ao local onde o equipamento está instalado."
            >
                <View style={styles.campos}>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Perito responsavel</Text>
                        <PrimaryInput
                            label="Nome completo"
                            placeholder="Informe"
                            value={dadosIniciais.peritoResponsavel}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, peritoResponsavel: text })}
                        />
                        <PrimaryInput
                            label="Cargo"
                            placeholder="Informe"
                            value={dadosIniciais.cargoPerito}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, cargoPerito: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Matricula"
                            placeholder="Informe"
                            value={dadosIniciais.matriculaPerito}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, matriculaPerito: text })}
                        />
                    </View>

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
                                    label="Matricula"
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
                                setEquipePericial((prev) => [...prev, { nome: '', cargo: '', matricula: '' }])
                            }
                        />
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Solicitação</Text>

                        <PrimaryInput
                            label="Data e hora"
                            placeholder="Informe"
                            value={dadosIniciais.dataHora.toLocaleString()}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, dataHora: new Date() })}
                        />
                        <PrimaryInput
                            label="Tipo de ocorrencia"
                            placeholder="Informe"
                            value={dadosIniciais.tipoOcorrencia}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, tipoOcorrencia: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Autoridade policial solicitante"
                            placeholder="Informe"
                            value={dadosIniciais.autoridadePolicialNome}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, autoridadePolicialNome: text })}
                        />

                    </View>

                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Atendimento</Text>

                        <LocationButton />
                        <PrimaryInput
                            label="Viatura (placa)"
                            placeholder="Informe"
                            value={dadosIniciais.viatura}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, viatura: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Numero de vitimas (Obitos, feridos)"
                            placeholder="Informe"
                            value={dadosIniciais.numeroVitimas}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, numeroVitimas: text })}
                        />
                        <PrimaryInput
                            label="Condição das vitimas (Obitos, feridos)"
                            placeholder="Informe"
                            value={dadosIniciais.condicaoVitimas}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, condicaoVitimas: text })}
                        />
                        <PrimarySelect
                            label="Autoridade policial no local"
                            selected={dadosIniciais.autoridadePolicial}
                            onSelect={(value) => setDadosIniciais({ ...dadosIniciais, autoridadePolicial: value })}
                            placeholder="Selecione"
                            options={['Sim', 'Não']}
                        />
                    </View>
                </View>
            </PrimaryList>

            <PrimaryList title="2. Materiais, equipamentos, EPI e EPC">
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <MaterialList />
                    </View>
                </View>
            </PrimaryList>

            <PrimaryList title="3. Análise preliminar do local">
                <View style={styles.campos}>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Reconhecimento da área imediata e mediata</Text>
                        <FileUpload />
                        <VoiceInput value={reconhecimentoArea} onChangeText={setReconhecimentoArea} />

                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Condições ambientais</Text>
                        <Text>Descreva as condições como: barulho, fumaça, iluminação e etc</Text>
                        <VoiceInput value={reconhecimentoArea} onChangeText={setReconhecimentoArea} />
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Características do local</Text>
                        <Text>Condições especiais relevantes</Text>
                        <VoiceInput value={reconhecimentoArea} onChangeText={setReconhecimentoArea} />
                    </View>

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

            <PrimaryList
                title="4. Análise preliminar de risco (APR)"
            >
                <View style={styles.campos}>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Composição da Equipe</Text>
                        <PrimaryInput
                            label="Perito responsavel"
                            placeholder="Informe"
                            value={riscoAPR.peritoResponsavel}
                            onChangeText={(text) => setRiscoAPR({ ...riscoAPR, peritoResponsavel: text })}
                        />
                        <PrimaryInput
                            label="Matricula"
                            placeholder="Informe"
                            value={riscoAPR.peritoMatricula}
                            onChangeText={(text) => setRiscoAPR({ ...riscoAPR, peritoMatricula: text })}
                        />
                    </View>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Peritos auxiliares</Text>

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
                            <Text style={styles.titulos}>Avalição do risco</Text>
                            <PrimarySelect label="Gravidade"
                                selected={riscoAPR.gravidade}
                                onSelect={(value) => {
                                    setRiscoAPR({ ...riscoAPR, gravidade: value });
                                }}
                                placeholder="Selecione"
                                options={['Baixo', 'Moderado', 'Alto']} />

                            <PrimarySelect label="Probabilidade"
                                selected={riscoAPR.probabilidade}
                                onSelect={(value) => {
                                    setRiscoAPR({ ...riscoAPR, probabilidade: value });
                                }}
                                placeholder="Selecione"
                                options={['Baixa', 'Moderada', 'Alta']} />
                        </View >

                        <View style={styles.campoInternoSecundario}>
                            <Text style={styles.titulos}>Medidas Mitigatórias</Text>
                            <PrimaryInput
                                label="(Isolamento do Local, uso de EPI, EPC;)"
                                placeholder="Informe"
                                value={riscoAPR.medidasMitigatoria}
                                onChangeText={(text) => setRiscoAPR({ ...riscoAPR, medidasMitigatoria: text })}
                            />
                        </View >
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
                            <Text style={styles.titulos}>Croqui do Local</Text>
                            <CroquiModal />

                            <Text style={styles.titulos}>Registros</Text>

                            <PrimaryInput
                                label="Projetos"
                                placeholder="Informe"
                                value={documentacao.projetos}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, projetos: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Memorial de Cálculo"
                                placeholder="Informe"
                                value={documentacao.memorialCalculo}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, memorialCalculo: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Licenças e Alvará"
                                placeholder="Informe"
                                value={documentacao.licencaAlvara}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, licencaAlvara: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="ART"
                                placeholder="Informe"
                                value={documentacao.art}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, art: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Plano de Manutenção"
                                placeholder="Informe"
                                value={documentacao.planoManutencao}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, planoManutencao: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Contrato de Manutenção"
                                placeholder="Informe"
                                value={documentacao.contratoManutencao}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, contratoManutencao: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Registro de manutenção"
                                placeholder="Informe"
                                value={documentacao.registroManutencao}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, registroManutencao: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Relatório de Inspeção Anual – RIA"
                                placeholder="Informe"
                                value={documentacao.relatorioRia}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, relatorioRia: text })}
                            />
                            <FileUpload />

                            <PrimaryInput
                                label="Outro (especificar)"
                                placeholder="Informe"
                                value={documentacao.outro}
                                onChangeText={(text) => setDocumentacao({ ...documentacao, outro: text })}
                            />

                            <FileUpload />

                            <Text style={styles.titulos}>Observações</Text>

                            <VoiceInput value={reconhecimentoArea} onChangeText={setReconhecimentoArea} />

                            {vestigiosDocumentacao.map((vestigio, index) => (
                                <ResumoVestigio
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
                                                    />
                                                </View>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Limitador de Velocidade"
                                                        buttonLabel="Limitador de Velocidade"
                                                        campos={inspecaoCampos.limitadorVelocidade}
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
                                                    />
                                                </View>
                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Contrapeso"
                                                        buttonLabel="Contrapeso"
                                                        campos={inspecaoCampos.contrapeso}
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
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Portas"
                                                        buttonLabel="Portas"
                                                        campos={inspecaoCampos.portas}
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
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Sistema Elétrico"
                                                        buttonLabel="Sistema Elétrico"
                                                        campos={inspecaoCampos.sistemaEletrico}
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Sensores"
                                                        buttonLabel="Sensores"
                                                        campos={inspecaoCampos.sensores}
                                                    />
                                                </View>

                                                <View style={styles.nivel2}>
                                                    <FormDrawer
                                                        title="Poço do Elevador"
                                                        buttonLabel="Poço do Elevador"
                                                        campos={inspecaoCampos.pocoElevador}
                                                    />
                                                </View>

                                            </View>

                                        </PrimaryList>
                                    </View>

                                </View>

                                {vestigiosEquipamentos.map((vestigio, index) => (
                                    <ResumoVestigio
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

                                        {item.tipoEntrevistado && (
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
                                                            label="Gênero"
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
                                                onPress={() =>
                                                    setDepoimentos((prev) => prev.filter((_, i) => i !== index))
                                                }
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

                            {origemVestigio && (
                                <>
                                    <Modal
                                        isVisible={modalVestigioVisible}
                                        onBackdropPress={() => setModalVestigioVisible(false)}
                                        onBackButtonPress={() => setModalVestigioVisible(false)}
                                        animationIn="slideInUp"
                                        animationOut="slideOutDown"
                                        style={{ margin: 0, justifyContent: 'flex-end' }} // necessário para vir de baixo
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

                                                    <FileUpload />
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

                                                    <FileUpload />
                                                </View>
                                            </View>
                                        </ScrollView>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
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
        paddingBottom: 20,
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


});
