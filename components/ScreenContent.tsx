import { StyleSheet, Text, View, ScrollView } from 'react-native';

import PrimaryInput from './inputs/primaryInput';
import { useState } from 'react';
import PrimarySection from './sections/primarySection';
import MainButton from './buttons/mainButton';
import BlockButton from './buttons/blockButton';
import SearchInput from './inputs/searchInput';
import ReportSection from './sections/reportSection';
import SecondarySection from './sections/secondarySection';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ }: ScreenContentProps) => {
  const [equipamento, setEquipamento] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchInput onSearch={(value) => console.log('Buscar por:', value)} />
      <SecondarySection
        icon={<Feather name="sun" size={20} color="#173A64" />}
        title="Equipamento para inspeção"
        text1="Nome do equipamento"
        text2="IP ou Numero de Identificação"
        onPress={() => "/modal"}
      />

      <View style={styles.containerButtons}>
        <BlockButton
          icon={<MaterialCommunityIcons name="square-edit-outline" size={36} color="#fff" />}
          label="Cadastrar Equipamento"
          onPress={() => console.log('Botão clicado')}
        />
        <BlockButton
          icon={<MaterialCommunityIcons name="square-edit-outline" size={36} color="#fff" />}
          label="Cadastrar Equipamento"
          onPress={() => console.log('Botão clicado')}
        />
        <BlockButton
          icon={<MaterialCommunityIcons name="square-edit-outline" size={36} color="#fff" />}
          label="Cadastrar Equipamento"
          onPress={() => console.log('Botão clicado')}
        />
        <BlockButton
          icon={<MaterialCommunityIcons name="square-edit-outline" size={36} color="#fff" />}
          label="Cadastrar Equipamento"
          onPress={() => console.log('Botão clicado')}
        />
      </View>
      <ReportSection title="Dados do equipamento">
        <Text>Equipamento x</Text>
        <Text>Numero de identificao</Text>
      </ReportSection>
      <PrimarySection title="Identificação e localização">
        <PrimaryInput label="Identificação do equipamento" placeholder="Informe" />
        <PrimaryInput label="Localização do equipamento" placeholder="Informe" />
      </PrimarySection>
      <MainButton title="Cadastrar" onPress={() => console.log('Botão clicado!')} />
      <MainButton title="Cancelar" type='secondary' onPress={() => console.log('Botão clicado!')} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButtons:{
    flexDirection: 'row',
    gap:  28
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
