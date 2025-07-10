import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '~/theme'; 
import { Feather } from '@expo/vector-icons';

interface VestigioResumoProps {
  index: number;
  vestigio: any;
  onVisualizar: () => void;
  onRemover: () => void; // <- nova prop para remover
}

export default function ResumoVestigio({ index, vestigio, onVisualizar, onRemover }: VestigioResumoProps) {
  return (
    <View style={styles.etiqueta}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Feather name="tag" size={20} color="#fff" />
          <Text style={styles.title}>Vestígio coletado</Text>
        </View>

        <View style={styles.actions}>
          <Text style={styles.badge}>{index + 1}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.texto}>Nº: {vestigio.dadosCompletos?.dadosPreliminares?.[0]?.numeroVestigio ?? '---'}</Text>
        <Text style={styles.texto}>Unidade: {vestigio.dadosCompletos?.dadosPreliminares?.[0]?.unidadeOrigem ?? '---'}</Text>
        <Text style={styles.texto}>Natureza: {vestigio.dadosCompletos?.dadosPreliminares?.[0]?.naturezaVestigio ?? '---'}</Text>

        <View style={styles.buttons}>
            <TouchableOpacity onPress={onVisualizar}>
                <Text style={styles.link}>Visualizar completo</Text>
            </TouchableOpacity>

        
            <TouchableOpacity onPress={onRemover} style={styles.trashButton}>
                <Feather name="trash-2" size={20} color="red" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  etiqueta: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.mainColor,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: colors.primaryLight,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  trashButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  texto: {
    fontSize: 17,
    color: colors.primaryDark,
  },
  link: {
    color: colors.bgLink,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
  }
});
