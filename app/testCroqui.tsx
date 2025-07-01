import { View, StyleSheet } from 'react-native';
import TestCroqui from '~/components/testCroqui';

export default function CroquiScreen() {
  return (
    <View style={styles.container}>
      <TestCroqui />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
