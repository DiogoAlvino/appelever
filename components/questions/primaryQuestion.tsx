import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontSize, border, width, heigth, margin, padding, gap, shadow } from '~/theme';


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
    backgroundColor: colors.primaryLight,
    borderRadius: border.radius,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  itemTitle: {
    fontWeight: '500',
    fontSize: fontSize.label,
    color: colors.mainColor,
    marginBottom: 4,
  },
  description: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
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
});
