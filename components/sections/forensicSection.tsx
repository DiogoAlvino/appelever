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

export default function ForensicSection() {
    const {
        dadosIniciais, setDadosIniciais,
        message, setMessage,
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
    } = useForensic();

    const camposMaquinaTracao = inspecaoCampos.maquinaTracao;

    const [drawerMaquinaTracaoVisible, setDrawerMaquinaTracaoVisible] = useState(false);
    const [preenchidoMaquinaTracao, setPreenchidoMaquinaTracao] = useState(false);


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
                            value={dadosIniciais.cep}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, cargoPerito: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Matricula"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
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
                            value={dadosIniciais.edificacao}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, edificacao: text })}
                        />
                        <PrimaryInput
                            label="Tipo de ocorrencia"
                            placeholder="Informe"
                            value={dadosIniciais.cep}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, cep: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Autoridade policial solicitante"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
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
                        <VoiceInput value={message} onChangeText={setMessage} />
                        <Text >Texto Capturado:</Text>
                        <Text >{message || 'Nada capturado ainda'}</Text>
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Condições ambientais</Text>
                        <Text>Descreva as condições como: barulho, fumaça, iluminação e etc</Text>
                        <VoiceInput value={message} onChangeText={setMessage} />
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Características do local</Text>
                        <Text>Condições especiais relevantes</Text>
                        <VoiceInput value={message} onChangeText={setMessage} />
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
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Vestígio - Coleta</Text>
                        <View style={styles.campoInterno}>
                            {dadosPreliminares.map((item, index) => (
                                <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                    <Text style={styles.titulos}>Dados preliminares {index + 1}</Text>

                                    <PrimaryInput
                                        label="Nº do vestígio"
                                        placeholder="Informe"
                                        value={item.numeroVestigio}
                                        onChangeText={(text) => {
                                            const copia = [...dadosPreliminares];
                                            copia[index].numeroVestigio = text;
                                            setDadosPreliminares(copia);
                                        }}
                                    />

                                    <PrimaryInput
                                        label="Unidade de Origem"
                                        placeholder="Informe"
                                        value={item.unidadeOrigem}
                                        onChangeText={(text) => {
                                            const copia = [...dadosPreliminares];
                                            copia[index].unidadeOrigem = text;
                                            setDadosPreliminares(copia);
                                        }}
                                    />

                                    <PrimaryInput
                                        label="Nº do Procedimento (IP/TCO/Outros)"
                                        placeholder="Informe"
                                        value={item.procedimento}
                                        onChangeText={(text) => {
                                            const copia = [...dadosPreliminares];
                                            copia[index].procedimento = text;
                                            setDadosPreliminares(copia);
                                        }}
                                    />

                                    <PrimarySelect
                                        label="Natureza do Vestígio"
                                        selected={item.naturezaVestigio}
                                        onSelect={(value) => {
                                            const copia = [...dadosPreliminares];
                                            copia[index].naturezaVestigio = value;
                                            if (value !== 'Outros') copia[index].naturezaOutros = '';
                                            setDadosPreliminares(copia);
                                        }}
                                        placeholder="Selecione"
                                        options={['Biológico', 'Documental', 'Equipamento', 'Material', 'Mídia de armazenamento', 'Cadáver', 'Outros']}
                                    />

                                    {item.naturezaVestigio === 'Outros' && (
                                        <PrimaryInput
                                            label="Descreva a natureza"
                                            placeholder="Informe"
                                            value={item.naturezaOutros}
                                            onChangeText={(text) => {
                                                const copia = [...dadosPreliminares];
                                                copia[index].naturezaOutros = text;
                                                setDadosPreliminares(copia);
                                            }}
                                        />
                                    )}

                                    <Text style={styles.textos}>Descrição Detalhada do(s) Vestígio(s)</Text>
                                    <Text>Quantidades, características, numerações, estado de conservação, possíveis danos, etc</Text>

                                    <VoiceInput value={item.descricaoDetalhada} onChangeText={(text) => {
                                        const copia = [...dadosPreliminares];
                                        copia[index].descricaoDetalhada = text;
                                        setDadosPreliminares(copia);
                                    }} />

                                    <FileUpload />

                                    {index > 0 && (
                                        <RemoveButton
                                            label="Remover dados do vestígio"
                                            onPress={() =>
                                                setDadosPreliminares((prev) => prev.filter((_, i) => i !== index))
                                            }
                                        />
                                    )}
                                </View>
                            ))}

                            <AddButton
                                label="Adicionar outros dados"
                                onPress={() =>
                                    setDadosPreliminares((prev) => [
                                        ...prev,
                                        {
                                            numeroVestigio: '',
                                            unidadeOrigem: '',
                                            procedimento: '',
                                            naturezaVestigio: '',
                                            naturezaOutros: '',
                                            descricaoDetalhada: '',
                                        },
                                    ])
                                }
                            />

                        </View>

                        <View style={styles.campoInternoSecundario}>
                            {acondicionamento.map((item, index) => (
                                <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                    <Text style={styles.titulos}>Coleta/Acondicionamento {index + 1}</Text>

                                    <PrimaryInput
                                        label="Responsável pela coleta"
                                        placeholder="Informe"
                                        value={item.responsavelColeta}
                                        onChangeText={(text) => {
                                            const copia = [...acondicionamento];
                                            copia[index].responsavelColeta = text;
                                            setAcondicionamento(copia);
                                        }}
                                    />

                                    <PrimaryInput
                                        label="Matrícula"
                                        placeholder="Informe"
                                        value={item.matricula}
                                        onChangeText={(text) => {
                                            const copia = [...acondicionamento];
                                            copia[index].matricula = text;
                                            setAcondicionamento(copia);
                                        }}
                                    />

                                    <LocationButton />

                                    <PrimarySelect
                                        label="Tipo de acondicionamento"
                                        selected={item.tipoAcondicionamento}
                                        onSelect={(value) => {
                                            const copia = [...acondicionamento];
                                            copia[index].tipoAcondicionamento = value;
                                            if (value !== 'Outros') copia[index].tipoAcondicionamentoOutros = '';
                                            setAcondicionamento(copia);
                                        }}
                                        placeholder="Selecione"
                                        options={['Saco plástico', 'Frasco', 'Caixa térmica', 'Outros']}
                                    />

                                    {item.tipoAcondicionamento === 'Outros' && (
                                        <PrimaryInput
                                            label="Descreva o tipo de acondicionamento"
                                            placeholder="Informe"
                                            value={item.tipoAcondicionamentoOutros}
                                            onChangeText={(text) => {
                                                const copia = [...acondicionamento];
                                                copia[index].tipoAcondicionamentoOutros = text;
                                                setAcondicionamento(copia);
                                            }}
                                        />
                                    )}

                                    <PrimaryInput
                                        label="Nº do lacre/ Invólucro de segurança"
                                        placeholder="Informe"
                                        value={item.numeroLacre}
                                        onChangeText={(text) => {
                                            const copia = [...acondicionamento];
                                            copia[index].numeroLacre = text;
                                            setAcondicionamento(copia);
                                        }}
                                    />

                                    <FileUpload />

                                    {index > 0 && (
                                        <RemoveButton
                                            label="Remover acondicionamento"
                                            onPress={() =>
                                                setAcondicionamento((prev) => prev.filter((_, i) => i !== index))
                                            }
                                        />
                                    )}
                                </View>
                            ))}

                            <AddButton
                                label="Adicionar outro dado"
                                onPress={() =>
                                    setAcondicionamento((prev) => [
                                        ...prev,
                                        {
                                            responsavelColeta: '',
                                            matricula: '',
                                            tipoAcondicionamento: '',
                                            tipoAcondicionamentoOutros: '',
                                            numeroLacre: '',
                                        },
                                    ])
                                }
                            />
                        </View>
                    </View>
                </View>
            </PrimaryList>

            <PrimaryList title="6. Documentação">
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
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
                        <VoiceInput value={message} onChangeText={setMessage} />
                        <Text style={{ marginTop: 4 }}>Texto Capturado:</Text>
                        <Text>{message || 'Nada capturado ainda'}</Text>
                    </View>
                </View>
            </PrimaryList>



            <PrimaryList
                title="8. Entrevistas"
            >
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
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
    campos: {
        gap: 20
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
        padding: 10,
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
