import { useState } from 'react';
import { EquipmentDetailsModel } from '~/models/equipmentDetailsModel';
import { EquipmentModel } from '~/models/equipmentModel';
import { LocationModel } from '~/models/locationModel';
import { MaintenanceCompanyModel } from '~/models/maintenanceCompanyModel';
import { ResponsibleModel } from '~/models/responsibleModel';

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

  const getFormData = (): EquipmentModel => ({
    dataCriacao: new Date(),
    usuario: '',
    local,
    responsavel,
    detalhes_equipamento: detalhesEquipamento,
    empresa_conservadora: empresaConservadora,
    uploads: [],
  });

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
    resetForm,
  };
};
