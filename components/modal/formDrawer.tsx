import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import VoiceInput from '../inputs/voiceInput';
import FileUpload from '../inputs/fileUpload';

interface Campo {
  id: number;
  titulo: string;
}

interface FileItem {
  name: string;
  uri: string;
  type: 'image' | 'file' | 'photo';
  size: number;
}

interface Props {
  title: string;
  buttonLabel: string;
  campos: Campo[];
  valor: { [id: number]: { texto: string; arquivos: FileItem[] } };
  onChange: (valores: { [id: number]: { texto: string; arquivos: FileItem[] } }) => void;
}

export default function FormDrawer({ title, buttonLabel, campos, valor, onChange }: Props) {
  const [visible, setVisible] = useState(false);
  const [preenchido, setPreenchido] = useState(false);

  useEffect(() => {
    verificarSePreenchido(valor);
  }, [valor]);

  const verificarSePreenchido = (valores: { [id: number]: { texto: string; arquivos: FileItem[] } }) => {
    const algumPreenchido = campos.some(campo => {
      const entrada = valores[campo.id];
      return !!entrada?.texto?.trim() || (entrada?.arquivos?.length ?? 0) > 0;
    });
    setPreenchido(algumPreenchido);
  };

  const atualizarTexto = (id: number, texto: string) => {
    const atualizados = {
      ...valor,
      [id]: {
        ...(valor[id] || { arquivos: [] }),
        texto,
      },
    };
    onChange(atualizados);
  };

  const atualizarArquivos = (id: number, arquivos: FileItem[]) => {
    const atualizados = {
      ...valor,
      [id]: {
        ...(valor[id] || { texto: '' }),
        arquivos,
      },
    };
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
        <Text style={{
          color: preenchido ? '#173A64' : '#0066cc',
          fontWeight: '600',
          fontSize: 16,
        }}>
          {preenchido ? `${title} preenchido `  : buttonLabel}
          {preenchido && (
            <Feather name="check-circle" size={20} color="#173A64" />
          )}
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
            {campos.map((campo) => (
              <View key={campo.id} style={{ marginBottom: 20, gap: 10 }}>
                <Text style={styles.label}>{campo.titulo}</Text>
                <VoiceInput
                  value={valor[campo.id]?.texto || ''}
                  onChangeText={(texto) => atualizarTexto(campo.id, texto)}
                />
                <FileUpload
                  value={valor[campo.id]?.arquivos || []}
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
    borderRadius: 12, 
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
