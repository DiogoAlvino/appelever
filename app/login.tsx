import { router, Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, ImageBackground, Alert } from "react-native";
import MainButton from "~/components/buttons/mainButton";
import PrimaryInput from "~/components/inputs/primaryInput";
import { colors, fontSize } from '~/theme';
import { auth } from "~/utils/firebase";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log("Usuário logado:", userCredential.user);
                router.push("/");
            })
            .catch(error => {
                console.error("Erro ao logar:", error.message);
                Alert.alert("Erro ao logar", error.message);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <ImageBackground source={require('~/assets/bg-login.png')} style={styles.card} resizeMode="cover">
                <View style={styles.cardTexts}>
                    <Text style={styles.cardText}>Bem-vindo de volta.</Text>
                    <Text style={styles.cardText}>Vamos lá otimizar o seu trabalho!</Text>
                </View>
            </ImageBackground>
            <View style={styles.cardInputs}>
                <PrimaryInput
                    label="Email"
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                />
                <PrimaryInput
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.cardLink}>
                    <Text>Não possui uma conta?</Text>
                    <Link href="/signUp" style={styles.linkText}>Cadastre-se aqui!</Link>
                </View>
                <View style={styles.buttons}>
                    <MainButton title="Acessar" type="primary" onPress={handleLogin} />
                </View>
            </View>
        </ScrollView>
    );
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
        justifyContent: "flex-end",
        alignItems: "flex-end",
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
        width: "100%",
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
