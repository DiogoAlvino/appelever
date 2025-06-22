import { useLocalSearchParams, router } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PreviewImageScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  if (!uri) {
    return (
      <View style={styles.center}>
        <Text>Imagem não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
