import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import SearchInput from '~/components/inputs/searchInput';
import ForensicList from '~/components/lists/forensicList';
import { useForensicList } from '~/hooks/useForensicList';
import FeedbackModal from '~/components/modal/feedbackModal';
import { useAuth } from '~/hooks/useAuth';

export default function Forensics() {
  const { user } = useAuth();
  const { forensics, loadingForensics, fetchForensics } = useForensicList();

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (user?.email) {
      fetchForensics(user.email);
    }
  }, [user?.email]);

  if (loadingForensics) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchInput onSearch={() => fetchForensics(user?.email || '')} />
        <View style={styles.bar}>
          <Text>Total: {forensics.length}</Text>
        </View>

        <ForensicList
          forensics={forensics}
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
