import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontSize, border } from '~/theme';
import FileUpload from '../inputs/fileUpload';
import { UploadModel } from '~/models/uploadModel';
import PrimaryInput from '../inputs/primaryInput';
import { useState } from 'react';

interface PrimaryQuestionProps {
  title: React.ReactNode;
  description: string;
  selectedOption: 'sim' | 'nao' | 'na' | null;
  onSelect: (value: 'sim' | 'nao' | 'na') => void;
  onUploadSuccess: (uploads: UploadModel[]) => void;
  uploads: UploadModel[];
  questionId: string;
}

export default function PrimaryQuestion({
  title,
  description,
  selectedOption,
  onSelect,
  onUploadSuccess,
  uploads,
}: PrimaryQuestionProps) {
  const Option = ({ label, value }: { label: string; value: 'sim' | 'nao' | 'na' }) => (
    <TouchableOpacity style={styles.option} onPress={() => onSelect(value)}>
      <View style={[styles.circle, selectedOption === value && styles.circleSelected]} />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );

  const [observacao, setObservacao] = useState('');

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
        <View>
          <FileUpload onUploadSuccess={onUploadSuccess} />
          {uploads.length > 0 && (
            <View style={styles.uploadedList}>
              <Text style={styles.uploadedTitle}>Imagens enviadas:</Text>
              {uploads.map((file, index) => (
                <Text key={`${file.nome}-${index}`} style={styles.uploadedItem}>
                  {file.nome}
                </Text>
              ))}
            </View>
          )}
          <View style={{paddingTop: 15}}>
              <PrimaryInput
                label="Observação (opcional)"
                value={observacao}
                onChangeText={setObservacao}
                placeholder='Digite uma observação'
              />
          </View>
          
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
    marginBottom: 4,
    color: colors.primaryDark,
  },
  uploadedItem: {
    fontSize: 12,
    color: '#555',
  },
});