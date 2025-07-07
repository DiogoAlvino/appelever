import { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Audio, AVPlaybackStatus, } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { colors } from '~/theme';
import { Buffer } from 'buffer';

if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;

const ASSEMBLYAI_API_KEY = '476ceef22d284a3e94722b323d8d2236';

interface VoiceInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function VoiceInput({ value, onChangeText }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Erro ao iniciar gravação:', err);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) await transcribeAudio(uri);
    } catch (err) {
      console.error('Erro ao parar gravação:', err);
    }
  };

  const transcribeAudio = async (uri: string) => {
    try {
      setLoading(true);
      const base64Audio = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const audioBuffer = Buffer.from(base64Audio, 'base64');

      const uploadRes = await axios.post('https://api.assemblyai.com/v2/upload', audioBuffer, {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
          'Content-Type': 'application/octet-stream',
        },
      });

      const audioUrl = uploadRes.data.upload_url;

      const transcriptRes = await axios.post('https://api.assemblyai.com/v2/transcript', {
        audio_url: audioUrl,
        language_code: 'pt',
      }, {
        headers: { authorization: ASSEMBLYAI_API_KEY },
      });

      const transcriptId = transcriptRes.data.id;

      let transcriptText = '';
      while (true) {
        const pollingRes = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: { authorization: ASSEMBLYAI_API_KEY },
        });

        if (pollingRes.data.status === 'completed') {
          transcriptText = pollingRes.data.text;
          break;
        } else if (pollingRes.data.status === 'failed') {
          Alert.alert('Erro', 'Falha na transcrição.');
          setLoading(false);
          return;
        }

        await new Promise(res => setTimeout(res, 2000));
      }

      onChangeText(value + (value ? ' ' : '') + transcriptText);
    } catch (err) {
      console.error('Erro na transcrição:', err);
      Alert.alert('Erro', 'Não foi possível transcrever o áudio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite ou grave um áudio"
        placeholderTextColor="#aaa"
        multiline
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.primaryDark} />
        ) : (
          <Feather name="mic" size={24} color={isRecording ? 'red' : '#ccc'} />

        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primaryLight,
  },
  input: {
    flex: 1,
    color: colors.primaryDark,
    fontSize: 16,
  },
});
