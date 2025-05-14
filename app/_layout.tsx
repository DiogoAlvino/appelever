import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#F5FAFF'
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, headerTitle: 'Menu' }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="equipmentRegistration" options={{ title: 'Cadastro de Equipamento' }} />
      <Stack.Screen name="normativeInspection/[equipmentId]" options={{ title: 'Inspeção Normativa' }} />
      <Stack.Screen name="equipmentForm/[equipmentId]" options={{ title: 'Ficha de Equipamento' }} />
      <Stack.Screen name="inspections" options={{ title: 'Lista de inspeções' }} />
      <Stack.Screen name="equipments" options={{ title: 'Lista de equipamentos' }} />
      <Stack.Screen name="reportInspection/[equipmentId]" options={{ title: 'Relatório de Inspeção' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
