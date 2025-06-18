import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Feather } from '@expo/vector-icons';
import { colors } from '~/theme';

interface VoiceInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function VoiceInput({ value, onChangeText }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      const spokenText = event.value?.[0] || '';
      onChangeText(value + (value ? ' ' : '') + spokenText);
    };

    Voice.onSpeechEnd = () => setIsRecording(false);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [value]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start('pt-BR');
    } catch (e) {
      console.error('Erro ao iniciar reconhecimento:', e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error('Erro ao parar reconhecimento:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digitar texto"
        placeholderTextColor="#aaa"
        multiline
        value={value}
        onChangeText={onChangeText}
        onBlur={Keyboard.dismiss}
      />
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <Feather name="mic" size={24} color={isRecording ? colors.primaryDark : "#ccc"} />
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
