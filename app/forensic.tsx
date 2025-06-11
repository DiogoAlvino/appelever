import Feather from "@expo/vector-icons/build/Feather";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AlertMessage from "~/components/messages/alertMessage";
import SecondarySection from "~/components/sections/secondarySection";
import { colors, fontSize } from '~/theme';
import { router, useLocalSearchParams } from "expo-router";
import MainButton from "~/components/buttons/mainButton";
import { useEquipmentById } from '~/hooks/useEquipmentById';
import InspectionSection from "~/components/sections/inspectionSection";
import ForensicSection from "~/components/sections/forensicSection";

export default function ForensicPage() {
 
  const handleReport = () => {
    router.push({
      pathname: '/equipments',
    });
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      
      <AlertMessage
        type="info"
        message="Os modulos abaixo possui os campos necessarios para usa analise forense"
      />

      <ForensicSection />

    
        <View style={{ width: '100%', gap: 10 }}>
          <MainButton title="Finalizar" onPress={handleReport} />
          <MainButton title="Cancelar" onPress={handleReport} type="secondary" />
        </View>
    

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
