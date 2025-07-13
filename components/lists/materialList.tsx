import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { materials } from '~/data/materials';
import CheckBox from '../inputs/CheckBox';
import PrimaryInput from '../inputs/primaryInput';
import { useForensic } from '~/hooks/useForensic';

export default function MaterialList() {
  const {
    materiaisSelecionados,
    setMateriaisSelecionados,
    materialOutroDescricao,
    setMaterialOutroDescricao,
  } = useForensic();

  const toggleItem = (id: number) => {
    if (materiaisSelecionados.includes(id)) {
      setMateriaisSelecionados(materiaisSelecionados.filter(i => i !== id));
    } else {
      setMateriaisSelecionados([...materiaisSelecionados, id]);
    }
  };

  const marcarTodos = (ids: number[]) => {
    const novos = Array.from(new Set([...materiaisSelecionados, ...ids]));
    setMateriaisSelecionados(novos);
  };

  const desmarcarTodos = (ids: number[]) => {
    setMateriaisSelecionados(materiaisSelecionados.filter(i => !ids.includes(i)));
  };

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

          {/* Mostrar campo extra se "Outro" (id 149) estiver selecionado */}
          {materiaisSelecionados.includes(149) && grupo.id === 1 && (
            <PrimaryInput
              label="Descreva o outro material"
              placeholder="Informe"
              value={materialOutroDescricao}
              onChangeText={setMaterialOutroDescricao}
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
