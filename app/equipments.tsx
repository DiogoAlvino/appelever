import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, RefreshControl } from 'react-native';

import MainButton from '~/components/buttons/mainButton';
import SearchInput from '~/components/inputs/searchInput';
import TabBar from '~/components/layout/tabBar';
import EquipmentList from '~/components/lists/equipamentList';
import { useEquipments } from '~/hooks/useEquipments';
import AlertMessage from '~/components/messages/alertMessage';
import { EquipmentDetailsModel } from '~/models/equipmentDetailsModel';
import { EquipmentModel } from '~/models/equipmentModel';

export default function Equipments() {
  const { equipments, loading, reload } = useEquipments();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredEquipments, setFilteredEquipments] = useState(equipments);

  useEffect(() => {
  if (!searchText) {
    setFilteredEquipments(equipments);
    return;
  }

  const text = searchText.toLowerCase();

  const filtered = equipments.filter((equip: EquipmentModel) => {
  return (
    equip.id?.toLowerCase().includes(text) ||
    equip.responsavel?.nome?.toLowerCase().includes(text) ||
    equip.responsavel?.funcao?.toLowerCase().includes(text) ||
    equip.local?.logradouro?.toLowerCase().includes(text) ||
    equip.local?.bairro?.toLowerCase().includes(text) ||
    equip.detalhes_equipamento?.modelo?.toLowerCase().includes(text) ||
    equip.detalhes_equipamento?.fabricante?.toLowerCase().includes(text) ||
    equip.detalhes_equipamento?.cnpj?.toLowerCase().includes(text) ||
    equip.empresa_conservadora?.razaoSocial?.toLowerCase().includes(text) ||
    equip.empresa_conservadora?.cnpj?.toLowerCase().includes(text)
  );
});

  setFilteredEquipments(filtered);
}, [searchText, equipments]);





  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleCancel = () => setSelectedId(null);

  const handleInspect = () => {
    if (selectedId) {
      router.push({
        pathname: '/normativeInspection/[equipmentId]',
        params: { equipmentId: selectedId },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    < >
      <View style={styles.page} >
        <ScrollView contentContainerStyle={styles.container} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <SearchInput onSearch={setSearchText} />
          <AlertMessage
            type="info"
            message="Selecione apenas um equipamento para realizar a inspeção."
          />
          <View style={styles.bar}>
            <Text>Total: {equipments.length}</Text>
          </View>
          <EquipmentList
            equipments={filteredEquipments}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
          />
        </ScrollView>

        {selectedId && (
          <View style={styles.buttonGroup}>
            <MainButton title="Inspecionar" onPress={handleInspect} />
            <MainButton title="Cancelar" onPress={handleCancel} type="secondary" />
          </View>
        )}
      </View>
      <TabBar
        tabs={[
          { icon: 'home', label: 'Inicio', route: '/' },
          { icon: 'plus-circle', label: 'Cadastrar', route: '/equipmentRegistration' },
          { icon: 'list', label: 'Inpeções', route: '/inspections' },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 100,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonGroup: {
    width: "100%",
    position: 'absolute',
    padding: 10,
    bottom: 1,
    gap: 10,
    backgroundColor: 'white',
  },
});
