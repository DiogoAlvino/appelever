import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow } from '~/theme';
import { size } from 'lodash';


interface FileItem {
  name: string;
  size: number;
  uri: string;
}

export default function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleAddFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*', multiple: true });

    if (result.assets) {
      const newFiles = result.assets.map((file) => ({
        name: file.name,
        size: file.size ?? 0,
        uri: file.uri,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemove = (name: string) => {
    setFiles((prev) => prev.filter(file => file.name !== name));
  };

  const formatSize = (bytes: number) => {
    const sizeMB = bytes / (1024 * 1024);
    return `${sizeMB.toFixed(2)} MB`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadBox} onPress={handleAddFiles}>
        <Feather name="upload" size={20} color="#777" />
        <Text style={styles.uploadText}>Adicionar arquivos</Text>
      </TouchableOpacity>

      {files.length > 0 && (
        <View style={styles.fileList}>
          <Text style={styles.fileInfo}>Arquivos anexados ({files.length})</Text>
          {files.map((file) => (
            <View key={file.name} style={styles.fileItem}>
              <Feather name="file" size={20} color="#777" />
              <View style={styles.fileDetails}>
                <Text>{file.name}</Text>
                <Text style={styles.fileSize}>{formatSize(file.size)}</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Visualizar', file.name)}>
                <Feather name="eye" size={18} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(file.name)}>
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
  container: { width: '100%', gap: 12, paddingTop: 16 },
  uploadBox: {
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderStyle: 'dashed',
    borderRadius: border.radius,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  uploadText: {
    color: colors.primaryDark,
    fontSize: 14,
  },
  fileList: {
    backgroundColor: colors.bgGray,
    borderRadius: border.radius,
    padding: 12,
  },
  fileInfo: {
    fontSize: 12,
    color: colors.primaryDark,
    marginBottom: 8,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  fileDetails: {
    flex: 1,
    color: colors.primaryDark
  },
  fileSize: {
    fontSize: 12,
    color: '#888',
  },
});
