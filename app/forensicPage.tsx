import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AlertMessage from "~/components/messages/alertMessage";
import { colors, fontSize } from '~/theme';
import ForensicSection from "~/components/sections/forensicSection";
import TabBar from "~/components/layout/tabBar";

export default function ForensicPage() {

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

        <ForensicSection />

      </ScrollView>
      <TabBar
        tabs={[
          { icon: 'home', label: 'Inicio', route: '/' },
          { icon: 'tool', label: 'Equipamentos', route: '/equipments' },
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
