import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { border, colors, fontSize } from '~/theme';
import MainButton from './mainButton';

const OPENCAGE_API_KEY = '25cec5c47001443785b8c9c55021bb44'; // Coloque aqui a chave do OpenCage
interface Props {
  value: {
    address: string;
    latitude: number;
    longitude: number;
  } | null;
  onChange: (local: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export default function LocationButton({ value, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [locationInfo, setLocationInfo] = useState<{ address: string; latitude: number; longitude: number } | null>(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleGetCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return alert('Permissão negada');

    const location = await Location.getCurrentPositionAsync({});

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=${OPENCAGE_API_KEY}&language=pt-BR`
      );
      const data = await response.json();
      console.log('OPENCAGE RESPONSE:', JSON.stringify(data, null, 2));

      let address = 'Endereço não encontrado';
      if (data.results.length > 0) {
        address = data.results[0].formatted;
      }

      onChange({
        address,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao buscar endereço no OpenCage:', error);
      Alert.alert('Erro', 'Não foi possível obter o endereço.');
    }
  };

  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.length < 3) return;

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(text)}&key=${OPENCAGE_API_KEY}&language=pt-BR`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSelectPlace = (item: any) => {
    onChange({
      address: item.formatted,
      latitude: item.geometry.lat,
      longitude: item.geometry.lng,
    });
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Ionicons name="location-outline" size={20} color="#173A64" />
        <Text style={styles.buttonText}>Adicionar localização</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.title}>Selecionar Localização</Text>

          <TouchableOpacity onPress={handleGetCurrentLocation}>
            <Text style={styles.link}>Usar minha localização atual</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Buscar endereço..."
            value={search}
            onChangeText={handleSearch}
          />

          <FlatList
            data={results}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectPlace(item)}>
                <Text style={styles.result}>{item.formatted}</Text>
              </TouchableOpacity>
            )}
          />

          <MainButton title='Fechar' type="secondary" onPress={() => setModalVisible(false)} />

        </View>
      </Modal>

      {value && (
        <View style={styles.info}>
          <Text style={styles.textoInfo}>{value.address}</Text>
          <Text style={styles.textoInfo}>Lat: {value.latitude}, Lng: {value.longitude}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    padding: 12,
    borderColor: '#173A64',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    color: '#173A64',
    fontWeight: '600',
  },
  modal: {
    padding: 20,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: colors.primaryDark
  },
  link: {
    color: colors.primaryLight,
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontSize: 18,
    backgroundColor: colors.mainColor,
    borderRadius: border.radius,
    marginBottom: 20,

  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginBottom: 20,
    fontSize: 18,
  },
  result: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 2,
  },
  closeText: {
    color: 'red',
    fontWeight: '600',
    borderWidth: 1,
  },
  info: {
    marginTop: 2,
    paddingHorizontal: 1,
  },
  textoInfo: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark
  }
});
