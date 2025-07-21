import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { fetchEquipments } from '~/services/equipmentService';
import { EquipmentModel } from '~/models/equipmentModel';

export const useEquipments = () => {
  const [equipments, setEquipments] = useState<EquipmentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEquipments = async () => {
    try {
      setLoading(true);
      const data: EquipmentModel[] = await fetchEquipments();
      setEquipments(data); // Agora mantém o objeto completo
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar equipamentos');
      Alert.alert('Erro', 'Não foi possível carregar os equipamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  return {
    equipments,
    loading,
    error,
    reload: loadEquipments,
  };
};
