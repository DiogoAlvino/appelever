import { StyleSheet, Text, View, ScrollView } from 'react-native';

import PrimaryInput from './inputs/primaryInput';
import { useState } from 'react';
import PrimarySection from './sections/primarySection';
import BlockButton from './buttons/blockButton';
import SearchInput from './inputs/searchInput';
import ReportSection from './sections/reportSection';
import SecondarySection from './sections/secondarySection';
import AlertMessage from './messages/alertMessage';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryList from './lists/primaryList';
import { colors, fontSize } from '~/theme';
import QuestionsList from './lists/questionsList';
import { equipment, questions } from '~/data/questions';
import EquipmentList from './lists/equipamentList';
import PrimarySelect from './inputs/primarySelect';
import MenuButton from './buttons/menuButton';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ }: ScreenContentProps) => {
  const [equipamento, setEquipamento] = useState('');
  const [respostas, setRespostas] = useState<{ [id: string]: 'sim' | 'nao' | 'na' | null }>({});
  const [checked, setChecked] = useState(false);
  const [modelo, setModelo] = useState<string | undefined>(undefined);

  const handleChecked = () => {
    setChecked(prev => !prev);
  }

  const handleResponder = (id: string, value: 'sim' | 'nao' | 'na') => {
    setRespostas((prev) => ({ ...prev, [id]: value }));
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <MenuButton/>
      <SearchInput onSearch={(value) => console.log('Buscar por:', value)} />
      <AlertMessage
        type="error"
        message="Itens a serem verificados quanto à conformidade com a ABNT NBR 16858-1"
      />


      <EquipmentList equipaments={equipment} />

      <SecondarySection
        icon={<Feather name="sun" size={20} color="#173A64" />}
        title="Equipamento para inspeção"
        onPress={() => "/modal"}
        showCheckbox={true}
        checked={checked}
        onCheckChange={handleChecked}
      >
        <Text style={styles.text}>Nome do equipamento</Text>
        <Text style={styles.text}>IP ou Numero de Identificação</Text>
      </SecondarySection>

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
        <PrimarySelect
          label="Modelo"
          placeholder="Selecione o item"
          options={['Modelo A', 'Modelo B', 'Modelo C']}
          selected={modelo}
          onSelect={(value) => setModelo(value)}
        />
      </PrimarySection>
      <PrimaryList title="1. Quadro de comando"
        helperEnabled helperTitle="1. Quadro de comando"
        helperDescription="O quadro de comando é o painel elétrico que controla o funcionamento do elevador. É também conhecido como painel elétrico de comando.">
        <QuestionsList
          questoes={questions}
          respostas={respostas}
          onResponder={handleResponder}
        />
      </PrimaryList>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    gap: 28
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
  text: {
    fontSize: fontSize.placeholder,
    color: colors.primaryDark,
  },
});
