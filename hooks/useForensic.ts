import { useState } from 'react';
import {
  VestigioResumo,
  CampoChecklist,
  Depoimento,
  Documentacao,
  DadosIniciais,
  Perinecroscopia,
  AnalisePreliminar,
  APRModel,
} from '~/types/forensicTypes';
import { UploadWithMeta } from '~/models/uploadModel';

export const useForensic = () => {
  const [dadosIniciais, setDadosIniciais] = useState<DadosIniciais>({
    peritoResponsavel: '',
    cargoPerito: '',
    matriculaPerito: '',
    dataHora: new Date(),
    tipoOcorrencia: '',
    autoridadePolicialNome: '',
    viatura: '',
    numeroVitimas: '',
    condicaoVitimas: '',
    autoridadePolicial: '',
    localizacao: undefined,
  });

  const [aprs, setAprs] = useState<APRModel[]>([
    {
      riscoAPR: {
        peritoResponsavel: '',
        peritoMatricula: '',
        riscoAcidente: '',
        riscoFisico: '',
        riscoQuimico: false,
        riscoBiologico: false,
        gravidade: '',
        probabilidade: '',
        medidasMitigatoria: '',
      },
      peritoAuxiliar: [{ nome: '', matricula: '' }],
      tecnico: [{ nome: '', matricula: '' }],
      outros: [{ nome: '', matricula: '' }],
    },
  ]);

  const [dadosPreliminares, setDadosPreliminares] = useState<{
    [origem: string]: typeof initialDadosPreliminares;
  }>({
    equipamentos: [],
    documentacao: [],
    entrevistas: [],
    perinecroscopia: [],
  });

    type AcondicionamentoItem = {
        responsavelColeta: string;
        matricula: string;
        tipoAcondicionamento: string;
        tipoAcondicionamentoOutros: string;
        numeroLacre: string;
        arquivos: UploadWithMeta[];
        localizacao?: {
            address: string;
            latitude: number;
            longitude: number;
        };
    };

    const [acondicionamento, setAcondicionamento] = useState<{
        [origem: string]: AcondicionamentoItem[];
    }>({
        equipamentos: [],
        documentacao: [],
        entrevistas: [],
        perinecroscopia: [],
    });


  const initialDadosPreliminares = [{
    numeroVestigio: '',
    unidadeOrigem: '',
    procedimento: '',
    naturezaVestigio: '',
    naturezaOutros: '',
    descricaoDetalhada: '',
    descricaoDetalhadaArquivos: [] as UploadWithMeta[],
  }];

  const initialAcondicionamento = [{
    responsavelColeta: '',
    matricula: '',
    tipoAcondicionamento: '',
    tipoAcondicionamentoOutros: '',
    numeroLacre: '',
    arquivos: [] as UploadWithMeta[],
    localizacao: undefined as { address: string; latitude: number; longitude: number } | undefined,
  }];

  const [equipePericial, setEquipePericial] = useState([{ nome: '', cargo: '', matricula: '' }]);
  const [informacoes, setInformacoes] = useState([{ descricao: '', observacao: '' }]);

  const [materialOutroDescricao, setMaterialOutroDescricao] = useState('');

  const [analisePreliminar, setAnalisePreliminar] = useState<AnalisePreliminar>({
    reconhecimentoArea: '',
    condicoesAmbientais: '',
    caracteristicasLocal: '',
    informacoes: [{ descricao: '', observacao: '' }],
    arquivosReconhecimentoArea: [],
        localizacao: undefined as { address: string; latitude: number; longitude: number } | undefined,
  });

  const [documentacao, setDocumentacao] = useState<Documentacao>({
    projetos: '', projetosArquivos: [],
    memorialCalculo: '', memorialCalculoArquivos: [],
    licencaAlvara: '', licencaAlvaraArquivos: [],
    art: '', artArquivos: [],
    planoManutencao: '', planoManutencaoArquivos: [],
    contratoManutencao: '', contratoManutencaoArquivos: [],
    registroManutencao: '', registroManutencaoArquivos: [],
    relatorioRia: '', relatorioRiaArquivos: [],
    outro: '', outroArquivos: [],
  });

  const [observacoesDocumentacao, setObservacoesDocumentacao] = useState('');
  const [vestigiosDocumentacao, setVestigiosDocumentacao] = useState<VestigioResumo[]>([]);

  const [equipamentosExame, setEquipamentosExame] = useState({
    maquinaTracao: [] as CampoChecklist[],
    limitadorVelocidade: [] as CampoChecklist[],
    cabos: [] as CampoChecklist[],
    contrapeso: [] as CampoChecklist[],
    cabine: [] as CampoChecklist[],
    portas: [] as CampoChecklist[],
    freiosEmergencia: [] as CampoChecklist[],
    sistemaControle: [] as CampoChecklist[],
    sistemaEletrico: [] as CampoChecklist[],
    sensores: [] as CampoChecklist[],
    pocoElevador: [] as CampoChecklist[],
    dataHoraCabos: undefined,
    dataHoraContrapeso: undefined,
    dataHoraCabine: undefined,
    dataHoraPortas: undefined,
    dataHoraFreios: undefined,
    dataHoraSistemaControle: undefined,
    dataHoraSistemaEletrico: undefined,
    dataHoraSensores: undefined,
    dataHoraPocoElevador: undefined,
  });

  const [vestigiosEquipamentos, setVestigiosEquipamentos] = useState<VestigioResumo[]>([]);

  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([{
    tipoEntrevistado: '', genero: '', nomeEntrevistado: '', identificacao: '', endereco: '', idade: '',
    descricaoLesoes: '', depoimentoRelato: '', arquivoLesoes: [],
    dataHoraEntrevista: undefined,
  }]);

  const [vestigiosEntrevistas, setVestigiosEntrevistas] = useState<VestigioResumo[]>([]);

  const [perinecroscopia, setPerinecroscopia] = useState<Perinecroscopia>({
    cadaverSexo: '',
    cadaverCorPele: '',
    cadaverCabelo: '',
    cadaverSinaisIdentificadores: '',
    cadaverDescricaoVestes: '',
    cadaverOutro: '',
    analiseDisposicaoCadaver: '',
    arquivosDisposicaoCadaver: [],
    sinaisTanatologicos: '',
    arquivosTanatologicos: [],
    descricaoLesoesCadaver: '',
    arquivosLesoesCadaver: [],
    dataHora: undefined,
  });

  const [vestigiosPerinecroscopia, setVestigiosPerinecroscopia] = useState<VestigioResumo[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const adicionarCampo = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, novoItem: T) => {
    setter(prev => [...prev, novoItem]);
  };

  const atualizarCampo = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, campo: keyof T, valor: T[keyof T]) => {
    setter(prev => {
      const copia = [...prev];
      copia[index] = { ...copia[index], [campo]: valor };
      return copia;
    });
  };

  const atualizarObjeto = <T, K extends keyof T>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    campo: K,
    valor: T[K]
  ) => {
    setter((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const removerCampo = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, indexToRemove: number) => {
    setter(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  return {
    dadosIniciais, setDadosIniciais,
    equipePericial, setEquipePericial,
    analisePreliminar, setAnalisePreliminar,
    documentacao, setDocumentacao,
    observacoesDocumentacao, setObservacoesDocumentacao,
    vestigiosDocumentacao, setVestigiosDocumentacao,
    equipamentosExame, setEquipamentosExame,
    vestigiosEquipamentos, setVestigiosEquipamentos,
    depoimentos, setDepoimentos,
    vestigiosEntrevistas, setVestigiosEntrevistas,
    perinecroscopia, setPerinecroscopia,
    vestigiosPerinecroscopia, setVestigiosPerinecroscopia,
    materialOutroDescricao, setMaterialOutroDescricao,
    informacoes, setInformacoes,
    dadosPreliminares, setDadosPreliminares,
    acondicionamento, setAcondicionamento,
    aprs, setAprs,
    adicionarCampo, atualizarCampo, removerCampo, atualizarObjeto,
    errors, setErrors, clearFieldError,
  };
};
