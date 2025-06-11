import { Stack, router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/utils/firebase';

export default function RootLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário logado
        if (pathname === "/login" || pathname === "/signUp") {
          router.replace("/");
        }
      } else {
        // Não logado
        if (pathname !== "/login" && pathname !== "/signUp") {
          router.replace("/login");
        }
      }
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, [pathname]);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        <Stack.Screen name="forensic" options={{ title: 'Analise Forente' }} />
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
