import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { fetchEquipments } from '~/services/equipmentService';

interface EquipmentItem {
  id: string;
  name: string;
  address: string;
}

export const useEquipments = () => {
  const [equipments, setEquipments] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEquipments = async () => {
    try {
      setLoading(true);
      const data = await fetchEquipments();
      const formatted = data.map((item) => ({
        id: item.id || '',
        name: item.detalhes_equipamento.identificacaoEquipamento || 'Sem nome',
        address: `${item.local.logradouro}, ${item.local.numero} - ${item.local.bairro}`,
      }));
      setEquipments(formatted);
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
