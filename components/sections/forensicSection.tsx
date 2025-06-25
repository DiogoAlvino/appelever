import { useState } from 'react';
import PrimaryList from '~/components/lists/primaryList';
import PrimaryInput from '../inputs/primaryInput';
import { StyleSheet, View, Text } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';
import RemoveButton from '../buttons/removeButton';
import AddButton from '../buttons/addButton';
import LocationButton from '../buttons/locationButton';
import FileUpload from '../inputs/fileUpload';
import VoiceInput from '../inputs/voiceInput';
import PrimarySelect from '../inputs/primarySelect';
import MaterialList from '../lists/materialList';


export default function ForensicSection() {
    const [dadosIniciais, setDadosIniciais] = useState({
        edificacao: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const [message, setMessage] = useState('');
    const [informacoes, setInformacoes] = useState(['']);
    const [peritoAuxiliar, setPeritoAuxiliar] = useState(['']);
    const [tecnico, setTecnico] = useState(['']);
    const [outros, setOutros] = useState(['']);
    const [riscoAPR, setRiscoAPR] = useState({
        riscoAcidente: '',
        riscoFisico: '',
        gravidade: '',
        probabilidade: '',
    });

    const adicionarCampo = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => [...prev, '']);
    };


    const atualizarCampo = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        index: number,
        valor: string
    ) => {
        setter(prev => {
            const copia = [...prev];
            copia[index] = valor;
            return copia;
        });
    };

    const removerCampo = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        indexToRemove: number
    ) => {
        setter(prev => prev.filter((_, index) => index !== indexToRemove));
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
                            value={dadosIniciais.edificacao}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, edificacao: text })}
                        />
                        <PrimaryInput
                            label="Cargo"
                            placeholder="Informe"
                            value={dadosIniciais.cep}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, cep: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Matricula"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                        />
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Equipe Pericial - Auxiliar</Text>

                        <PrimaryInput
                            label="Nome completo"
                            placeholder="Informe"
                            value={dadosIniciais.edificacao}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, edificacao: text })}
                        />
                        <PrimaryInput
                            label="Cargo"
                            placeholder="Informe"
                            value={dadosIniciais.cep}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, cep: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Matricula"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                        />

                        <AddButton label="Adicionar mais um membro da equipe" onPress={() => console.log('Adicionar')} />

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
                            value={dadosIniciais.cep}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, cep: text })}
                            mask="99999-999"
                        />
                        <PrimaryInput
                            label="Numero de vitimas (Obitos, feridos)"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                        />
                        <PrimaryInput
                            label="Condição das vitimas (Obitos, feridos)"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                        />

                    </View>



                </View>
            </PrimaryList>

            <PrimaryList title="2. Materiais, equipamentos, EPI e EPC">
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Lista de Materiais e EPIs</Text>
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
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Condições ambientais</Text>
                        <Text>Descreva as condições como: barulho, fumaça, iluminação e etc</Text>
                        <VoiceInput value={message} onChangeText={setMessage} />
                    </View>

                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Informações do fato</Text>
                        <Text>Você pode informar testemunhas, técnico, policial e etc</Text>

                        {informacoes.map((info, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Informação ${index + 1}`}
                                    placeholder="Informe"
                                    value={info}
                                    onChangeText={(text) => atualizarCampo(setInformacoes, index, text)}
                                />
                                <VoiceInput value={message} onChangeText={setMessage} />

                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover informação"
                                        onPress={() => removerCampo(setInformacoes, index)}
                                    />
                                )}
                            </View>
                        ))}

                        <AddButton label="Adicionar outra informação" onPress={() => adicionarCampo(setInformacoes)} />

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
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                        />
                        <PrimaryInput
                            label="Matricula"
                            placeholder="Informe"
                            value={dadosIniciais.logradouro}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                        />


                    </View>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Peritos auxiliares</Text>

                        {peritoAuxiliar.map((info, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Perito auxiliar ${index + 1}`}
                                    placeholder="Informe"
                                    value={info}
                                    onChangeText={(text) => atualizarCampo(setPeritoAuxiliar ,index, text)}
                                />

                                <PrimaryInput
                                    label="Matricula"
                                    placeholder="Informe"
                                    value={dadosIniciais.logradouro}
                                    onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                                />

                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover perito auxiliar"
                                        onPress={() => removerCampo(setPeritoAuxiliar ,index)}
                                    />
                                )}
                            </View>
                        ))}
                        <AddButton label="Adicionar outro perito auxiliar" onPress={() => adicionarCampo(setPeritoAuxiliar)} />
                    </View>
                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Técnicos</Text>

                        {tecnico.map((info, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Técnico ${index + 1}`}
                                    placeholder="Informe"
                                    value={info}
                                    onChangeText={(text) => atualizarCampo(setTecnico ,index, text)}
                                />

                                <PrimaryInput
                                    label="Matricula"
                                    placeholder="Informe"
                                    value={dadosIniciais.logradouro}
                                    onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                                />

                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover técnico"
                                        onPress={() => removerCampo(setTecnico ,index)}
                                    />
                                )}
                            </View>
                        ))}
                        <AddButton label="Adicionar outro técnico" onPress={() => adicionarCampo(setTecnico)} />
                    </View>

                    <View style={styles.campoInterno}>
                        <Text style={styles.titulos}>Outros</Text>

                        {outros.map((info, index) => (
                            <View key={index} style={{ marginBottom: 12, gap: 12 }}>
                                <PrimaryInput
                                    label={`Outros ${index + 1}`}
                                    placeholder="Informe"
                                    value={info}
                                    onChangeText={(text) => atualizarCampo(setOutros ,index, text)}
                                />

                                <PrimaryInput
                                    label="Matricula"
                                    placeholder="Informe"
                                    value={dadosIniciais.logradouro}
                                    onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                                />

                                {index > 0 && (
                                    <RemoveButton
                                        label="Remover técnico"
                                        onPress={() => removerCampo(setOutros ,index)}
                                    />
                                )}
                            </View>
                        ))}
                        <AddButton label="Adicionar outros" onPress={() => adicionarCampo(setOutros)} />
                    </View>

                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Detalhamento das Etapas do Trabalho</Text>
                        <Text>Descrição da atividade</Text>

                        <View style={styles.campoInterno}>
                            <Text style={styles.titulos}>Identificação do Risco</Text>
                            <PrimarySelect label="Risco de acidente"
                                selected={riscoAPR.riscoAcidente}
                                onSelect={(value) => {
                                    setRiscoAPR({ ...riscoAPR, riscoAcidente: value });
                                }}
                                placeholder="Selecione"
                                options={['Queda', 'Lesão', 'Choque elétrico']} />

                            <PrimarySelect label="Risco físico"
                                selected={riscoAPR.riscoFisico}
                                onSelect={(value) => {
                                    setRiscoAPR({ ...riscoAPR, riscoFisico: value });
                                }}
                                placeholder="Selecione"
                                options={['Temperatura', 'Vibração', 'Irradiação', 'Ruído', 'Pressão', 'Umidade']} />
                            

                        </View >

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
                                    value={dadosIniciais.logradouro}
                                    onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
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
                        <Text style={styles.titulos}>Lista</Text>

                    </View>

                </View>
            </PrimaryList>

            <PrimaryList
                title="6. Documentação"
            >
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Lista</Text>

                    </View>

                </View>
            </PrimaryList>

            <PrimaryList
                title="7. Equipamento"
            >
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Lista</Text>

                    </View>

                </View>
            </PrimaryList>

            <PrimaryList
                title="8. Entrevistas"
            >
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Lista</Text>

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
        fontSize: fontSize.label
    },
    campoInterno: {
        gap: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D0CECE",
        borderStyle: "dashed",
        paddingBottom: 20

    },
    campoInternoSecundario: {
        gap: 15,
        paddingBottom: 20
    }
});
