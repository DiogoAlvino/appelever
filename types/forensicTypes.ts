export type FileItem = {
  name: string;
  uri: string;
  type: 'image' | 'file' | 'photo';
  size: number;
};

export type CampoChecklist = {
  id: number;
  titulo: string;
  resposta?: 'Sim' | 'Não' | 'NA';
  observacao?: string;
  audio?: string;
  arquivos?: FileItem[];
};

export type VestigioResumo = {
  numeroVestigio: string;
  naturezaVestigio: string;
  origem: 'equipamentos' | 'entrevistas' | 'documentacao' | 'perinecroscopia';
};

export type Depoimento = {
  tipoEntrevistado: string;
  genero: string;
  nomeEntrevistado: string;
  identificacao: string;
  endereco: string;
  idade: string;
  descricaoLesoes: string;
  depoimentoRelato: string;
};

export type Documentacao = {
  projetos: string;
  projetosArquivos: FileItem[];
  memorialCalculo: string;
  memorialCalculoArquivos: FileItem[];
  licencaAlvara: string;
  licencaAlvaraArquivos: FileItem[];
  art: string;
  artArquivos: FileItem[];
  planoManutencao: string;
  planoManutencaoArquivos: FileItem[];
  contratoManutencao: string;
  contratoManutencaoArquivos: FileItem[];
  registroManutencao: string;
  registroManutencaoArquivos: FileItem[];
  relatorioRia: string;
  relatorioRiaArquivos: FileItem[];
  outro: string;
  outroArquivos: FileItem[];
};

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
  autoridadePolicial: string;
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
  peritoResponsavel: string;
  peritoMatricula: string;
  riscoAcidente: string;
  riscoFisico: string;
  riscoQuimico: boolean;
  riscoBiologico: boolean;
  gravidade: string;
  probabilidade: string;
  medidasMitigatoria: string;
};

export type MembroSimples = {
  nome: string;
  matricula: string;
};

export type ForensicModel = {
  dadosIniciais: DadosIniciais;
  equipePericial: MembroEquipe[];
  materiais: Materiais;
  analisePreliminar: {
    reconhecimentoArea: string;
    condicoesAmbientais: string;
    caracteristicasLocal: string;
    informacoes: InformacaoFato[];
    arquivosReconhecimentoArea: FileItem[];
  };
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
    vestigiosEquipamentos: VestigioResumo[];

    depoimentos: Depoimento[];
    vestigiosEntrevistas: VestigioResumo[];

    cadaverSexo: string;
    cadaverCorPele: string;
    cadaverCabelo: string;
    cadaverSinaisIdentificadores: string;
    cadaverDescricaoVestes: string;
    cadaverOutro: string;
    analiseDisposicaoCadaver: string;
    arquivosDisposicaoCadaver: FileItem[];
    sinaisTanatologicos: string;
    arquivosTanatologicos: FileItem[];
    descricaoLesoesCadaver: string;
    arquivosLesoesCadaver: FileItem[];
    vestigiosPerinecroscopia: VestigioResumo[];
  };
};

export type VestigioCompleto = VestigioResumo & {
  dadosCompletos: {
    dadosPreliminares?: {
      numeroVestigio: string;
      naturezaVestigio: string;
    }[];
  };
};
