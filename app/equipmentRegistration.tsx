import { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';

import MainButton from '~/components/buttons/mainButton';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import PrimarySection from '~/components/sections/primarySection';
import { colors } from '~/theme';
import { auth, db } from '~/utils/firebase';

export default function EquipmentRegistration() {
  // Estados dos campos
  const [edificacao, setEdificacao] = useState('');
  const [endereco, setEndereco] = useState('');

  const [responsavel, setResponsavel] = useState('');
  const [funcao, setFuncao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const [dataInstalacao, setDataInstalacao] = useState('');
  const [identificacaoEquipamento, setIdentificacaoEquipamento] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [cnpjEquipamento, setCnpjEquipamento] = useState('');
  const [modelo, setModelo] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [lotacao, setLotacao] = useState('');
  const [velocidade, setVelocidade] = useState('');
  const [tipoDeUso, setTipoDeUso] = useState('');
  const [casaDeMaquinas, setCasaDeMaquinas] = useState('');
  const [numeroParadas, setNumeroParadas] = useState('');

  const [empresaConservadora, setEmpresaConservadora] = useState('');
  const [cnpjEmpresa, setCnpjEmpresa] = useState('');

  const handleAddEquipamento = async () => {
    try {
      await addDoc(collection(db, 'equipamentos'), {
        dataCriacao: new Date(),
        usuario: auth.currentUser,
        responsavel: {
          nome: responsavel,
          funcao,
          telefone,
          email,
        },
        local: {
          edificacao,
          cep: '',
          cidade: '',
          estado: '',
          logradouro: endereco,
          numero: '',
          complemento: '',
        },
        detalhes_equipamento: {
          dataInstalacao,
          identificacaoEquipamento,
          fabricante,
          cnpj: cnpjEquipamento,
          modelo,
          capacidadeNominal: parseFloat(capacidade) || 0,
          tipoDeUso,
          numeroDeParadas: parseInt(numeroParadas) || 0,
          casaDeMaquinas: casaDeMaquinas === 'Existente',
        },
        empresa_conservadora: {
          razaoSocial: empresaConservadora,
          cnpj: cnpjEmpresa,
        },
        uploads: [],
      });

      Alert.alert("Sucesso", "Equipamento cadastrado com sucesso.");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar o equipamento.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <PrimarySection title="Local de Instalação">
        <PrimaryInput label="Edificação" placeholder="Informe" value={edificacao} onChangeText={setEdificacao} />
        <PrimaryInput label="Endereço" placeholder="Informe" value={endereco} onChangeText={setEndereco} />
      </PrimarySection>

      <PrimarySection title="Responsável Técnico">
        <PrimaryInput label="Responsável" placeholder="Informe" value={responsavel} onChangeText={setResponsavel} />
        <PrimaryInput label="Função" placeholder="Informe" value={funcao} onChangeText={setFuncao} />
        <PrimaryInput label="Telefone" placeholder="Informe" value={telefone} onChangeText={setTelefone} />
        <PrimaryInput label="E-mail" placeholder="Informe" value={email} onChangeText={setEmail} />
      </PrimarySection>

      <PrimarySection title="Dados do Equipamento">
        <PrimaryInput label="Data da Instalação" placeholder="Informe" value={dataInstalacao} onChangeText={setDataInstalacao} />
        <PrimaryInput label="Identificação do Equipamento" placeholder="Informe" value={identificacaoEquipamento} onChangeText={setIdentificacaoEquipamento} />
        <PrimaryInput label="Fabricante" placeholder="Informe" value={fabricante} onChangeText={setFabricante} />
        <PrimaryInput label="CNPJ" placeholder="Informe" value={cnpjEquipamento} onChangeText={setCnpjEquipamento} />
        <PrimarySelect label="Modelo" placeholder="Selecione" options={['Modelo A', 'Modelo B', 'Modelo C']} selected={modelo} onSelect={setModelo} />
        <PrimaryInput label="Capacidade Nominal (kg)" placeholder="Informe" value={capacidade} onChangeText={setCapacidade} />
        <PrimaryInput label="Lotação" placeholder="Informe" value={lotacao} onChangeText={setLotacao} />
        <PrimaryInput label="Velocidade nominal (m/s)" placeholder="Informe" value={velocidade} onChangeText={setVelocidade} />
        <PrimarySelect label="Tipo de uso" placeholder="Selecione" options={['Residencial', 'Comercial', 'Público']} selected={tipoDeUso} onSelect={setTipoDeUso} />
        <PrimaryInput label="Número de paradas" placeholder="Informe" value={numeroParadas} onChangeText={setNumeroParadas} />
        <PrimarySelect label="Casa de Máquinas" placeholder="Selecione" options={['Existente', 'Não Existente']} selected={casaDeMaquinas} onSelect={setCasaDeMaquinas} />
      </PrimarySection>

      <PrimarySection title="Empresa Conservadora">
        <PrimaryInput label="Empresa Conservadora" placeholder="Informe" value={empresaConservadora} onChangeText={setEmpresaConservadora} />
        <PrimaryInput label="CNPJ" placeholder="Informe" value={cnpjEmpresa} onChangeText={setCnpjEmpresa} />
      </PrimarySection>

      <View style={styles.buttons}>
        <MainButton title="Cadastrar" type="primary" onPress={handleAddEquipamento} />
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
    width: "100%",
    gap: 10,
    paddingBottom: 26
  }
});
