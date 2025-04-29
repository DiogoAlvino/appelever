import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, View, StyleSheet, Text } from 'react-native';


export default function PrimaryChart() {
  const screenWidth = Dimensions.get('window').width;

  const data = [
    { name: 'Equipamentos', population: 35, color: '#2D5BBA', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Inspeções', population: 25, color: '#6B91E4', legendFontColor: '#333', legendFontSize: 14 },
    { name: 'Relatórios', population: 40, color: '#122F52', legendFontColor: '#333', legendFontSize: 14 },
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
    card : {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10
    },
    title : {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
        fontWeight: '500',
        color: '#122F52'
    }
    
})
