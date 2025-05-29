import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FeedbackModalProps {
  visible: boolean;
  type: 'loading' | 'success' | 'error' | 'info' | 'confirm';
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  showCloseButton?: boolean;
}

export default function FeedbackModal({
  visible,
  type,
  message,
  onClose,
  onConfirm,
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
      case 'confirm':
        return <Ionicons name="help-circle" size={60} color="#173A64" />;
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

          {type === 'confirm' ? (
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>
            </View>
          ) : (
            type !== 'loading' &&
            showCloseButton && (
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            )
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
    width: 350,
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
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#173A64',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
