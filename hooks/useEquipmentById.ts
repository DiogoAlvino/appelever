import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { fetchEquipmentById } from '~/services/equipmentService';
import { EquipmentModel } from '~/models/equipmentModel';

export const useEquipmentById = (id: string | undefined) => {
  const [equipment, setEquipment] = useState<EquipmentModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEquipment = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await fetchEquipmentById(id);
      setEquipment(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Equipamento não encontrado');
      Alert.alert('Erro', 'Equipamento não encontrado');
      setEquipment(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, [id]);

  return {
    equipment,
    loading,
    error,
    reload: loadEquipment,
  };
};
