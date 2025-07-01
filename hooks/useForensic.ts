import { useState } from 'react';

export const useForensic = () => {
  const [dadosIniciais, setDadosIniciais] = useState({

    autoridadePolicial: '',
  });

  const [message, setMessage] = useState('');
  const [informacoes, setInformacoes] = useState(['']);
  const [peritoAuxiliar, setPeritoAuxiliar] = useState(['']);
  const [tecnico, setTecnico] = useState(['']);
  const [outros, setOutros] = useState(['']);
  const [dadosPreliminares, setDadosPreliminares] = useState(['']);
  const [acondicionamento, setAcondicionamento] = useState(['']);
  const [auxiliar, setAuxiliar] = useState(['']);
  const [depoimentos, setDepoimentos] = useState(['']);
  const [riscoAPR, setRiscoAPR] = useState({
    riscoAcidente: '',
    riscoFisico: '',
    gravidade: '',
    probabilidade: '',
    riscoQuimico: false,
    riscoBiologico: false,
    autoridadePolicial: '',
  });
  const [vestigio, setVestigio] = useState({
    naturezaVestigio: '',
    naturezaOutros: '',
    acondicionamento: '',
    acondicionamentoOutros: '',
  });
  const [entrevista, setEntrevista] = useState({
    tipoEntrevistado: '',
    genero: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Funções genéricas de array
  const adicionarCampo = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const atualizarCampo = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    valor: string
  ) => {
    setter(prev => {
      const copia = [...prev];
      copia[index] = valor;
      return copia;
    });
  };

  const removerCampo = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    indexToRemove: number
  ) => {
    setter(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const resetForm = () => {
    setDadosIniciais({
      autoridadePolicial: '',
    });
    setMessage('');
    setInformacoes(['']);
    setPeritoAuxiliar(['']);
    setTecnico(['']);
    setOutros(['']);
    setDadosPreliminares(['']);
    setAcondicionamento(['']);
    setAuxiliar(['']);
    setDepoimentos(['']);
    setRiscoAPR({
      riscoAcidente: '',
      riscoFisico: '',
      gravidade: '',
      probabilidade: '',
      riscoQuimico: false,
      riscoBiologico: false,
      autoridadePolicial: '',
    });
    setVestigio({
      naturezaVestigio: '',
      naturezaOutros: '',
      acondicionamento: '',
      acondicionamentoOutros: '',
    });
    setEntrevista({
      tipoEntrevistado: '',
      genero: '',
    });
    setErrors({});
  };

  return {
    dadosIniciais,
    setDadosIniciais,
    message,
    setMessage,
    informacoes,
    setInformacoes,
    peritoAuxiliar,
    setPeritoAuxiliar,
    tecnico,
    setTecnico,
    outros,
    setOutros,
    dadosPreliminares,
    setDadosPreliminares,
    acondicionamento,
    setAcondicionamento,
    auxiliar,
    setAuxiliar,
    depoimentos,
    setDepoimentos,
    riscoAPR,
    setRiscoAPR,
    vestigio,
    setVestigio,
    entrevista,
    setEntrevista,
    adicionarCampo,
    atualizarCampo,
    removerCampo,
    resetForm,
    clearFieldError,
    errors,
    setErrors,
  };
};
