import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import VoiceInput from '../inputs/voiceInput';
import FileUpload from '../inputs/fileUpload';
import { CampoChecklist } from '~/types/forensicTypes';
import { UploadWithMeta } from '~/models/uploadModel';
import DataHoraButton from '../buttons/dataHoraButton';

interface Campo {
  id: number;
  titulo: string;
}

interface Props {
  title: string;
  buttonLabel: string;
  campos: Campo[];
  valor: CampoChecklist[];
  onChange: (valores: CampoChecklist[]) => void;
  dataHora?: Date | null;
  onChangeDataHora?: (data: Date | null) => void;
}

export default function FormDrawer({
  title,
  buttonLabel,
  campos,
  valor,
  onChange,
  dataHora,
  onChangeDataHora,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [preenchido, setPreenchido] = useState(false);

  useEffect(() => {
    verificarSePreenchido(valor);
  }, [valor]);

  const verificarSePreenchido = (valores: CampoChecklist[]) => {
    const algumPreenchido = campos.some(campo => {
      const entrada = valores.find(v => v.id === campo.id);
      return !!entrada?.observacao?.trim() || (entrada?.arquivos?.length ?? 0) > 0;
    });
    setPreenchido(algumPreenchido);
  };

  const atualizarTexto = (id: number, texto: string) => {
    const atualizados = campos.map(campo =>
      campo.id === id
        ? {
            ...valor.find(v => v.id === id) || { id, titulo: campo.titulo },
            observacao: texto,
          }
        : valor.find(v => v.id === campo.id) || { id: campo.id, titulo: campo.titulo }
    );
    onChange(atualizados);
  };

  const atualizarArquivos = (id: number, arquivos: UploadWithMeta[]) => {
    const atualizados = campos.map(campo =>
      campo.id === id
        ? {
            ...valor.find(v => v.id === id) || { id, titulo: campo.titulo },
            arquivos,
          }
        : valor.find(v => v.id === campo.id) || { id: campo.id, titulo: campo.titulo }
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
        <Text style={{
          color: preenchido ? '#173A64' : '#0066cc',
          fontWeight: '600',
          fontSize: 16,
        }}>
          {preenchido ? `${title} preenchido ` : buttonLabel}
          {preenchido && <Feather name="check-circle" size={20} color="#173A64" />}
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
            {campos.map((campo) => {
              const entrada = valor.find(v => v.id === campo.id);
              return (
                <View key={campo.id} style={{ marginBottom: 20, gap: 10 }}>
                  <Text style={styles.label}>{campo.titulo}</Text>

                  <VoiceInput
                    value={entrada?.observacao || ''}
                    onChangeText={(texto) => atualizarTexto(campo.id, texto)}
                  />

                  <FileUpload
                    value={entrada?.arquivos || []}
                    onChange={(arquivos) => atualizarArquivos(campo.id, arquivos)}
                  />
                </View>
              );
            })}

            {onChangeDataHora && (
              <View style={{ marginTop: 12 }}>
                <Text style={styles.label}>Registro de data/hora</Text>
                <DataHoraButton
                  value={dataHora ?? null}
                  onChange={onChangeDataHora}
                />
              </View>
            )}
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
