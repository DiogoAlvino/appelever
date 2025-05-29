import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, ImageBackground, Alert } from "react-native";
import MainButton from "~/components/buttons/mainButton";
import PrimaryInput from "~/components/inputs/primaryInput";
import { colors, fontSize } from '~/theme';
import { auth } from "~/utils/firebase";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });

            router.push("/");
        })
        .catch(error => {
            console.error("Erro ao criar usuário:", error.message);
            Alert.alert("Erro", error.message);
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <ImageBackground source={require('~/assets/bg-login.png')} style={styles.card} resizeMode="cover">
                <View style={styles.cardTexts}>
                    <Text style={styles.cardText}>Faça seu cadastro</Text>
                </View>
            </ImageBackground>
            <View style={styles.cardInputs}>
                <Text>Ou crie uma conta conosco abaixo</Text>
                <PrimaryInput label="Nome" placeholder="Digite seu nome" value={name} onChangeText={setName} />
                <PrimaryInput label="Email" placeholder="Digite seu email" value={email} onChangeText={setEmail} />
                <PrimaryInput label="Senha" placeholder="Digite sua senha" value={password} onChangeText={setPassword} />
                <PrimaryInput label="Confirme sua senha" placeholder="Confirme sua senha" value={confirmPassword} onChangeText={setConfirmPassword} />

                <View style={styles.buttons}>
                    <MainButton title="Cadastrar" type="primary" onPress={handleSignUp} />
                    <MainButton title="Cancelar" type="secondary" onPress={() => router.push("/login")} />
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
        height: 170,
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
        gap: 10,
        paddingTop: 10,
        paddingBottom: 25
    },
});
