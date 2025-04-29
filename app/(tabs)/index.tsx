import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Header from '~/components/layout/header';
import { ScreenContent } from '~/components/ScreenContent';

import { EquipmentRegistration } from '~/views/equipmentRegistration';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Header title="Cadastro de equipamento" />

      <View style={styles.container}>
        {/*<EquipmentRegistration path="app/(tabs)/index.tsx" title="Tab One" />*/}
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
