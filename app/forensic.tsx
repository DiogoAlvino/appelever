import Feather from "@expo/vector-icons/build/Feather";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AlertMessage from "~/components/messages/alertMessage";
import { colors, fontSize } from '~/theme';
import { router, useLocalSearchParams } from "expo-router";
import MainButton from "~/components/buttons/mainButton";
import ForensicSection from "~/components/sections/forensicSection";

export default function ForensicPage() {

  const handleReport = () => {
    router.push({
      pathname: '/equipments',
    });
  };

  function goToDashboard() {
    router.push("/")
  }

  return (
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
