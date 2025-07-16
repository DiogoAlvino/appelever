import { Image, Text, View, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function CroquiModal() {
  const [visible, setVisible] = useState(false);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const signRef = useRef<any>(null);

  function handleOK(signature: string) {
    setSignatureImage(signature);
    setVisible(false);
  }

  function handleDelete() {
    setSignatureImage(null);
  }

  return (
    <View style={styles.container}>
      <Button title="Abrir Croqui" onPress={() => setVisible(true)} color="#173A64"/>

      {signatureImage && (
        <View style={styles.previewContainer}>
          <View style={styles.previewHeader}>
            <Text style={styles.label}>Croqui salvo:</Text>
            <TouchableOpacity onPress={handleDelete}>
              <Feather name="trash-2" size={18} color="#dc3545" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: signatureImage }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}

      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1 }}>
          <SignatureScreen
            ref={signRef}
            onOK={handleOK}
            onEmpty={() => setVisible(false)}
            descriptionText=""
            clearText=""
            confirmText=""
            webStyle={signatureStyle}
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

const signatureStyle = `
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
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  previewContainer: {
    marginTop: 16,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
});
