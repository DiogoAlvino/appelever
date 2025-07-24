import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import SearchInput from '~/components/inputs/searchInput';
import InspectionList from '~/components/lists/inspectionList';
import { useInspections } from '~/hooks/useInspections';
import FeedbackModal from '~/components/modal/feedbackModal';
import { useAuth } from '~/hooks/useAuth';
import TabBar from '~/components/layout/tabBar';
import { InspectionModel } from '~/models/inspectionModel';

export default function Inspections() {
  const { user } = useAuth();
  const { inspections, loading, fetchInspections } = useInspections();

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [searchText, setSearchText] = useState('');
const [filteredInspections, setFilteredInspections] = useState<InspectionModel[]>(inspections);

useEffect(() => {
  if (!searchText) {
    setFilteredInspections(inspections);
    return;
  }

  const text = searchText.toLowerCase();

  const includesText = (value: any): boolean => {
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value).toLowerCase().includes(text);
    }
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(includesText);
    }
    return false;
  };

  const filtered = inspections.filter(insp => includesText(insp));
  setFilteredInspections(filtered);
}, [searchText, inspections]);



  useEffect(() => {
    if (user?.email) {
      fetchInspections(user.email);
    }
  }, [user?.email]);

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
        <SearchInput onSearch={setSearchText} />
        <View style={styles.bar}>
          <Text>Total: {filteredInspections.length}</Text>
        </View>

        <InspectionList
          inspections={filteredInspections}
          onError={(msg) => {
            setFeedbackMessage(msg);
            setFeedbackVisible(true);
          }}
          selectedId={null}
          onSelect={() => {}}
        />
      </ScrollView>
      <TabBar
        tabs={[
          { icon: 'home', label: 'Inicio', route: '/' },
          { icon: 'plus-circle', label: 'Nova inspeção', route: '/equipments' },
          { icon: 'tool', label: 'Cadastrar equipamento', route: '/equipmentRegistration' },
        ]}
      />

      <FeedbackModal
        visible={feedbackVisible}
        type="error"
        message={feedbackMessage}
        onClose={() => setFeedbackVisible(false)}
      />

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
