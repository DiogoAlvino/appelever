import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AlertMessage from "~/components/messages/alertMessage";
import { colors, fontSize } from '~/theme';
import ForensicSection from "~/components/sections/forensicSection";
import TabBar from "~/components/layout/tabBar";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function ForensicPage() {
  const [showSection, setShowSection] = useState(false);
  const { mode } = useLocalSearchParams();
  const timeLoading = 4500; //4,5 segundos

  useEffect(() => {
    if (mode === 'edit') {
      const timer = setTimeout(() => {
        setShowSection(true);
      }, timeLoading);

      return () => clearTimeout(timer);
    } else {
      setShowSection(true);
    }
  }, [mode]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>

        <AlertMessage
          type="info"
          message="Os módulos abaixo estão relacionados à Análise Forense."
        />

        <AlertMessage
          type="info"
          message="Os módulos não possuem uma ordem obrigatória de preenchimento. Preencha conforme a sua necessidade."
        />

        <View style={{ display: showSection ? 'flex' : 'none', width: '100%' }}>
          <ForensicSection />
        </View>

        {!showSection && (
          <>
            <ActivityIndicator size="large" color="#173A64" style={{ marginTop: 20 }} />
            <Text style={[styles.text, { marginTop: 10 }]}>Carregando análise...</Text>
          </>
        )}
      </ScrollView>

      <TabBar
        tabs={[
          { icon: 'home', label: 'Inicio', route: '/' },
          { icon: 'search', label: 'Análises', route: '/forensics' },
          { icon: 'list', label: 'Inpeções', route: '/inspections' },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: "column",
    gap: 8,
    paddingVertical: 5,
    width: "100%",
  },
  text: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
});
