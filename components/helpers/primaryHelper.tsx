import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Dimensions, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface PrimaryHelperProps {
  imageSource?: any;
  description: string;
  onClose: () => void;
  title: string;
  visible: boolean;
}

export default function PrimaryHelper({
  imageSource,
  description,
  onClose,
  title,
  visible,
}: PrimaryHelperProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color="#173A64" />
            </TouchableOpacity>
          </View>

          {imageSource && (
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.description}>{description}</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: screenWidth * 0.85,
    maxHeight: screenHeight * 0.7,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#173A64',
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
});
