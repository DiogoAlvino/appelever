import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import SearchInput from '~/components/inputs/searchInput';
import InspectionList from '~/components/lists/inspectionList';
import { useInspections } from '~/hooks/useInspections';
import FeedbackModal from '~/components/modal/feedbackModal';
import { useAuth } from '~/hooks/useAuth';

export default function Inspections() {
  const { user } = useAuth();
  const { inspections, loading, fetchInspections } = useInspections();

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

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
        <SearchInput onSearch={() => fetchInspections(user?.email || '')} />
        <View style={styles.bar}>
          <Text>Total: {inspections.length}</Text>
        </View>

        <InspectionList
          inspections={inspections}
          onError={(msg) => {
            setFeedbackMessage(msg);
            setFeedbackVisible(true);
          }}
          selectedId={null}
          onSelect={() => {}}
        />
      </ScrollView>

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
