import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import MainButton from '~/components/buttons/mainButton';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import PrimarySection from '~/components/sections/primarySection';
import { colors } from '~/theme';

export default function EquipmentRegistration() {
  const [modelo, setModelo] = useState<string | undefined>(undefined);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <PrimarySection title="Local de Instalação">
        <PrimaryInput label="Edificação" placeholder="Informe" />
        <PrimaryInput label="Endereço" placeholder="Informe" />
      </PrimarySection>

      <PrimarySection title="Responsável Técnico">
        <PrimaryInput label="Responsável" placeholder="Informe" />
        <PrimaryInput label="Função" placeholder="Informe" />
        <PrimaryInput label="Telefone" placeholder="Informe" />
        <PrimaryInput label="E-mail" placeholder="Informe" />
      </PrimarySection>


      <PrimarySection title="Dados do Equipamento">
        <PrimaryInput label="Data da Instalação" placeholder="Informe" />
        <PrimaryInput label="Identificação do Equipamento" placeholder="Informe" />
        <PrimaryInput label="Fabricante" placeholder="Informe" />
        <PrimaryInput label="CNPJ" placeholder="Informe" />
        <PrimarySelect
          label="Modelo"
          placeholder="Selecione o item"
          options={['Modelo A', 'Modelo B', 'Modelo C']}
          selected={modelo}
          onSelect={(value) => setModelo(value)}
        />
        <PrimaryInput label="Capacidade Nominal (kg)" placeholder="Informe" />
        <PrimaryInput label="Lotacão" placeholder="Informe" />
        <PrimaryInput label="Velocidade nominal (m/s)" placeholder="Informe" />
        <PrimarySelect
          label="Tipo de uso"
          placeholder="Selecione o item"
          options={['Residencial', 'Comercial', 'Público']}
          selected={modelo}
          onSelect={(value) => setModelo(value)}
        />
        <PrimaryInput label="Número de paradas" placeholder="Informe" />
        <PrimarySelect
          label="Casa de Máquinas"
          placeholder="Selecione o item"
          options={['Existente', 'Não Existente']}
          selected={modelo}
          onSelect={(value) => setModelo(value)}
        />
      </PrimarySection>



      <PrimarySection title="Empresa Conservadora">
        <PrimaryInput label="Empresa Conservadora" placeholder="Informe" />
        <PrimaryInput label="CNPJ" placeholder="Informe" />
 
      </PrimarySection>
      
      <View style={styles.buttons}>
        <MainButton title="Cadastrar" type="primary" />
        <MainButton title="Cancelar" type="secondary" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttons: {
    width:"100%",
    gap: 10,
    paddingBottom: 26
  }
});
