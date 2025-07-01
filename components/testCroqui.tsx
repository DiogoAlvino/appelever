import { View, Button, Modal, StyleSheet } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useRef, useState } from 'react';

export default function CroquiModal() {
  const [visible, setVisible] = useState(false);
  const signRef = useRef<any>(null);

  function handleOK(signature: string) {
    console.log('Base64 da imagem:', signature);
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <Button title="Abrir Croqui" onPress={() => setVisible(true)} />

      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1 }}>
          <SignatureScreen
            ref={signRef}
            onOK={handleOK}
            onEmpty={() => setVisible(false)}
            descriptionText=""
            clearText=""
            confirmText=""
            webStyle={`
              .m-signature-pad {
                box-shadow: none;
                border: none;
                margin: 0;
              }
              .m-signature-pad--footer {
                display: none;
              }
              body, html {
                height: 100%;
                margin: 0;
                background-color: #fff;
              }
            `}
          />

          <View style={styles.footer}>
            <Button title="Limpar" onPress={() => signRef.current?.clearSignature()} />
            <Button title="Salvar" onPress={() => signRef.current?.readSignature()} />
            <Button title="Fechar" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
});
