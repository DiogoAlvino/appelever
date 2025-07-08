import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import VoiceInput from '../inputs/voiceInput';
import FileUpload from '../inputs/fileUpload';

interface Campo {
  id: number;
  titulo: string;
}

interface Props {
  title: string;
  buttonLabel: string;
  campos: Campo[];
}

export default function FormDrawer({ title, buttonLabel, campos }: Props) {
  const [visible, setVisible] = useState(false);
  const [preenchido, setPreenchido] = useState(false);

  const [valoresTexto, setValoresTexto] = useState<{ [id: number]: string }>({});
  const [arquivosCampos, setArquivosCampos] = useState<{ [id: number]: any[] }>({});

  const verificarSePreenchido = (textos: typeof valoresTexto, arquivos: typeof arquivosCampos) => {
    const algumPreenchido = campos.some(campo => {
      const temTexto = textos[campo.id]?.trim();
      const temArquivo = arquivos[campo.id]?.length > 0;
      return !!temTexto || !!temArquivo;
    });
    setPreenchido(algumPreenchido);
  };

  const atualizarTexto = (id: number, valor: string) => {
    const atualizados = { ...valoresTexto, [id]: valor };
    setValoresTexto(atualizados);
    verificarSePreenchido(atualizados, arquivosCampos);
  };

  const atualizarArquivos = (id: number, novosArquivos: any[]) => {
    const atualizados = { ...arquivosCampos, [id]: novosArquivos };
    setArquivosCampos(atualizados);
    verificarSePreenchido(valoresTexto, atualizados);
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
          color: preenchido ? '#28a745' : '#0066cc',
          fontWeight: '600'
        }}>
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
            {campos.map((campo) => (
              <View key={campo.id} style={{ marginBottom: 20, gap: 10 }}>
                <Text style={styles.label}>{campo.titulo}</Text>
                <VoiceInput
                  value={valoresTexto[campo.id] || ''}
                  onChangeText={(texto) => atualizarTexto(campo.id, texto)}
                />
                <FileUpload
                  value={arquivosCampos[campo.id] || []}
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