import { useState } from 'react';
import PrimaryList from '~/components/lists/primaryList';
import PrimaryInput from '../inputs/primaryInput';
import { StyleSheet, View, Text } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';
import RemoveButton from '../buttons/removeButton';
import AddButton from '../buttons/addButton';


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

                        <PrimaryInput
                            label="Geolocalização"
                            placeholder="Informe"
                            value={dadosIniciais.edificacao}
                            onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, edificacao: text })}
                        />
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

            <PrimaryList
                title="2. Materiais, equipamentos, EPI e EPC"
            >
                <View style={styles.campos}>
                    <View style={styles.campoInternoSecundario}>
                        <Text style={styles.titulos}>Lista</Text>

                    </View>
                    
                </View>
            </PrimaryList>

            <PrimaryList
                title="3. Análise preliminar do local"
                helperEnabled
                helperTitle="Ajuda"
                helperDescription="Insira as informações referentes ao local onde o equipamento está instalado."
            >
                <View style={styles.campos}>
                    <Text style={styles.titulos}>Reconhecimento da área imediata e mediata</Text>
                    
                    <PrimaryInput
                        label="Condições ambientais"
                        placeholder="Informe"
                        value={dadosIniciais.logradouro}
                        onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                    />
                </View>
            </PrimaryList>

            <PrimaryList
                title="4. Análise Preliminar de Risco (APR)"
                helperEnabled
                helperTitle="Ajuda"
                helperDescription="Insira as informações referentes ao local onde o equipamento está instalado."
            >
                <View style={styles.campos}>
                    <Text style={styles.titulos}>Reconhecimento da área imediata e mediata</Text>
                    
                    <PrimaryInput
                        label="Condições ambientais"
                        placeholder="Informe"
                        value={dadosIniciais.logradouro}
                        onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                    />
                </View>
            </PrimaryList>

            <PrimaryList
                title="5. Exames"
                helperEnabled
                helperTitle="Ajuda"
                helperDescription="Insira as informações referentes ao local onde o equipamento está instalado."
            >
                <View style={styles.campos}>
                    <Text style={styles.titulos}>Reconhecimento da área imediata e mediata</Text>
                    
                    <PrimaryInput
                        label="Condições ambientais"
                        placeholder="Informe"
                        value={dadosIniciais.logradouro}
                        onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                    />
                </View>
            </PrimaryList>

            <PrimaryList
                title="5. Documentação"
                helperEnabled
                helperTitle="Ajuda"
                helperDescription="Insira as informações referentes ao local onde o equipamento está instalado."
            >
                <View style={styles.campos}>
                    <Text style={styles.titulos}>Reconhecimento da área imediata e mediata</Text>
                    
                    <PrimaryInput
                        label="Condições ambientais"
                        placeholder="Informe"
                        value={dadosIniciais.logradouro}
                        onChangeText={(text) => setDadosIniciais({ ...dadosIniciais, logradouro: text })}
                    />
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
        color: colors.mainColor,
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
