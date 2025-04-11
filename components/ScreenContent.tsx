import { StyleSheet, Text, View } from 'react-native';

import PrimaryInput from './inputs/primaryInput';
import { useState } from 'react';
import PrimarySection from './sections/primarySection';
import MainButton from './buttons/mainButton';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ }: ScreenContentProps) => {
  const [equipamento, setEquipamento] = useState('');

  return (
    <View style={styles.container}>
      <PrimarySection title="Identificação e localização">
        <PrimaryInput label="Identificação do equipamento" placeholder="Informe" />
        <PrimaryInput label="Localização do equipamento" placeholder="Informe" />
      </PrimarySection>
      <MainButton title="Cadastrar" onPress={() => console.log('Botão clicado!')} />
      <MainButton title="Cancelar" type='secondary' onPress={() => console.log('Botão clicado!')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: '#d1d5db',
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
