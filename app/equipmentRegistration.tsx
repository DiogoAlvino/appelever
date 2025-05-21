import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { saveEquipment } from '~/services/equipmentService';

import MainButton from '~/components/buttons/mainButton';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import PrimarySection from '~/components/sections/primarySection';

import { useEquipmentForm } from '~/hooks/useEquipmentForm';

export default function EquipmentRegistration() {
  const {
    local,
    setLocal,
    responsavel,
    setResponsavel,
    detalhesEquipamento,
    setDetalhesEquipamento,
    empresaConservadora,
    setEmpresaConservadora,
    getFormData,
    resetForm,
  } = useEquipmentForm();

  const handleSave = async () => {
    try {
      await saveEquipment(getFormData());
      Alert.alert('Sucesso', 'Equipamento cadastrado com sucesso.');
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o equipamento.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PrimarySection title="Local de Instalação">
        <PrimaryInput label="Edificação" value={local.edificacao} onChangeText={(text) => setLocal({ ...local, edificacao: text })} placeholder="Informe" />
        <PrimaryInput label="CEP" value={local.cep} onChangeText={(text) => setLocal({ ...local, cep: text })} placeholder="Informe" />
        <PrimaryInput label="Logradouro" value={local.logradouro} onChangeText={(text) => setLocal({ ...local, logradouro: text })} placeholder="Informe" />
        <PrimaryInput label="Número" value={local.numero} onChangeText={(text) => setLocal({ ...local, numero: text })} placeholder="Informe" />
        <PrimaryInput label="Complemento" value={local.complemento} onChangeText={(text) => setLocal({ ...local, complemento: text })} placeholder="Informe" />
        <PrimaryInput label="Bairro" value={local.bairro} onChangeText={(text) => setLocal({ ...local, bairro: text })} placeholder="Informe" />
        <PrimaryInput label="Cidade" value={local.cidade} onChangeText={(text) => setLocal({ ...local, cidade: text })} placeholder="Informe" />
        <PrimaryInput label="Estado" value={local.estado} onChangeText={(text) => setLocal({ ...local, estado: text })} placeholder="Informe" />
      </PrimarySection>

      <PrimarySection title="Responsável Técnico">
        <PrimaryInput label="Responsável" value={responsavel.nome} onChangeText={(text) => setResponsavel({ ...responsavel, nome: text })} placeholder="Informe" />
        <PrimaryInput label="Função" value={responsavel.funcao} onChangeText={(text) => setResponsavel({ ...responsavel, funcao: text })} placeholder="Informe" />
        <PrimaryInput label="Telefone" value={responsavel.telefone} onChangeText={(text) => setResponsavel({ ...responsavel, telefone: text })} placeholder="Informe" />
        <PrimaryInput label="E-mail" value={responsavel.email} onChangeText={(text) => setResponsavel({ ...responsavel, email: text })} placeholder="Informe" />
      </PrimarySection>

      <PrimarySection title="Dados do Equipamento">
        <PrimaryInput label="Data da Instalação" value={detalhesEquipamento.dataInstalacao.toISOString().split('T')[0]} onChangeText={(text) => setDetalhesEquipamento({ ...detalhesEquipamento, dataInstalacao: new Date(text) })} placeholder="Informe" />
        <PrimaryInput label="Identificação" value={detalhesEquipamento.identificacaoEquipamento} onChangeText={(text) => setDetalhesEquipamento({ ...detalhesEquipamento, identificacaoEquipamento: text })} placeholder="Informe" />
        <PrimaryInput label="Fabricante" value={detalhesEquipamento.fabricante} onChangeText={(text) => setDetalhesEquipamento({ ...detalhesEquipamento, fabricante: text })} placeholder="Informe" />
        <PrimaryInput label="CNPJ" value={detalhesEquipamento.cnpj} onChangeText={(text) => setDetalhesEquipamento({ ...detalhesEquipamento, cnpj: text })} placeholder="Informe" />
        <PrimarySelect label="Modelo" selected={detalhesEquipamento.modelo} onSelect={(value) => setDetalhesEquipamento({ ...detalhesEquipamento, modelo: value })} placeholder="Selecione" options={['Modelo A', 'Modelo B', 'Modelo C']} />
        <PrimaryInput label="Capacidade Nominal" value={String(detalhesEquipamento.capacidadeNominal)} onChangeText={(text) => setDetalhesEquipamento({ ...detalhesEquipamento, capacidadeNominal: parseFloat(text) || 0 })} placeholder="Informe" />
        <PrimarySelect label="Tipo de uso" selected={detalhesEquipamento.tipoDeUso} onSelect={(value) => setDetalhesEquipamento({ ...detalhesEquipamento, tipoDeUso: value })} placeholder="Selecione" options={['Residencial', 'Comercial', 'Público']} />
        <PrimaryInput label="Número de paradas" value={String(detalhesEquipamento.numeroDeParadas)} onChangeText={(text) => setDetalhesEquipamento({ ...detalhesEquipamento, numeroDeParadas: parseInt(text) || 0 })} placeholder="Informe" />
        <PrimarySelect label="Casa de Máquinas" selected={detalhesEquipamento.casaDeMaquinas ? 'Existente' : 'Não Existente'} onSelect={(value) => setDetalhesEquipamento({ ...detalhesEquipamento, casaDeMaquinas: value === 'Existente' })} placeholder="Selecione" options={['Existente', 'Não Existente']} />
      </PrimarySection>

      <PrimarySection title="Empresa Conservadora">
        <PrimaryInput label="Empresa Conservadora" value={empresaConservadora.razaoSocial} onChangeText={(text) => setEmpresaConservadora({ ...empresaConservadora, razaoSocial: text })} placeholder="Informe" />
        <PrimaryInput label="CNPJ" value={empresaConservadora.cnpj} onChangeText={(text) => setEmpresaConservadora({ ...empresaConservadora, cnpj: text })} placeholder="Informe" />
      </PrimarySection>

      <View style={styles.buttons}>
        <MainButton title="Cadastrar" type="primary" onPress={handleSave} />
        <MainButton title="Cancelar" type="secondary" onPress={resetForm} />
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
    width: '100%',
    gap: 10,
    paddingBottom: 26,
  },
});
