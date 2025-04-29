import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Header from '~/components/layout/header';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Header title="Cadastro de equipamento" />

      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/index.tsx" title="Tab One" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
