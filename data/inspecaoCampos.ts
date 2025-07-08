export interface CampoDescritivo {
  id: number;
  titulo: string;
}

export interface SecaoInspecaoCampos {
  [secao: string]: CampoDescritivo[];
}

export const inspecaoCampos: SecaoInspecaoCampos = {
  maquinaTracao: [
    { id: 1, titulo: 'Estado dos componentes da máquina de tração e sua fixação' },
    { id: 2, titulo: 'Desgaste do tambor/polia de tração' },
    { id: 3, titulo: 'Sistema de freios e sua capacidade de retenção' },
    { id: 4, titulo: 'Sistema de lubrificação e seus componentes' },
    { id: 5, titulo: 'Vazamentos de óleo e nível inadequado de lubrificante' },
    { id: 6, titulo: 'Vibrações anormais e seu registro antes do acidente' },
    { id: 7, titulo: 'Outros' },
  ],
  limitadorVelocidade: [
    { id: 1, titulo: 'Selo de calibração do limitador' },
    { id: 2, titulo: 'Teste de funcionamento do sistema de acionamento do freio de segurança' },
    { id: 3, titulo: 'Estado do cabo do limitador e sua tensão' },
    { id: 4, titulo: 'Registros de atuação/ensaio do limitador' },
    { id: 5, titulo: 'Outro' },
  ],
  cabos: [
    { id: 1, titulo: 'Diâmetro dos cabos para verificar desgaste' },
    { id: 2, titulo: 'Contagem de fios rompidos' },
    { id: 3, titulo: 'Estado das fixações dos cabos na cabine e contrapeso' },
    { id: 4, titulo: 'Padrão de ruptura (fadiga, corte abrupto, etc.)' },
    { id: 5, titulo: 'Deformações, corrosão ou outros danos visíveis' },
    { id: 6, titulo: 'Outros' },
  ],
  contrapeso: [
    { id: 1, titulo: 'Integridade estrutural do contrapeso' },
    { id: 2, titulo: 'Peso total (verificar se está conforme especificações)' },
    { id: 3, titulo: 'Estado das guias do contrapeso (desgaste, vibração, ruído)' },
    { id: 4, titulo: 'Estado dos elementos de fixação' },
    { id: 5, titulo: 'Outros' },
  ],
  cabine: [
    { id: 1, titulo: 'Integridade estrutural da cabine' },
    { id: 2, titulo: 'Deformações resultantes do acidente' },
    { id: 3, titulo: 'Sistema de suspensão da cabine' },
    { id: 4, titulo: 'Verificar compatibilidade com projeto' },
    { id: 5, titulo: 'Outros' },
  ],
  portas: [
    { id: 1, titulo: 'Avarias nos mecanismos de abertura porta' },
    { id: 2, titulo: 'Sistema de segurança que impede movimento com portas abertas' },
    { id: 3, titulo: 'Sensores de presença e reabertura' },
    { id: 4, titulo: 'Força de fechamento das portas' },
    { id: 5, titulo: 'Desgaste nas guias e rolamentos das portas' },
    { id: 6, titulo: 'Outros' },
  ],
  freiosEmergencia: [
    { id: 1, titulo: 'Estado e acionamento dos freios de segurança' },
    { id: 2, titulo: 'Superfícies dos freios para verificar se houve tentativa de acionamento' },
    { id: 3, titulo: 'Estado das cunhas ou garras de segurança' },
    { id: 4, titulo: 'Registro de ensaios ou teste de funcionamento anteriores' },
    { id: 5, titulo: 'Outros' },
  ],
  sistemaControle: [
    { id: 1, titulo: 'Registros de falha do sistema de controle (TLS)' },
    { id: 2, titulo: 'Programação e parâmetros operacionais' },
    { id: 3, titulo: 'Componentes eletrônicos para sinais de falha' },
    { id: 4, titulo: 'Histórico de operação (logs de funcionamento)' },
    { id: 5, titulo: 'Teste de atuação dos circuitos de segurança' },
    { id: 6, titulo: 'Outros' },
  ],

  sistemaEletrico: [
    { id: 1, titulo: 'Estado da fiação e isolamento' },
    { id: 2, titulo: 'Estado dos dispositivos de proteção (disjuntores, fusíveis)' },
    { id: 3, titulo: 'Contatores e relés (sinais de queima ou desgaste)' },
    { id: 4, titulo: 'Teste do sistema de resgate de emergência' },
    { id: 5, titulo: 'Análise de registros dos possíveis picos de tensão ou quedas de energia' },
    { id: 6, titulo: 'Outros' },
  ],

  sensores: [
    { id: 1, titulo: 'Teste de sensores de posição e sua calibração' },
    { id: 2, titulo: 'Funcionamento do sistema de nivelamento' },
    { id: 3, titulo: 'Funcionamento dos interruptores de fim de curso' },
    { id: 4, titulo: 'Operação do sistema de comunicação de emergência' },
    { id: 5, titulo: 'Sistema de alarme' },
    { id: 6, titulo: 'Sensores de sobrecarga (quando aplicável)' },
    { id: 7, titulo: 'Outros' },
  ],

  pocoElevador: [
    { id: 1, titulo: 'Estado dos amortecedores' },
    { id: 2, titulo: 'Meio de acesso' },
    { id: 3, titulo: 'Existência de acúmulo de óleo ou água no poço' },
    { id: 4, titulo: 'Elementos de fixação no fundo do poço' },
    { id: 5, titulo: 'Iluminação' },
    { id: 6, titulo: 'Outros' },
  ],
};
