import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import SearchInput from '~/components/inputs/searchInput';
import ForensicList from '~/components/lists/forensicList';
import { useForensicList } from '~/hooks/useForensicList';
import FeedbackModal from '~/components/modal/feedbackModal';
import { useAuth } from '~/hooks/useAuth';
import TabBar from '~/components/layout/tabBar';

export default function Forensics() {
  const { user } = useAuth();
  const { forensics, loadingForensics, fetchForensics } = useForensicList();

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [searchText, setSearchText] = useState('');
  const [filteredForensics, setFilteredForensics] = useState(forensics);

  useEffect(() => {
  if (!searchText) {
    setFilteredForensics(forensics);
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

  const filtered = forensics.filter(f => includesText(f));
  setFilteredForensics(filtered);
}, [searchText, forensics]);


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
        <SearchInput onSearch={setSearchText} />
        <View style={styles.bar}>
          <Text>Total: {filteredForensics.length}</Text>
        </View>

        <ForensicList
          forensics={filteredForensics}
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
          { icon: 'plus-circle', label: 'Nova análise', route: '/forensicPage' },
          { icon: 'list', label: 'Inpeções', route: '/inspections' },
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
