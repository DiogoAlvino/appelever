import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, ImageBackground } from "react-native";
import MainButton from "~/components/buttons/mainButton";
import PrimaryInput from "~/components/inputs/primaryInput";
import PrimarySelect from "~/components/inputs/primarySelect";
import { colors, fontSize, border, width, heigth, margin, padding, gap } from '~/theme';

export default function SingUp(){
    const [ocupacao, setOcupacao] = useState<string | undefined>(undefined);
    
    function goToLogin(){
            router.push("/login")
    }


    return (
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
            <ImageBackground source={require('~/assets/bg-login.png')} style={styles.card} resizeMode="cover">
                <View style={styles.cardTexts}>
                    <Text style={styles.cardText}>Faça seu cadsatro</Text>
                </View>
            </ImageBackground>
            <View style={styles.cardInputs}>
                <PrimaryInput label="Nome" placeholder="Digite seu nome" />
                <PrimarySelect
                          label="Tipo de uso"
                          placeholder="Selecione o item"
                          options={['Estudante', 'Técnico']}
                          selected={ocupacao}
                          onSelect={(value) => setOcupacao(value)}
                        />
                <PrimaryInput label="Email" placeholder="Digite seu email" />
                <PrimaryInput label="Senha" placeholder="Digite sua senha" />
                <PrimaryInput label="Confirme sua senha" placeholder="Confirme sua senha" />

    
            <View style={styles.buttons}>
                <MainButton title="Cadastrar" type="primary" onPress={goToLogin}/>
                <MainButton title="Cancelar" type="secondary" />
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
        backgroundColor: colors.bgScreen,
    },
    card: {
        width: "100%",
        height: 170,
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
        gap: 10,
        paddingTop: 10,
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