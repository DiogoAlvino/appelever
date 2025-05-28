import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FeedbackModalProps {
  visible: boolean;
  type: 'loading' | 'success' | 'error' | 'info';
  message?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function FeedbackModal({
  visible,
  type,
  message,
  onClose,
  showCloseButton = true,
}: FeedbackModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={60} color="green" />;
      case 'error':
        return <Ionicons name="close-circle" size={60} color="red" />;
      case 'info':
        return <Ionicons name="information-circle" size={60} color="#007bff" />;
      default:
        return <ActivityIndicator size="large" color="#173A64" />;
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {getIcon()}
          {message && <Text style={styles.message}>{message}</Text>}

          {type !== 'loading' && showCloseButton && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#173A64',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
