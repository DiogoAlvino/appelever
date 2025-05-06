import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false, headerTitle: 'Menu' }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="singUp" options={{ headerShown: false }} />
        <Stack.Screen name="equipmentRegistration" options={{ title: 'Cadastro de Equipamento' }} />
        <Stack.Screen name="normativeInspection/[equipmentId]" options={{ title: 'Inspecao Normativa' }} />
        <Stack.Screen name="equipmentForm/[equipmentId]" options={{ title: 'Ficha de Equipamento' }} />
        <Stack.Screen name="inspections" options={{ title: 'Lista de inspeções' }} />
        <Stack.Screen name="equipments" options={{ title: 'Lista de equipamentos' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>


  );
}
