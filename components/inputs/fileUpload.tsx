import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { UploadWithMeta } from '~/models/uploadModel';
import { colors } from '~/theme';

interface Props {
  onUploadSuccess: (files: UploadWithMeta[]) => void;
}

export default function FileUpload({ onUploadSuccess }: Props) {
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

    const upload: UploadWithMeta = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      nome: result.fileName,
      arquivo: `data:image/jpeg;base64,${result.base64}`,
      uri: result.uri,
      size: result.fileSize,
    };


    onUploadSuccess([upload]);
  };

  const handleTakePhoto = async () => {
    const { granted } = await requestPermission();
    if (!granted) {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
      return;
    }

    const result = await compressAndConvert('camera');
    if (!result) return;

    const upload: UploadWithMeta = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      nome: result.fileName,
      arquivo: `data:image/jpeg;base64,${result.base64}`,
      uri: result.uri,
      size: result.fileSize,
    };


    onUploadSuccess([upload]);
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
});
