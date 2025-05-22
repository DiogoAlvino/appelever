import { useState } from 'react';
import { EquipmentDetailsModel } from '~/models/equipmentDetailsModel';
import { EquipmentModel } from '~/models/equipmentModel';
import { LocationModel } from '~/models/locationModel';
import { MaintenanceCompanyModel } from '~/models/maintenanceCompanyModel';
import { ResponsibleModel } from '~/models/responsibleModel';
import { validations } from '~/utils/validations';

export const useEquipmentForm = () => {
  const [local, setLocal] = useState<LocationModel>({
    edificacao: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [responsavel, setResponsavel] = useState<ResponsibleModel>({
    nome: '',
    funcao: '',
    telefone: '',
    email: '',
  });

  const [detalhesEquipamento, setDetalhesEquipamento] = useState<EquipmentDetailsModel>({
    dataInstalacao: new Date(),
    identificacaoEquipamento: '',
    fabricante: '',
    cnpj: '',
    modelo: '',
    capacidadeNominal: 0,
    tipoDeUso: '',
    numeroDeParadas: 0,
    casaDeMaquinas: true,
  });

  const [empresaConservadora, setEmpresaConservadora] = useState<MaintenanceCompanyModel>({
    razaoSocial: '',
    cnpj: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getFormData = (): EquipmentModel => ({
    dataCriacao: new Date(),
    usuario: '',
    local,
    responsavel,
    detalhes_equipamento: detalhesEquipamento,
    empresa_conservadora: empresaConservadora,
    uploads: [],
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validations.isRequired(local.edificacao)) newErrors.edificacao = 'Edificação obrigatória';
    if (!validations.isRequired(local.cep)) newErrors.cep = 'CEP obrigatório';
    if (!validations.isRequired(local.logradouro)) newErrors.logradouro = 'Logradouro obrigatório';
    if (!validations.isRequired(local.numero)) newErrors.numero = 'Número obrigatório';
    if (!validations.isRequired(local.bairro)) newErrors.bairro = 'Bairro obrigatório';
    if (!validations.isRequired(local.cidade)) newErrors.cidade = 'Cidade obrigatória';
    if (!validations.isRequired(local.estado)) newErrors.estado = 'Estado obrigatório';

    if (!validations.isRequired(responsavel.nome)) newErrors.responsavel = 'Responsável obrigatório';
    if (!validations.isEmail(responsavel.email)) newErrors.email = 'E-mail inválido';
    if (!validations.isRequired(responsavel.telefone)) newErrors.telefone = 'Telefone obrigatório';

    if (!validations.isRequired(detalhesEquipamento.identificacaoEquipamento)) newErrors.identificacao = 'Identificação obrigatória';
    if (!validations.isRequired(detalhesEquipamento.fabricante)) newErrors.fabricante = 'Fabricante obrigatório';
    if (!validations.isCNPJ(detalhesEquipamento.cnpj)) newErrors.cnpjEquipamento = 'CNPJ do equipamento inválido';
    if (!validations.isRequired(detalhesEquipamento.modelo)) newErrors.modelo = 'Modelo obrigatório';
    if (!validations.isRequired(detalhesEquipamento.tipoDeUso)) newErrors.tipoDeUso = 'Tipo de uso obrigatório';

    if (!detalhesEquipamento.dataInstalacao || isNaN(new Date(detalhesEquipamento.dataInstalacao).getTime())) {
      newErrors.dataInstalacao = 'Data de instalação obrigatória';
    }
    if (!detalhesEquipamento.capacidadeNominal || detalhesEquipamento.capacidadeNominal <= 0) {
      newErrors.capacidadeNominal = 'Capacidade nominal obrigatória';
    }
    if (!detalhesEquipamento.numeroDeParadas || detalhesEquipamento.numeroDeParadas <= 0) {
      newErrors.numeroDeParadas = 'Número de paradas obrigatório';
    }

    if (!validations.isRequired(empresaConservadora.razaoSocial)) newErrors.razaoSocial = 'Empresa obrigatória';
    if (!validations.isCNPJ(empresaConservadora.cnpj)) newErrors.cnpjEmpresa = 'CNPJ da empresa inválido';

    setErrors(newErrors);

    return {
      valid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const resetForm = () => {
    setLocal({
      edificacao: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
    setResponsavel({
      nome: '',
      funcao: '',
      telefone: '',
      email: '',
    });
    setDetalhesEquipamento({
      dataInstalacao: new Date(),
      identificacaoEquipamento: '',
      fabricante: '',
      cnpj: '',
      modelo: '',
      capacidadeNominal: 0,
      tipoDeUso: '',
      numeroDeParadas: 0,
      casaDeMaquinas: true,
    });
    setEmpresaConservadora({
      razaoSocial: '',
      cnpj: '',
    });
    setErrors({});
  };

  return {
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
  };
};
