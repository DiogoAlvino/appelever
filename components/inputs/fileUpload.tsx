import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { UploadWithMeta } from '~/models/uploadModel';
import { colors } from '~/theme';

interface Props {
  onChange?: (files: UploadWithMeta[]) => void;
}

export default function FileUpload({ onChange }: Props) {
  const [uploads, setUploads] = useState<UploadWithMeta[]>([]);
  const [permission, requestPermission] = useCameraPermissions();

  const handleAddUpload = async (source: 'camera' | 'gallery') => {
    if (source === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
        return;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
        return;
      }
    }

    const picker = source === 'camera' ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;

    const result = await picker({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.3,
      base64: true,
    });

    console.log('Resultado picker:', result);

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      if (!file.base64) {
        Alert.alert('Erro', 'Não foi possível converter a imagem.');
        return;
      }

      const newUpload: UploadWithMeta = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        nome: file.fileName || 'imagem.jpg',
        arquivo: `data:image/jpeg;base64,${file.base64}`,
        uri: file.uri,
        size: file.fileSize ?? 0,
      };

      const updated = [...uploads, newUpload];
      setUploads(updated);
      onChange?.(updated);
    }
  };


  const handleRemove = (id: string) => {
    const updated = uploads.filter((file) => file.id !== id);
    setUploads(updated);
    onChange?.(updated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAddUpload('camera')}>
          <Feather name="camera" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleAddUpload('gallery')}>
          <Feather name="image" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {uploads.length > 0 && (
        <View style={styles.uploadedList}>
          <Text style={styles.uploadedTitle}>Imagens enviadas:</Text>
          {uploads.map((file, index) => (
            <View key={`${file.uri}-${index}`} style={styles.fileItem}>
              <Image source={{ uri: file.uri }} style={styles.thumbnail} />
              <View style={styles.fileDetails}>
                <Text numberOfLines={1}>{file.nome}</Text>
                <Text style={styles.fileSize}>{(file.size / (1024 * 1024)).toFixed(2)} MB</Text>
              </View>
              <TouchableOpacity onPress={() => {/* implementar visualização */ }} style={styles.iconButton}>
                <Feather name="eye" size={18} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(file.id)} style={styles.iconButton}>
                <Feather name="trash-2" size={18} color="#dc3545" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 12, paddingTop: 5 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  uploadedList: {
    marginTop: 10,
  },
  uploadedTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.primaryDark,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 8,
  },
  fileDetails: {
    flex: 1,
  },
  fileSize: {
    fontSize: 11,
    color: '#666',
  },
  iconButton: {
    padding: 6,
  },
});
