import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PrimaryQuestionProps {
  title: string;
  description: string;
  selectedOption: 'sim' | 'nao' | 'na' | null;
  onSelect: (value: 'sim' | 'nao' | 'na') => void;
}

export default function PrimaryQuestion({ title, description, selectedOption, onSelect }: PrimaryQuestionProps) {
  const Option = ({ label, value }: { label: string, value: 'sim' | 'nao' | 'na' }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => onSelect(value)}
    >
      <View style={[
        styles.circle,
        selectedOption === value && styles.circleSelected
      ]} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#173A64',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#173A64',
    marginRight: 6,
  },
  circleSelected: {
    backgroundColor: '#173A64',
  },
  optionText: {
    color: '#173A64',
    fontSize: 14,
  },
});
