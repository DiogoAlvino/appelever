import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/utils/firebase";
import PrimaryInput from "~/components/inputs/primaryInput";
import MainButton from "~/components/buttons/mainButton";
import FeedbackModal from "~/components/modal/feedbackModal";
import { colors, fontSize } from "~/theme";
import { Link } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'loading' | 'success' | 'error' | 'info' | 'confirm'>('info');
  const [modalMessage, setModalMessage] = useState('');

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setModalType('info');
      setModalMessage('Por favor, informe seu e-mail.');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    setModalType('loading');
    setModalMessage('Enviando link de recuperação...');
    setModalVisible(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setModalType('success');
      setModalMessage('E-mail enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (error: any) {
      console.error("Erro ao enviar recuperação:", error.message);
      let msg = 'Não foi possível enviar o e-mail. Verifique o endereço digitado.';

      if (error.code === 'auth/user-not-found') {
        msg = 'Nenhuma conta foi encontrada com esse e-mail.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'E-mail inválido. Verifique e tente novamente.';
      }

      setModalType('error');
      setModalMessage(msg);
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>
        Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
      </Text>

      <PrimaryInput
        label="E-mail"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.buttonContainer}>
        <MainButton
          title="Enviar link de recuperação"
          onPress={handlePasswordReset}
          type="primary"
          loading={loading}
        />
        <Link href="/login" style={styles.backToLogin}>
          Voltar para login
        </Link>
      </View>

      <FeedbackModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    gap: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: "bold",
    color: colors.primaryLight,
  },
  subtitle: {
    fontSize: fontSize.text,
    color: colors.primaryDark,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 20,
  },
  backToLogin: {
    textAlign: "center",
    color: colors.bgLink,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
