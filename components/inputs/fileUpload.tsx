import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { UploadModel } from '~/models/uploadModel';
import { colors } from '~/theme';

interface FileItem {
  name: string;
  size: number;
  uri: string;
  type: 'image' | 'photo';
}

interface Props {
  onUploadSuccess: (files: UploadModel[]) => void;
}

export default function FileUpload({ onUploadSuccess }: Props) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [permission, requestPermission] = useCameraPermissions();

  const compressAndConvert = async (
    source: 'camera' | 'gallery'
  ): Promise<{ base64: string; fileName: string; uri: string; fileSize: number } | null> => {
    const pickerMethod =
      source === 'camera'
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

    const result = await pickerMethod({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      if (!file.base64) {
        Alert.alert('Erro', 'Não foi possível converter a imagem.');
        return null;
      }

      return {
        base64: file.base64,
        fileName: file.fileName || (source === 'camera' ? 'foto.jpg' : 'imagem.jpg'),
        uri: file.uri,
        fileSize: file.fileSize ?? 0,
      };
    }

    return null;
  };

  const handlePickImage = async () => {
    const result = await compressAndConvert('gallery');
    if (!result) return;

    const upload: UploadModel = {
      nome: result.fileName,
      arquivo: `data:image/jpeg;base64,${result.base64}`,
    };

    onUploadSuccess([upload]);
    setFiles((prev) => [
      ...prev,
      {
        name: result.fileName,
        size: result.fileSize,
        uri: result.uri,
        type: 'image',
      },
    ]);
  };

  const handleTakePhoto = async () => {
    const { granted } = await requestPermission();
    if (!granted) {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
      return;
    }

    const result = await compressAndConvert('camera');
    if (!result) return;

    const upload: UploadModel = {
      nome: result.fileName,
      arquivo: `data:image/jpeg;base64,${result.base64}`,
    };

    onUploadSuccess([upload]);
    setFiles((prev) => [
      ...prev,
      {
        name: result.fileName,
        size: result.fileSize,
        uri: result.uri,
        type: 'photo',
      },
    ]);
  };

  const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const handleRemove = (uri: string) => {
    setFiles((prev) => prev.filter((file) => file.uri !== uri));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Feather name="camera" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Feather name="image" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {files.length > 0 && (
        <View style={styles.fileList}>
          {files.map((file) => (
            <View key={file.uri} style={styles.fileItem}>
              <Image source={{ uri: file.uri }} style={styles.thumbnail} />
              <View style={styles.fileDetails}>
                <Text numberOfLines={1}>{file.name}</Text>
                <Text style={styles.fileSize}>{formatSize(file.size)}</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Visualizar', file.name)}>
                <Feather name="eye" size={18} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(file.uri)}>
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
  fileList: { marginTop: 12 },
  fileItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 6 },
  fileDetails: { flex: 1 },
  fileSize: { fontSize: 12, color: '#888' },
  thumbnail: { width: 40, height: 40, borderRadius: 4 },
});
