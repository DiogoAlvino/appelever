import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { UploadWithMeta } from '~/models/uploadModel';
import { colors } from '~/theme';
import * as ImageManipulator from 'expo-image-manipulator';

interface Props {
  onChange?: (files: UploadWithMeta[]) => void;
  value?: UploadWithMeta[];
}

export default function FileUpload({ onChange, value = [] }: Props) {
  const [uploads, setUploads] = useState<UploadWithMeta[]>(value);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    setUploads(value);
  }, [value]);

  async function compressImage(uri: string, maxWidth = 800, quality = 0.5) {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: maxWidth } }],
      { compress: quality, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );

    return {
      base64: manipResult.base64,
      uri: manipResult.uri,
      size: manipResult.uri ? (await fetch(manipResult.uri).then(res => res.blob())).size : 0,
    };
  }

  const handleAddUpload = async (source: 'camera' | 'gallery') => {
    const permissionRequest = source === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionRequest.status !== 'granted') {
      Alert.alert('Permissão negada', `Você precisa permitir o uso da ${source === 'camera' ? 'câmera' : 'galeria'}.`);
      return;
    }

    const picker = source === 'camera' ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;

    const result = await picker({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      const compressed = await compressImage(file.uri, 800, 0.4);

      const newUpload: UploadWithMeta = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        nome: file.fileName || 'imagem.jpg',
        arquivo: `data:image/jpeg;base64,${compressed.base64}`,
        uri: compressed.uri,
        size: compressed.size,
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
          {uploads.map((file, index) => {
            const displayUri = file.arquivo?.startsWith('data:image') ? file.arquivo : file.uri;

            return (
              <View key={`${file.id || displayUri}-${index}`} style={styles.fileItem}>
                <Image source={{ uri: displayUri }} style={styles.thumbnail} />
                <View style={styles.fileDetails}>
                  <Text numberOfLines={1}>{file.nome}</Text>
                  {file.size !== undefined && (
                    <Text style={styles.fileSize}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={() => { /* visualizar */ }} style={styles.iconButton}>
                  <Feather name="eye" size={18} color="#007bff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(file.id)} style={styles.iconButton}>
                  <Feather name="trash-2" size={18} color="#dc3545" />
                </TouchableOpacity>
              </View>
            );
          })}
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
