import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, fontSize, border } from '~/theme';
import FileUpload from '../inputs/fileUpload';
import { UploadWithMeta } from '~/models/uploadModel';
import PrimaryInput from '../inputs/primaryInput';
import { Feather } from '@expo/vector-icons';

interface PrimaryQuestionProps {
  title: React.ReactNode;
  description: string;
  selectedOption: 'sim' | 'nao' | 'na' | null;
  onSelect: (value: 'sim' | 'nao' | 'na') => void;
  onUploadSuccess: (uploads: UploadWithMeta[]) => void;
  onRemoveImage?: (questionId: string, uri: string) => void;
  uploads: UploadWithMeta[];
  onObservationChange: (questionId: string, text: string) => void;
  questionId: string;
  observation?: string;
}

export default function PrimaryQuestion({
  title,
  description,
  selectedOption,
  onSelect,
  onUploadSuccess,
  onRemoveImage,
  onObservationChange,
  uploads,
  questionId,
  observation = '',
}: PrimaryQuestionProps) {
  const [localObservation, setLocalObservation] = useState(observation);

  const handleObservationChange = (text: string) => {
    setLocalObservation(text);
    onObservationChange(questionId, text);
  };

  const Option = ({ label, value }: { label: string; value: 'sim' | 'nao' | 'na' }) => (
    <TouchableOpacity style={styles.option} onPress={() => onSelect(value)}>
      <View style={[styles.circle, selectedOption === value && styles.circleSelected]} />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.optionsContainer}>
        <Option label="Sim" value="sim" />
        <Option label="Não" value="nao" />
        <Option label="NA" value="na" />
      </View>

      {selectedOption && (
        <>
          <FileUpload onUploadSuccess={(newUploads) => onUploadSuccess(newUploads)} />

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
                  <TouchableOpacity
                    onPress={() => {
                      // Aqui você pode implementar visualização se desejar
                    }}
                    style={styles.iconButton}
                  >
                    <Feather name="eye" size={18} color="#007bff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onRemoveImage?.(questionId, file.id)}
                    style={styles.iconButton}
                  >
                    <Feather name="trash-2" size={18} color="#dc3545" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View style={{ paddingTop: 15 }}>
            <PrimaryInput
              label="Observação (opcional)"
              value={localObservation}
              onChangeText={handleObservationChange}
              placeholder="Digite uma observação"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: border.radius,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.bgInfo,
  },
  itemTitle: {
    fontWeight: '500',
    fontSize: fontSize.label,
    color: colors.mainColor,
    marginBottom: 4,
    paddingBottom: 10,
  },
  description: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.mainColor,
    marginRight: 6,
  },
  circleSelected: {
    backgroundColor: colors.mainColor,
  },
  optionText: {
    color: colors.mainColor,
    fontSize: fontSize.placeholder,
    fontWeight: '500',
  },
  uploadedList: {
    marginTop: 10,
  },
  uploadedTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: colors.primaryDark,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  fileDetails: {
    flex: 1,
  },
  fileSize: {
    fontSize: 12,
    color: '#888',
  },
  iconButton: {
    padding: 4,
  },
});
