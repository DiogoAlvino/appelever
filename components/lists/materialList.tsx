import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { materials } from '~/data/materials';
import CheckBox from '../inputs/CheckBox';
import PrimaryInput from '../inputs/primaryInput';

type Props = {
  materiaisSelecionados: number[];
  setMateriaisSelecionados: (val: number[]) => void;
  materialOutroDescricao: string;
  setMaterialOutroDescricao: (val: string) => void;
};

export default function MaterialList({
  materiaisSelecionados,
  setMateriaisSelecionados,
  materialOutroDescricao,
  setMaterialOutroDescricao,
}: Props) {
  const toggleItem = (id: number) => {
    const jaSelecionado = materiaisSelecionados.includes(id);
    const novos = jaSelecionado
      ? materiaisSelecionados.filter(i => i !== id)
      : [...materiaisSelecionados, id];

    console.log('[toggleItem] ID:', id);
    console.log('[toggleItem] Já selecionado:', jaSelecionado);
    console.log('[toggleItem] Novo estado:', novos);

    setMateriaisSelecionados(novos);
  };

  const marcarTodos = (ids: number[]) => {
    const novos = Array.from(new Set([...materiaisSelecionados, ...ids]));
    console.log('[marcarTodos] IDs marcados:', ids);
    console.log('[marcarTodos] Novo estado:', novos);
    setMateriaisSelecionados(novos);
  };

  const desmarcarTodos = (ids: number[]) => {
    const novos = materiaisSelecionados.filter(i => !ids.includes(i));
    console.log('[desmarcarTodos] IDs desmarcados:', ids);
    console.log('[desmarcarTodos] Novo estado:', novos);
    setMateriaisSelecionados(novos);
  };

  console.log('[render] materiaisSelecionados:', materiaisSelecionados);

  return (
    <View style={styles.container}>
      {materials.map((grupo) => (
        <View key={grupo.id} style={styles.grupo}>
          <Text style={styles.titulo}>{grupo.title}</Text>

          <View style={styles.listaCompacta}>
            <ScrollView>
              {grupo.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemLinha}
                  onPress={() => toggleItem(item.id)}
                >
                  <CheckBox
                    checked={materiaisSelecionados.includes(item.id)}
                    onPress={() => toggleItem(item.id)}
                  />
                  <Text style={styles.label}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.acoes}>
            <TouchableOpacity onPress={() => marcarTodos(grupo.items.map(i => i.id))}>
              <Text style={styles.acaoTexto}>Marcar todos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => desmarcarTodos(grupo.items.map(i => i.id))}>
              <Text style={styles.acaoTexto}>Desmarcar todos</Text>
            </TouchableOpacity>
          </View>

          {materiaisSelecionados.includes(149) && grupo.id === 1 && (
            <PrimaryInput
              label="Descreva o outro material"
              placeholder="Informe"
              value={materialOutroDescricao}
              onChangeText={(text) => {
                console.log('[PrimaryInput] outroDescricao:', text);
                setMaterialOutroDescricao(text);
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
  grupo: { gap: 10 },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  listaCompacta: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
  itemLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acaoTexto: {
    color: '#173A64',
    fontWeight: '600',
  },
});