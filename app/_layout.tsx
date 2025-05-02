import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function RootLayout() {
  return (
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="equipmentRegistration" options={{ title: 'Cadastro de Equipamento' }} />
        <Stack.Screen name="normativeInspection" options={{ title: 'Inspecao Normativa' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>


  );
}
