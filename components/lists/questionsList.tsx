import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryQuestion from '../questions/primaryQuestion';
import PrimaryHelper from '../helpers/primaryHelper';
import { Feather } from '@expo/vector-icons';

interface QuestionsListProps {
  questoes: {
    id: string;
    verification: string;
    priority: string;
    risk: string;
    mitigation: string;
  }[];
  respostas: { [id: string]: 'sim' | 'nao' | 'na' | null };
  onResponder: (id: string, value: 'sim' | 'nao' | 'na' | null) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'alto':
      return '#FF4D4F';
    case 'medio':
    case 'médio':
      return '#FAAD14';
    case 'baixo':
      return '#52C41A';
    default:
      return '#D9D9D9';
  }
};

export default function QuestionsList({ questoes, respostas, onResponder }: QuestionsListProps) {
  const [helperVisible, setHelperVisible] = useState(false);
  const [helperContent, setHelperContent] = useState<{ title: string; description: React.ReactNode }>({
    title: '',
    description: '',
  });
  

  const abrirHelper = (risk: string, mitigation: string) => {
    setHelperContent({
      title: 'Risco e Mitigação',
      description: (
        <View>
          <Text style={styles.sectionTitle}>Risco</Text>
          <Text style={styles.sectionText}>{risk}</Text>
    
          <View style={{ height: 12 }} />
    
          <Text style={styles.sectionTitle}>Mitigação</Text>
          <Text style={styles.sectionText}>{mitigation}</Text>
        </View>
      ),
    });
    
    setHelperVisible(true);
  };

  return (
    <>
      {questoes.map((q) => {
        const color = getPriorityColor(q.priority);

        return (
          <PrimaryQuestion
            key={q.id}
            title={
              <View style={styles.titleContainer}>
                <View style={styles.titleLeft}>
                  <Text style={styles.titleText}>{`Item ${q.id}`}</Text>
                  <View style={[styles.priorityDot, { backgroundColor: color }]} />
                </View>
            
                <TouchableOpacity onPress={() => abrirHelper(q.risk, q.mitigation)}>
                  <Feather name="help-circle" size={20} color="#173A64" />
                </TouchableOpacity>
              </View>
            }            
            description={q.verification}
            selectedOption={respostas[q.id] || null}
            onSelect={(value) =>
              onResponder(q.id, respostas[q.id] === value ? null : value)
            }
          />
        );
      })}

      <PrimaryHelper
        visible={helperVisible}
        onClose={() => setHelperVisible(false)}
        title={helperContent.title}
        description={helperContent.description}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    width: "100%",
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  priorityDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#173A64',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  
});

