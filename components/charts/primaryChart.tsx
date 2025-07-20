import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { useAuth } from '~/hooks/useAuth';

export default function PrimaryChart() {
  const screenWidth = Dimensions.get('window').width;
  const { user } = useAuth();

  const [equipmentCount, setEquipmentCount] = useState(0);
  const [inspectionCount, setInspectionCount] = useState(0);
  const [forensicCount, setForensicCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    const fetchCounts = async () => {
      try {
        const eqRef = collection(db, 'equipamentos');
        const eqQuery = query(eqRef, where('usuario', '==', user.email));
        const eqSnap = await getDocs(eqQuery);
        setEquipmentCount(eqSnap.size);

        const inspRef = collection(db, 'inspections');
        const inspQuery = query(inspRef, where('usuario', '==', user.email));
        const inspSnap = await getDocs(inspQuery);
        setInspectionCount(inspSnap.size);

        const forensicRef = collection(db, 'forensic');
        const forensicQuery = query(forensicRef, where('usuario', '==', user.email));
        const forensicSnap = await getDocs(forensicQuery);
        setForensicCount(forensicSnap.size);

      } catch (error) {
        console.error('Erro ao buscar contadores:', error);
      }
    };

    fetchCounts();
  }, [user?.email]);

  const data = [
    { name: 'Equipamentos', population: equipmentCount, color: '#2D5BBA', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Inspeções', population: inspectionCount, color: '#6B91E4', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Análises', population: forensicCount, color: '#122F52', legendFontColor: '#333', legendFontSize: 14 },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Serviços realizados</Text>
      <PieChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{ color: () => '#000' }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft=""
        center={[10, 0]}
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    paddingTop: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#122F52',
  },
});
