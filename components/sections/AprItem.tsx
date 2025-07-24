import { View, Text, StyleSheet } from 'react-native';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import CheckBox from '../inputs/CheckBox';
import AddButton from '~/components/buttons/addButton';
import RemoveButton from '~/components/buttons/removeButton';
import { APRModel } from '~/types/forensicTypes';
import { fontSize, colors } from '~/theme';

interface APRItemProps {
  apr: APRModel;
  index: number;
  onUpdate: (index: number, novo: APRModel) => void;
  onRemove: (index: number) => void;
}

export default function APRItem({ apr, index, onUpdate, onRemove }: APRItemProps) {
  const atualizarCampo = (campo: keyof APRModel["riscoAPR"], valor: any) => {
    const nova = { ...apr, riscoAPR: { ...apr.riscoAPR, [campo]: valor } };
    onUpdate(index, nova);
  };

  const atualizarLista = (
    tipo: 'peritoAuxiliar' | 'tecnico' | 'outros',
    i: number,
    campo: 'nome' | 'matricula',
    valor: string
  ) => {
    const novaLista = [...apr[tipo]];
    novaLista[i][campo] = valor;
    onUpdate(index, { ...apr, [tipo]: novaLista });
  };

  const adicionarNaLista = (tipo: 'peritoAuxiliar' | 'tecnico' | 'outros') => {
    const novaLista = [...apr[tipo], { nome: '', matricula: '' }];
    onUpdate(index, { ...apr, [tipo]: novaLista });
  };

  const removerDaLista = (tipo: 'peritoAuxiliar' | 'tecnico' | 'outros', i: number) => {
    const novaLista = apr[tipo].filter((_, idx) => idx !== i);
    onUpdate(index, { ...apr, [tipo]: novaLista });
  };

  const capitalizar = (texto: string) =>
    texto === 'peritoAuxiliar'
      ? 'Perito Auxiliar'
      : texto === 'tecnico'
      ? 'Técnico'
      : 'Outro';

  return (
    <View style={styles.sectionSpacing}>
      <Text style={styles.tituloGrupo}>APR {index + 1}</Text>

      <View style={styles.campoInterno}>
        <Text style={styles.titulos}>Perito responsável</Text>

        <PrimaryInput
          label="Nome completo"
          placeholder="Informe"
          value={apr.riscoAPR.peritoResponsavel}
          onChangeText={(text) => atualizarCampo('peritoResponsavel', text)}
        />

        <PrimaryInput
          label="Matrícula"
          placeholder="Informe"
          value={apr.riscoAPR.peritoMatricula}
          onChangeText={(text) => atualizarCampo('peritoMatricula', text)}
        />
      </View>

      {(['peritoAuxiliar', 'tecnico', 'outros'] as const).map((tipo) => (
        <View key={tipo} style={styles.campoInterno}>
          {apr[tipo].map((p, i) => (
            <View key={i} style={{ gap: 12 }}>
              <Text style={styles.titulos}>{`${capitalizar(tipo)} ${i + 1}`}</Text>

              <PrimaryInput
                label="Nome completo"
                value={p.nome}
                placeholder="Nome"
                onChangeText={(text) => atualizarLista(tipo, i, 'nome', text)}
              />
              <PrimaryInput
                label="Matrícula"
                value={p.matricula}
                placeholder="Matrícula"
                onChangeText={(text) => atualizarLista(tipo, i, 'matricula', text)}
              />

              {i > 0 && <RemoveButton label="Remover" onPress={() => removerDaLista(tipo, i)} />}
            </View>
          ))}

          <AddButton label={`Adicionar ${capitalizar(tipo)}`} onPress={() => adicionarNaLista(tipo)} />
        </View>
      ))}

      <View style={styles.campoInterno}>
        <Text style={styles.titulos}>Riscos</Text>

        <PrimarySelect
          label="Risco de acidente"
          selected={apr.riscoAPR.riscoAcidente}
          onSelect={(v) => atualizarCampo('riscoAcidente', v)}
          placeholder="Selecione"
          options={['Queda', 'Lesão', 'Choque elétrico']}
        />

        <PrimarySelect
          label="Risco físico"
          selected={apr.riscoAPR.riscoFisico}
          onSelect={(v) => atualizarCampo('riscoFisico', v)}
          placeholder="Selecione"
          options={['Temperatura', 'Vibração', 'Irradiação', 'Ruído', 'Pressão', 'Umidade']}
        />

        <View style={styles.checkboxRow}>
          <CheckBox
            checked={apr.riscoAPR.riscoQuimico}
            onPress={() => atualizarCampo('riscoQuimico', !apr.riscoAPR.riscoQuimico)}
          />
          <Text style={styles.checkboxLabel}>Risco Químico</Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckBox
            checked={apr.riscoAPR.riscoBiologico}
            onPress={() => atualizarCampo('riscoBiologico', !apr.riscoAPR.riscoBiologico)}
          />
          <Text style={styles.checkboxLabel}>Risco Biológico</Text>
        </View>

        <PrimarySelect
          label="Gravidade"
          selected={apr.riscoAPR.gravidade}
          onSelect={(v) => atualizarCampo('gravidade', v)}
          placeholder="Selecione"
          options={['Baixo', 'Moderado', 'Alto']}
        />

        <PrimarySelect
          label="Probabilidade"
          selected={apr.riscoAPR.probabilidade}
          onSelect={(v) => atualizarCampo('probabilidade', v)}
          placeholder="Selecione"
          options={['Baixa', 'Moderada', 'Alta']}
        />

        <PrimaryInput
          label="Medidas Mitigatórias"
          placeholder="Informe"
          value={apr.riscoAPR.medidasMitigatoria}
          onChangeText={(text) => atualizarCampo('medidasMitigatoria', text)}
        />
      </View>

      {index > 0 && <RemoveButton label="Remover APR" onPress={() => onRemove(index)} />}
    </View>
  );
}

// Reaproveitando estilos do seu layout principal
const styles = StyleSheet.create({
  campoInterno: {
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D0CECE",
    borderStyle: "dashed",
    paddingBottom: 20,
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxLabel: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
  tituloGrupo: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: 12,
  },
  titulos: {
    color: "#000",
    fontWeight: '600',
    fontSize: fontSize.label,
  },
  sectionSpacing: {
    marginBottom: 32,
  },
});
