import { ScrollView, StyleSheet, Text } from 'react-native';
import PrimaryInput from '~/components/inputs/primaryInput';
import SearchInput from '~/components/inputs/searchInput';
import InspectionList from '~/components/lists/inspectionList';
import PrimarySection from '~/components/sections/primarySection';
import SecondarySection from '~/components/sections/secondarySection';
import { inspections } from '~/data/questions';

import { colors } from '~/theme';

export default function Inspections() {
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <SearchInput onSearch={() => {}} />
      <InspectionList inspections={inspections} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: colors.bgScreen,
  },
  buttons: {
    width: '100%',
    gap: 10,
  },
});
