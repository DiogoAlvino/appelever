// app/_layout.tsx  ou app/layout.tsx
import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: '#F5FAFF',
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
