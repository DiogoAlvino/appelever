import { UploadWithMeta } from '~/models/uploadModel';

export type CampoChecklist = {
  id: number;
  titulo: string;
  resposta?: 'Sim' | 'Não' | 'NA';
  observacao?: string;
  audio?: string;
  arquivos?: UploadWithMeta[];
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
  id?: string;
  usuario: string;
  dataCriacao: Date;
  dadosIniciais: DadosIniciais;
  equipePericial: MembroEquipe[];
  materiais: {
    selecionados: number[];
    outroDescricao: string;
  };
  analisePreliminar: {
    reconhecimentoArea: string;
    condicoesAmbientais: string;
    caracteristicasLocal: string;
    informacoes: InformacaoFato[];
    arquivosReconhecimentoArea: UploadWithMeta[];
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
    arquivosDisposicaoCadaver: UploadWithMeta[];
    sinaisTanatologicos: string;
    arquivosTanatologicos: UploadWithMeta[];
    descricaoLesoesCadaver: string;
    arquivosLesoesCadaver: UploadWithMeta[];
    vestigiosPerinecroscopia: VestigioResumo[];
  };
};
