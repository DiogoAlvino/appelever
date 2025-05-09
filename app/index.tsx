import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, View, StyleSheet, Text, ImageBackground } from "react-native";
import BlockButton from "~/components/buttons/blockButton";
import MenuButton from "~/components/buttons/menuButton";
import PrimaryChart from "~/components/charts/primaryChart";
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';


export default function HomePage() {

    function goToEquipmentRegistration(){
        router.push("/equipmentRegistration")
    }

    function goToNormativeInpection(){
        router.push("/equipments")
    }

    function goToInspectionList(){
        router.push("/inspections")
    }

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <ImageBackground source={require('~/assets/bg-login.png')} style={styles.card}>
                <View style={styles.cardButtons}>
                    <MenuButton />
                </View>
                <Text style={styles.cardTitle}>Olá, usuario!</Text>
            </ImageBackground>
            <View style={styles.services}>
                <Text style={styles.servicesTitle}>Serviços</Text>
                <View style={styles.servicesButtons}>
                    <BlockButton
                        icon={<MaterialCommunityIcons name="square-edit-outline" size={36} color="#fff" />}
                        label="Cadastrar Equipamento"
                        onPress={goToEquipmentRegistration}
                    />
                    <BlockButton
                        icon={<MaterialCommunityIcons name="checkbox-marked-outline" size={36} color="#fff" />}
                        label="Inspeção Normativa"
                        onPress={goToNormativeInpection}
                    />
                    <BlockButton
                        icon={<MaterialCommunityIcons name="format-list-bulleted" size={36} color="#fff" />}
                        label="Lista de inspeções"
                        onPress={goToInspectionList}
                    />
                    <BlockButton
                        icon={<MaterialCommunityIcons name="text-box-search-outline" size={36} color="#fff" />}
                        label="Analise Forense"
                        onPress={() => console.log('Botão clicado')}
                    />
                </View>
            </View>
            <View style={styles.dashboard}>
                <Text style={styles.dashboardTitle}>Dashboard</Text>
                <View>
                    <PrimaryChart/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        flexDirection: "column",
    },
    card: {
        backgroundColor: colors.mainColor,
        width: "100%",
        height: 250,
        justifyContent: "space-around",
    },
    cardButtons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    cardTitle: {
        color: "white",
        fontSize: fontSize.dash,
        justifyContent: "flex-start",
        fontWeight: "400",
        paddingHorizontal: 20,
    },
    services: {
        width: "100%",
        paddingHorizontal: 20,
    },
    servicesButtons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    servicesTitle:{
        fontSize: fontSize.label,
        fontWeight: "500",
        color: colors.primaryDark,
        paddingBottom:  8
    },
    dashboard: {
        width: "100%",
        paddingHorizontal: 20,
    },
    dashboardTitle: {
        fontSize: fontSize.label,
        fontWeight: "500",
        color: colors.primaryDark,
        paddingBottom:  8
    }
});