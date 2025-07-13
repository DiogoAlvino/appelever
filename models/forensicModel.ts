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

export type ForensicModel = {
  dadosIniciais: DadosIniciais;
  equipePericial: MembroEquipe[];
};
