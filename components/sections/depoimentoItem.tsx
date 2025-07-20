import { ForensicModel } from "~/types/forensicTypes";
import PrimaryInput from "../inputs/primaryInput";
import PrimarySelect from "../inputs/primarySelect";
import VoiceInput from "../inputs/voiceInput";
import { View, Text, StyleSheet } from "react-native";
import { Depoimento } from "~/models/forensicModel";
import FileUpload from "../inputs/fileUpload";
import RemoveButton from "../buttons/removeButton";
import { colors, fontSize } from "~/theme";
import { UploadWithMeta } from "~/models/uploadModel";

interface DepoimentoItemProps {
    item: Depoimento;
    index: number;
    onUpdate: (index: number, novoItem: Depoimento) => void;
    onRemove: () => void;
}

export function DepoimentoItem({ item, index, onUpdate, onRemove }: DepoimentoItemProps) {
    const atualizarCampo = (campo: keyof Depoimento, valor: string) => {
        onUpdate(index, { ...item, [campo]: valor });
    };

    function setDepoimento(arg0: { arquivosLesoes: UploadWithMeta[]; }): void {
        throw new Error("Function not implemented.");
    }

    return (
        <View style={{ marginBottom: 12, gap: 12 }}>
            <Text style={styles.titulos}>Registro e análise de depoimentos {index + 1}</Text>

            <PrimarySelect
                label="Tipo do entrevistado"
                selected={item.tipoEntrevistado}
                onSelect={(value) => atualizarCampo('tipoEntrevistado', value || '')}
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
                    <PrimaryInput label="Nome" value={item.nomeEntrevistado} placeholder="Informe" onChangeText={(t) => atualizarCampo('nomeEntrevistado', t)} />
                    <PrimaryInput label="Identificação" value={item.identificacao} placeholder="Informe"  onChangeText={(t) => atualizarCampo('identificacao', t)} />
                    <PrimaryInput label="Endereço" value={item.endereco} placeholder="Informe"  onChangeText={(t) => atualizarCampo('endereco', t)} />

                    <PrimarySelect
                        label="Sexo"
                        selected={item.genero}
                        onSelect={(value) => atualizarCampo('genero', value || '')}
                        placeholder="Selecione"
                        options={['Masculino', 'Feminino']}
                    />

                    <PrimaryInput label="Idade" value={item.idade} placeholder="Informe" onChangeText={(t) => atualizarCampo('idade', t)} />
                    <Text style={styles.textos}>Descrição das lesões</Text>
                    <VoiceInput value={item.descricaoLesoes} onChangeText={(t) => atualizarCampo('descricaoLesoes', t)} />
                    <FileUpload
                        value={item.arquivoLesoes}
                        onChange={(arquivos) => onUpdate(index, { ...item, arquivoLesoes: arquivos })}
                    />

                    <Text style={styles.textos}>Depoimento/Relato</Text>
                    <VoiceInput value={item.depoimentoRelato} onChangeText={(t) => atualizarCampo('depoimentoRelato', t)} />
                </>
            )}

            {index > 0 && (
                <RemoveButton label="Remover entrevista" onPress={onRemove} />
            )}
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