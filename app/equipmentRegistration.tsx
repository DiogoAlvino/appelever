import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import MainButton from '~/components/buttons/mainButton';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import PrimarySection from '~/components/sections/primarySection';

export default function EquipmentRegistration() {
  const [modelo, setModelo] = useState<string | undefined>(undefined);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <PrimarySection title="Dados Iniciais">
        <PrimaryInput label="Edificação" placeholder="Informe" />
        <PrimaryInput label="Endereço" placeholder="Informe" />
        <PrimaryInput label="Responsável" placeholder="Informe" />
        <PrimaryInput label="Função" placeholder="Informe" />
        <PrimaryInput label="Telefone" placeholder="Informe" />
        <PrimaryInput label="E-mail" placeholder="Informe" />
      </PrimarySection>

      <PrimarySection title="Informações Gerais do Equipamento">
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
        <PrimaryInput label="Empresa Conservadora" placeholder="Informe" />
        <PrimaryInput label="CNPJ" placeholder="Informe" />
        <PrimaryInput label="Capacidade Nominal (kg)" placeholder="Informe" />
        <PrimaryInput label="Lotacão" placeholder="Informe" />
        <PrimaryInput label="Velocidade nominal (m/s)" placeholder="Informe" />
        <PrimaryInput label="Tipo de Uso (Residencial, Comercial, Público)" placeholder="Informe" />
        <PrimaryInput label="Número de paradas" placeholder="Informe" />
        <PrimaryInput label="Casa de Máquinas (Existente, Não Existente)" placeholder="Informe" />
      </PrimarySection>

      <MainButton title="Cadastrar" type="primary" />
      <MainButton title="Cancelar" type="secondary" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
