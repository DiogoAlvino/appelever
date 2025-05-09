import { Link, router } from "expo-router";
import { ScrollView, Text, View, StyleSheet, ImageBackground } from "react-native";
import MainButton from "~/components/buttons/mainButton";
import PrimaryInput from "~/components/inputs/primaryInput";
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';

export default function Login(){

    function goToHomepage(){
            router.push("/")
    }

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <ImageBackground source={require('~/assets/bg-login.png')} style={styles.card} resizeMode="cover">
                <View style={styles.cardTexts}>
                    <Text style={styles.cardText}>Bem vindo de volta.</Text>
                    <Text style={styles.cardText}>Vamos lá otimizar o seu trabalho!</Text>
                </View>
            </ImageBackground>
            <View style={styles.cardInputs}>
                <PrimaryInput label="Email" placeholder="Digite seu email" />
                <PrimaryInput label="Senha" placeholder="Digite sua senha" />
                <View style={styles.cardLink}>
                    <Text>Não possui uma conta?</Text>
                    <Link href="/singUp" style={styles.linkText}>Cadastra-se aqui!</Link>
                </View>
            <View style={styles.buttons}>
                    <MainButton title="Acessar" type="primary" onPress={goToHomepage}/>
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
        width: "100%",
        height: 370,
        justifyContent:"flex-end",
        alignItems:"flex-end",
        paddingVertical: 26,
    },
    cardTexts: {
        paddingHorizontal: 20,

    },
    cardText: {
        fontSize: fontSize.title,
        color: colors.primaryLight,
        fontWeight: "500"

    },
    cardInputs: {
        width: "100%",
        paddingHorizontal: 20,
        gap: 20,
        paddingTop: 26,
    },
    buttons: {
        width:"100%",
        gap: 10
    },
    cardLink: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        paddingBottom: 15
    },
    linkText: {
        color: colors.bgLink,
        textDecorationLine: 'underline',
        fontWeight: '500',
      },

});