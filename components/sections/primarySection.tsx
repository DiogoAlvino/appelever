import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PrimarySectionProps {
  title: string;
  children: ReactNode;
}

export default function PrimarySection({ title, children }: PrimarySectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1E3A5F',
    marginBottom: 14,
  },
  content: {
    gap: 20,
  },
});
