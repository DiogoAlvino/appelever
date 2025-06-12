// components/buttons/locationButton.tsx
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const GOOGLE_API_KEY = 'AIzaSyAfODKuAjbLnq3OJ3tPTESua-N1dDaY_wI';

export default function LocationButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [locationInfo, setLocationInfo] = useState<{ address: string; latitude: number; longitude: number } | null>(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleGetCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return alert('Permissão negada');

    const location = await Location.getCurrentPositionAsync({});
    const addressInfo = await Location.reverseGeocodeAsync(location.coords);

    const address = `${addressInfo[0]?.street}, ${addressInfo[0]?.city}`;
    setLocationInfo({ address, latitude: location.coords.latitude, longitude: location.coords.longitude });
    setModalVisible(false);
  };

  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.length < 3) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          text
        )}&key=${GOOGLE_API_KEY}&language=pt-BR`
      );
      const data = await response.json();
      setResults(data.predictions);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSelectPlace = async (placeId: string, description: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      const location = data.result.geometry.location;

      setLocationInfo({
        address: description,
        latitude: location.lat,
        longitude: location.lng,
      });
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao obter detalhes do local:', error);
    }
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
            <Text style={styles.link}>📍 Usar minha localização atual</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Buscar endereço..."
            value={search}
            onChangeText={handleSearch}
          />

          <FlatList
            data={results}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectPlace(item.place_id, item.description)}>
                <Text style={styles.result}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {locationInfo && (
        <View style={styles.info}>
          <Text>{locationInfo.address}</Text>
          <Text>Lat: {locationInfo.latitude}, Lng: {locationInfo.longitude}</Text>
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
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  link: {
    color: '#173A64',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  result: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: 'red',
    fontWeight: '600',
  },
  info: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
