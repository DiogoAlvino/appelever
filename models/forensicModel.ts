import { UploadWithMeta } from '~/models/uploadModel';

export type CampoChecklist = {
  id: number;
  titulo: string;
  observacao?: string;
  audio?: string;
  arquivos?: UploadWithMeta[];
};

export type DadosPreliminares = {
  numeroVestigio: string;
  unidadeOrigem: string;
  procedimento: string;
  naturezaVestigio: string;
  naturezaOutros: string;
  descricaoDetalhada: string;
  descricaoDetalhadaArquivos: UploadWithMeta[];
};

export type Acondicionamento = {
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

export type VestigioResumo = {
  numeroVestigio: string;
  naturezaVestigio?: string;
  origem: 'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia';
  dadosCompletos: {
    dadosPreliminares: DadosPreliminares;
    acondicionamento: Acondicionamento;
  };
};
export type Depoimento = {
  tipoEntrevistado?: string;
  genero?: string;
  nomeEntrevistado: string;
  identificacao: string;
  endereco: string;
  idade: string;
  descricaoLesoes: string;
  depoimentoRelato: string;
  arquivoLesoes: UploadWithMeta[];
  dataHoraEntrevista?: Date | null;
};

export type Documentacao = {
  projetos: string;
  projetosArquivos: UploadWithMeta[];
  memorialCalculo: string;
  memorialCalculoArquivos: UploadWithMeta[];
  licencaAlvara: string;
  licencaAlvaraArquivos: UploadWithMeta[];
  art: string;
  artArquivos: UploadWithMeta[];
  planoManutencao: string;
  planoManutencaoArquivos: UploadWithMeta[];
  contratoManutencao: string;
  contratoManutencaoArquivos: UploadWithMeta[];
  registroManutencao: string;
  registroManutencaoArquivos: UploadWithMeta[];
  relatorioRia: string;
  relatorioRiaArquivos: UploadWithMeta[];
  outro: string;
  outroArquivos: UploadWithMeta[];
  dataHora?: Date | null;
};

export type EquipamentosExame = {
  maquinaTracao: CampoChecklist[];
  limitadorVelocidade: CampoChecklist[];
  cabos: CampoChecklist[];
  contrapeso: CampoChecklist[];
  cabine: CampoChecklist[];
  portas: CampoChecklist[];
  freiosEmergencia: CampoChecklist[];
  sistemaControle: CampoChecklist[];
  sistemaEletrico: CampoChecklist[];
  sensores: CampoChecklist[];
  pocoElevador: CampoChecklist[];
  dataHoraMaquinaTracao?: Date | null; 
  dataHoraLimitador?: Date | null;
  dataHoraCabos?: Date | null; 
  dataHoraContrapeso?: Date | null; 
  dataHoraCabine?: Date | null; 
  dataHoraPortas?: Date | null; 
  dataHoraFreios?: Date | null; 
  dataHoraSistemaControle?: Date | null; 
  dataHoraSistemaEletrico?: Date | null; 
  dataHoraSensores?: Date | null; 
  dataHoraPocoElevador?: Date | null; 
}

export type Perinecroscopia = {
  cadaverSexo?: string;
  cadaverCorPele: string;
  cadaverCabelo: string;
  cadaverSinaisIdentificadores: string;
  cadaverDescricaoVestes: string;
  cadaverOutro: string;
  analiseDisposicaoCadaver: string;
  arquivosDisposicaoCadaver: UploadWithMeta[];
  sinaisTanatologicos: string;
  arquivosTanatologicos: UploadWithMeta[];
  descricaoLesoesCadaver: string;
  arquivosLesoesCadaver: UploadWithMeta[];
  dataHora?: Date | null;
}


export type DadosIniciais = {
  peritoResponsavel: string;
  cargoPerito: string;
  matriculaPerito: string;
  dataHora: Date;
  tipoOcorrencia: string;
  autoridadePolicialNome: string;
  viatura: string;
  numeroVitimas: string;
  condicaoVitimas: string;
  autoridadePolicial?: string; 
  localizacao?: {
    address: string;
    latitude: number;
    longitude: number;
  };
};

export type MembroEquipe = {
  nome: string;
  cargo: string;
  matricula: string;
};

export type Materiais = {
  selecionados: number[];
  outroDescricao?: string;
};

export type InformacaoFato = {
  descricao: string;
  observacao: string;
};

export type RiscoAPR = {
  peritoResponsavel?: string;
  peritoMatricula?: string;
  riscoAcidente?: string;
  riscoFisico?: string;
  riscoQuimico?: boolean;
  riscoBiologico?: boolean;
  gravidade?: string;
  probabilidade?: string;
  medidasMitigatoria: string;
};

export type MembroSimples = {
  nome: string;
  matricula: string;
};

export type AnalisePreliminar ={
  reconhecimentoArea: string;
    condicoesAmbientais: string;
    caracteristicasLocal: string;
    informacoes: InformacaoFato[];
    arquivosReconhecimentoArea: UploadWithMeta[];
    localizacao?: {
    address: string;
    latitude: number;
    longitude: number;
  }
}

export type ForensicModel = {
  id?: string;
  usuario: string;
  dataCriacao: Date;
  condicaoVitimas: any;
  numeroVitimas: any;
  viatura: any;
  autoridadePolicialNome: any;
  tipoOcorrencia: any;
  matriculaPerito: any;
  cargoPerito: boolean;
  peritoResponsavel: any;
  dadosIniciais: DadosIniciais;
  equipePericial: MembroEquipe[];
  materiais: {
    selecionados: number[];
    outroDescricao: string;
  };
  analisePreliminar: AnalisePreliminar;
  risco: {
    riscoAPR: RiscoAPR;
    peritoAuxiliar: MembroSimples[];
    tecnico: MembroSimples[];
    outros: MembroSimples[];
  };

  exames: {
      documentacao: Documentacao;
      observacoesDocumentacao: string;
      vestigiosDocumentacao: VestigioResumo[];
  
      equipamentosExame: EquipamentosExame;
      vestigiosEquipamentos: VestigioResumo[];
      
  
      depoimentos: Depoimento[];
      vestigiosEntrevistas: VestigioResumo[];
  
      perinecroscopia: Perinecroscopia;
      vestigiosPerinecroscopia: VestigioResumo[];
    };
};
