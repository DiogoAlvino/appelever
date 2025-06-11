import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import SearchInput from '~/components/inputs/searchInput';
import InspectionList from '~/components/lists/inspectionList';
import { useInspections } from '~/hooks/useInspections';

export default function Inspections() {
  const { inspections, loading, reload } = useInspections();

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchInput onSearch={reload} />
        <View style={styles.bar}>
          <Text>Filtro</Text>
          <Text>Total: {inspections.length}</Text>
        </View>

        <InspectionList inspections={inspections} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 40,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
