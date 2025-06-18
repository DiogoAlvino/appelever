import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { colors, border } from '~/theme';

interface FileItem {
  name: string;
  size: number;
  uri: string;
  type: 'image' | 'file' | 'photo';
}

export default function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const [permission, requestPermission] = useCameraPermissions();

  const handlePickFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*', multiple: true });
    if (result.assets) {
      const newFiles: FileItem[] = result.assets.map((file) => ({
        name: file.name,
        size: file.size ?? 0,
        uri: file.uri,
        type: 'file', 
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      setFiles(prev => [...prev, {
        name: file.fileName || 'imagem.jpg',
        size: file.fileSize ?? 0,
        uri: file.uri,
        type: 'image'
      }]);
    }
  };

  const handleTakePhoto = async () => {
    const { granted } = await requestPermission();
    if (granted) {
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        setFiles((prev) => [...prev, {
          name: file.fileName || 'foto.jpg',
          size: file.fileSize ?? 0,
          uri: file.uri,
          type: 'photo', // fix literal type
        }]);
      }
    } else {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
    }
  };

  const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  const handleRemove = (uri: string) => {
    setFiles((prev) => prev.filter(file => file.uri !== uri));
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
        <TouchableOpacity style={styles.button} onPress={handlePickFiles}>
          <Feather name="paperclip" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {files.length > 0 && (
        <View style={styles.fileList}>
          {files.map((file) => (
            <View key={file.uri} style={styles.fileItem}>
              {file.type === 'image' || file.type === 'photo' ? (
                <Image source={{ uri: file.uri }} style={styles.thumbnail} />
              ) : (
                <Feather name="file" size={20} color="#777" />
              )}
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
