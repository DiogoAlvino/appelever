import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import VoiceInput from '../inputs/voiceInput';
import FileUpload from '../inputs/fileUpload';
import { CampoChecklist, FileItem } from '~/types/forensicTypes';

interface Props {
  title: string;
  buttonLabel: string;
  campos: CampoChecklist[];
  valor: CampoChecklist[];
  onChange: (valores: CampoChecklist[]) => void;
}

export default function FormDrawer({ title, buttonLabel, campos, valor, onChange }: Props) {
  const [visible, setVisible] = useState(false);
  const [preenchido, setPreenchido] = useState(false);

  useEffect(() => {
    verificarSePreenchido(valor);
  }, [valor]);

  const verificarSePreenchido = (valores: CampoChecklist[]) => {
    const algumPreenchido = valores.some(campo =>
      campo.observacao?.trim() || (campo.arquivos?.length ?? 0) > 0
    );
    setPreenchido(algumPreenchido);
  };

  const atualizarTexto = (id: number, texto: string) => {
    const atualizados = valor.map(campo =>
      campo.id === id ? { ...campo, observacao: texto } : campo
    );
    onChange(atualizados);
  };

  const atualizarArquivos = (id: number, arquivos: FileItem[]) => {
    const atualizados = valor.map(campo =>
      campo.id === id ? { ...campo, arquivos } : campo
    );
    onChange(atualizados);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          gap: 10,
        }}
      >
        <Text
          style={{
            color: preenchido ? '#28a745' : '#0066cc',
            fontWeight: '600',
          }}
        >
          {preenchido ? `${title} preenchido ✅` : buttonLabel}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={() => setVisible(false)}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {valor.map((campo) => (
              <View key={campo.id} style={{ marginBottom: 20, gap: 10 }}>
                <Text style={styles.label}>{campo.titulo}</Text>
                <VoiceInput
                  value={campo.observacao || ''}
                  onChangeText={(texto) => atualizarTexto(campo.id, texto)}
                />
                <FileUpload
                  value={campo.arquivos || []}
                  onChange={(arquivos) => atualizarArquivos(campo.id, arquivos)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  drawer: {
    width: '85%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  content: {
    paddingBottom: 30,
  },
  label: {
    fontWeight: '500',
    color: '#333',
  },
});
