import { View, Text } from 'react-native';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import CheckBox from '../inputs/CheckBox';
import AddButton from '~/components/buttons/addButton';
import RemoveButton from '~/components/buttons/removeButton';
import { APRModel } from '~/types/forensicTypes';

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

  const atualizarLista = (tipo: 'peritoAuxiliar' | 'tecnico' | 'outros', i: number, campo: 'nome' | 'matricula', valor: string) => {
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

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontWeight: 'bold' }}>APR {index + 1}</Text>

      <PrimaryInput
        label="Perito responsável"
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

      {(['peritoAuxiliar', 'tecnico', 'outros'] as const).map((tipo) => (
        <View key={tipo} style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>{tipo}</Text>
          {apr[tipo].map((p, i) => (
            <View key={i} style={{ gap: 8, marginBottom: 12 }}>
              <PrimaryInput
                label={`${tipo} ${i + 1}`}
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
          <AddButton label={`Adicionar ${tipo}`} onPress={() => adicionarNaLista(tipo)} />
        </View>
      ))}

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

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <CheckBox
          checked={apr.riscoAPR.riscoQuimico}
          onPress={() => atualizarCampo('riscoQuimico', !apr.riscoAPR.riscoQuimico)}
        />
        <Text>Risco Químico</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <CheckBox
          checked={apr.riscoAPR.riscoBiologico}
          onPress={() => atualizarCampo('riscoBiologico', !apr.riscoAPR.riscoBiologico)}
        />
        <Text>Risco Biológico</Text>
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

      {index > 0 && <RemoveButton label="Remover APR" onPress={() => onRemove(index)} />}
    </View>
  );
}
