import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { saveEquipment, updateEquipment, fetchEquipmentById } from '~/services/equipmentService';
import FileUpload from '~/components/inputs/fileUpload';

import MainButton from '~/components/buttons/mainButton';
import PrimaryInput from '~/components/inputs/primaryInput';
import PrimarySelect from '~/components/inputs/primarySelect';
import PrimarySection from '~/components/sections/primarySection';

import { useEquipmentForm } from '~/hooks/useEquipmentForm';
import { useState, useEffect } from 'react';
import FeedbackModal from '~/components/modal/feedbackModal';
import { router, useLocalSearchParams } from 'expo-router';

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
    validateForm,
    clearFieldError,
    resetForm,
    errors,
  } = useEquipmentForm();

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'loading' | 'success' | 'error'>('loading');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { mode, equipmentId } = useLocalSearchParams();

  useEffect(() => {
    if (mode === 'edit' && equipmentId) {
      const loadEquipment = async () => {
        try {
          const equipmentData = await fetchEquipmentById(equipmentId as string);
          if (equipmentData) {
            setLocal(equipmentData.local);
            setResponsavel(equipmentData.responsavel);
            setDetalhesEquipamento({
              ...equipmentData.detalhes_equipamento,
              dataInstalacao: new Date(equipmentData.detalhes_equipamento.dataInstalacao),
            });
            setEmpresaConservadora(equipmentData.empresa_conservadora);
          }
        } catch (error) {
          console.error('Erro ao carregar equipamento para edição', error);
        }
      };

      loadEquipment();
    }
  }, [mode, equipmentId]);

  const handleSave = async () => {
    const { valid } = validateForm();

    if (!valid) {
      setFeedbackType('error');
      setFeedbackMessage('Preencha corretamente os campos destacados');
      setFeedbackVisible(true);
      return;
    }

    setFeedbackType('loading');
    setFeedbackMessage(mode === 'edit' ? 'Atualizando equipamento...' : 'Salvando equipamento...');
    setFeedbackVisible(true);

    try {
      if (mode === 'edit' && equipmentId) {
        await updateEquipment(equipmentId as string, getFormData());
        setFeedbackType('success');
        setFeedbackMessage('Equipamento atualizado com sucesso!');
        setTimeout(() => router.push('/equipments'), 1000);
      } else {
        const docRef = await saveEquipment(getFormData());
        setFeedbackType('success');
        setFeedbackMessage('Equipamento cadastrado com sucesso!');
        setTimeout(() => router.push(`/equipmentForm/${docRef.id}`), 1000);
      }

      setTimeout(() => setFeedbackVisible(false), 1000);
      resetForm();
    } catch (error) {
      console.error(error);
      setFeedbackType('error');
      setFeedbackMessage('Erro ao salvar o equipamento.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PrimarySection title="Local de Instalação">
        <PrimaryInput label="Edificação" value={local.edificacao} onChangeText={(text) => { setLocal({ ...local, edificacao: text }); clearFieldError('edificacao'); }} placeholder="Informe" error={!!errors.edificacao} errorMessage={errors.edificacao} />
        <PrimaryInput label="CEP" value={local.cep} onChangeText={(text) => { setLocal({ ...local, cep: text }); clearFieldError('cep'); }} placeholder="Informe" error={!!errors.cep} errorMessage={errors.cep} mask="99999-999" />
        <PrimaryInput label="Logradouro" value={local.logradouro} onChangeText={(text) => { setLocal({ ...local, logradouro: text }); clearFieldError('logradouro'); }} placeholder="Informe" error={!!errors.logradouro} errorMessage={errors.logradouro} />
        <PrimaryInput label="Número" value={local.numero} onChangeText={(text) => { setLocal({ ...local, numero: text }); clearFieldError('numero'); }} placeholder="Informe" error={!!errors.numero} errorMessage={errors.numero} />
        <PrimaryInput label="Complemento" value={local.complemento} onChangeText={(text) => setLocal({ ...local, complemento: text })} placeholder="Informe" />
        <PrimaryInput label="Bairro" value={local.bairro} onChangeText={(text) => { setLocal({ ...local, bairro: text }); clearFieldError('bairro'); }} placeholder="Informe" error={!!errors.bairro} errorMessage={errors.bairro} />
        <PrimaryInput label="Cidade" value={local.cidade} onChangeText={(text) => { setLocal({ ...local, cidade: text }); clearFieldError('cidade'); }} placeholder="Informe" error={!!errors.cidade} errorMessage={errors.cidade} />
        <PrimaryInput label="Estado" value={local.estado} onChangeText={(text) => { setLocal({ ...local, estado: text }); clearFieldError('estado'); }} placeholder="Informe" error={!!errors.estado} errorMessage={errors.estado} />
      </PrimarySection>

      <PrimarySection title="Responsável Técnico">
        <PrimaryInput label="Responsável" value={responsavel.nome} onChangeText={(text) => { setResponsavel({ ...responsavel, nome: text }); clearFieldError('responsavel'); }} placeholder="Informe" error={!!errors.responsavel} errorMessage={errors.responsavel} />
        <PrimaryInput label="Função" value={responsavel.funcao} onChangeText={(text) => setResponsavel({ ...responsavel, funcao: text })} placeholder="Informe" />
        <PrimaryInput label="Telefone" value={responsavel.telefone} onChangeText={(text) => { setResponsavel({ ...responsavel, telefone: text }); clearFieldError('telefone'); }} placeholder="Informe" error={!!errors.telefone} errorMessage={errors.telefone} mask="(99) 99999-9999" />
        <PrimaryInput label="E-mail" value={responsavel.email} onChangeText={(text) => { setResponsavel({ ...responsavel, email: text }); clearFieldError('email'); }} placeholder="Informe" error={!!errors.email} errorMessage={errors.email} />
      </PrimarySection>

      <PrimarySection title="Dados do Equipamento">
        <PrimaryInput
          label="Data da Instalação"
          value={
            detalhesEquipamento.dataInstalacao instanceof Date && !isNaN(detalhesEquipamento.dataInstalacao.getTime())
              ? detalhesEquipamento.dataInstalacao.toISOString().split('T')[0]
              : ''
          }
          onChangeText={(text) =>
            setDetalhesEquipamento({
              ...detalhesEquipamento,
              dataInstalacao: new Date(text),
            })
          }
          placeholder="Informe"
          error={!!errors.dataInstalacao}
          errorMessage={errors.dataInstalacao}
        />
        <PrimaryInput label="Identificação" value={detalhesEquipamento.identificacaoEquipamento} onChangeText={(text) => { setDetalhesEquipamento({ ...detalhesEquipamento, identificacaoEquipamento: text }); clearFieldError('identificacao'); }} placeholder="Informe" error={!!errors.identificacao} errorMessage={errors.identificacao} />
        <PrimaryInput label="Fabricante" value={detalhesEquipamento.fabricante} onChangeText={(text) => { setDetalhesEquipamento({ ...detalhesEquipamento, fabricante: text }); clearFieldError('fabricante'); }} placeholder="Informe" error={!!errors.fabricante} errorMessage={errors.fabricante} />
        <PrimaryInput label="CNPJ" value={detalhesEquipamento.cnpj} onChangeText={(text) => { setDetalhesEquipamento({ ...detalhesEquipamento, cnpj: text }); clearFieldError('cnpjEquipamento'); }} placeholder="Informe" error={!!errors.cnpjEquipamento} errorMessage={errors.cnpjEquipamento} mask="99.999.999/9999-99" />
        <PrimarySelect label="Modelo" selected={detalhesEquipamento.modelo} onSelect={(value) => { setDetalhesEquipamento({ ...detalhesEquipamento, modelo: value }); clearFieldError('modelo'); }} placeholder="Selecione" options={['Modelo A', 'Modelo B', 'Modelo C']} />
        <PrimaryInput label="Capacidade Nominal" value={String(detalhesEquipamento.capacidadeNominal)} onChangeText={(text) => { setDetalhesEquipamento({ ...detalhesEquipamento, capacidadeNominal: parseFloat(text) || 0 }); clearFieldError('capacidadeNominal'); }} placeholder="Informe" error={!!errors.capacidadeNominal} errorMessage={errors.capacidadeNominal} />
        <PrimarySelect label="Tipo de uso" selected={detalhesEquipamento.tipoDeUso} onSelect={(value) => { setDetalhesEquipamento({ ...detalhesEquipamento, tipoDeUso: value }); clearFieldError('tipoDeUso'); }} placeholder="Selecione" options={['Residencial', 'Comercial', 'Público']} />
        <PrimaryInput label="Número de paradas" value={String(detalhesEquipamento.numeroDeParadas)} onChangeText={(text) => { setDetalhesEquipamento({ ...detalhesEquipamento, numeroDeParadas: parseInt(text) || 0 }); clearFieldError('numeroDeParadas'); }} placeholder="Informe" error={!!errors.numeroDeParadas} errorMessage={errors.numeroDeParadas} />
        <PrimarySelect label="Casa de Máquinas" selected={detalhesEquipamento.casaDeMaquinas ? 'Existente' : 'Não Existente'} onSelect={(value) => setDetalhesEquipamento({ ...detalhesEquipamento, casaDeMaquinas: value === 'Existente' })} placeholder="Selecione" options={['Existente', 'Não Existente']} />
      </PrimarySection>

      <PrimarySection title="Empresa Conservadora">
        <PrimaryInput label="Empresa Conservadora" value={empresaConservadora.razaoSocial} onChangeText={(text) => { setEmpresaConservadora({ ...empresaConservadora, razaoSocial: text }); clearFieldError('razaoSocial'); }} placeholder="Informe" error={!!errors.razaoSocial} errorMessage={errors.razaoSocial} />
        <PrimaryInput label="CNPJ" value={empresaConservadora.cnpj} onChangeText={(text) => { setEmpresaConservadora({ ...empresaConservadora, cnpj: text }); clearFieldError('cnpjEmpresa'); }} placeholder="Informe" error={!!errors.cnpjEmpresa} errorMessage={errors.cnpjEmpresa} mask="99.999.999/9999-99" />
      </PrimarySection>

      <PrimarySection title="Arquivos Relacionados">
        <FileUpload/>
      
      </PrimarySection>

      

      <View style={styles.buttons}>
        <MainButton title={mode === 'edit' ? 'Salvar Alterações' : 'Cadastrar'} type="primary" onPress={handleSave} />
        <MainButton title="Cancelar" type="secondary" onPress={() => {
          resetForm();
          if (equipmentId) {
            router.push(`/equipmentForm/${equipmentId}`);
          } else {
            router.back();
          }
        }} />
      </View>

      <FeedbackModal
        visible={feedbackVisible}
        type={feedbackType}
        message={feedbackMessage}
        onClose={() => setFeedbackVisible(false)}
      />
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
