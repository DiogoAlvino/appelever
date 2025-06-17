export const questions = [
  {
    id: 1,
    name: "Quadro de Comando",
    questions: [
      {
        id: "1",
        verification: "Proteção contra falha à terra em um circuito com dispositivo de segurança elétrico e em um circuito de controle do freio ou em um circuito que controla a válvula de descida",
        priority: "Médio",
        risk: "Risco de Choque elétrico tanto ao usuário como ao técnico de manutenção; sobrecarga em circuitos, superaquecimento, parada inesperada, movimento errático e acidentes.",
        mitigation: "Prover a proteção contra falha à terra de acordo com a ABNT NBR 16858-1:2021, 5.11.1.4",
        normaID: "10.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "2",
        verification: "Proteção contra a inversão de fase no circuito de alimentação de potência",
        priority: "Baixo",
        risk: "Risco da danificar os compentes do sitema de tração, de sobrecarga e acidente.",
        mitigation: "Prover a proteção contra a inversão de fase para assegurar que a inversão de fase no circuito de alimentação de potência não possa ser a causa de funcionamento perigoso do elevador de acordo com a ABNT NBR 16858-1:2021, 5.11.1.2 j)",
        normaID: "10.2",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      },
      {
        id: "3",
        verification: "Exatidão de nivelamento e parada do carro",
        priority: "Alto",
        risk: "Ricos de lesão mediante quedas e acidentes. Para PCD, esse risco se torna ainda mais agravado.",
        mitigation: "Assegurar que a exatidão do nivelamento e parada esteja de acordo com a ABNT NBR 16858-1:2021, 5.12.1.1.4 - Modernizando o painel de comando de forma a assguram o desnível máximo de 10mm.",
        normaID: "10.3",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Proteção contra choque elétrico (contato direto)",
        priority: "Alto",
        risk: "Risco de Choque elétrico",
        mitigation: "Uso de dispositivos de proteção como disjuntores e interruptores diferenciais, aterramento adequado, isolamento de partes energizadas, barreiras físicas, sinalização clara e manutenção preventiva. Além disso, a capacitação dos trabalhadores e o uso de EPIs são essenciais para garantir a segurança.",
        normaID: "9.1",
        limit: "Curto prazo"
      },
      {
        id: "5",
        verification: "Marcações nos terminais dos circuitos que permanecem energizados mesmo após o desligamento do interruptor principal",
        priority: "Alto",
        risk: "Risco de Choque elétrico",
        mitigation: "Deve-se colocar  etiquetas de advertência permanente nos circuitosl, indicando a presença de tensão residual ou permanente e um risco de choque elétrico. Conforme a norma: Prover as marcações nos terminais dos circuitos que permanecem energizados mesmo após o desligamento do Interruptor principal de acordo com a ABNT NBR 16858-1:2021, 5.10.6.3.5",
        normaID: "9.2",
        limit: ""
      },
      {
        id: "6",
        verification: "Proteção contra o sobreraquecimento do motor elétrico da máquina do elevador (de tração ou hidráulico)",
        priority: "Baixo",
        risk: "Danos aos componentes elétricos e mecânicos, redução da eficiência, risco de incêndio, falhas no sistema de controle e até parada inesperada, colocando em risco a segurança dos passageiros",
        mitigation: "Implementação de dispositivos como relé térmico (que desliga o motor ao ultrapassar a temperatura segura), sensores de temperatura (para monitoramento contínuo)",
        normaID: "9.3",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      },
      {
        id: "7",
        verification: "Interruptor principal preparado para bloqueio contra acionamento indevido",
        priority: "Alto",
        risk: "Acionamento acidental, expondo trabalhadores a choques elétricos e aumentando o risco de falhas no sistema. Isso compromete a segurança dos passageiros e a integridade do equipamento.",
        mitigation: "Prover interruptores principais bloqueáveis de acordo com a Norma Técnica",
        normaID: "9.4",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 2,
    name: "Máquina de Tração",
    questions: [
      {
        id: "1",
        verification: "Pelo menos dois conjuntos independentes de freios eletromecânicos",
        priority: "Alto",
        risk: "Risco de acidentes graves, como quedas ou movimentos descontrolados, devido à falta de redundância nos freios, comprometendo a segurança do elevador",
        mitigation: "Prover os freios de acordo com a ABNT NBR 16858-1:2021, 5.9.2.2.2",
        normaID: "8.1",
        limit: "Curto prazo"
      },
      {
        id: "2",
        verification: "Sistema de operação de emergência",
        priority: "Alto",
        risk: "Além de risco de acidente  coexiste em situações de emergência, o estresse, pânico e sensação de confinamento podem afetar tanto os passageiros quanto os operadores.",
        mitigation: "a) prover um sistema de operação de emergência para elevadores com acionamento por tração e acionamento positivo de acordo com a ABNT NBR 16858-1:2021, 5.9.2 3, ou b)    prover um sistema de operação de emergência para elevadores hidráulicos de acordo com a ABNT NBR 16858-1:2021, 5.9.3.9, e c)    fornecer as instruções conforme definido na ABNT NBR 16858-1:2021, 7.2.2",
        normaID: "8.2",
        limit: "Imediato"
      },
      {
        id: "3",
        verification: "Meios de parada da máquina e verificação da sua condição de parada",
        priority: "Alto",
        risk: "Risco de acidente em caso de movimentação indevida sistema.",
        mitigation: "Prover os meios de parada da máquina e verificação da sua condição de parada de acordo com a ABNT NBR 16858-1:2021, 5.9.2.5 ou 5.9.3. 4",
        normaID: "8.3",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Limitador de tempo de funcionamento do motor",
        priority: "Baixo",
        risk: "Risco de falhas mecânicas, desgate prematuro de componentes, sobreaquecimento.",
        mitigation: "Prover um limitador de tempo de funcionamento do motor de acordo com a ABNT NBR 16858-1:2021, 5.9.2.7 ou 5.9.3.10",
        normaID: "8.4",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      },
      {
        id: "5",
        verification: "Válvula de isolamento (elevadores hidráulicos)",
        priority: "Baixo",
        risk: "Risco de acidente visto que compromete a segurança dos passageiros, pois em situações de emergência, não seria possível interromper rapidamente o fluxo de fluido.",
        mitigation: "Prover a válvula de isolamento de acordo com a ABNT NBR 16858-1:2021, 5.9.3.5.1",
        normaID: "8.5",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      }
    ]
  },
  {
    id: 3,
    name: "Freios",
    questions: [
      {
        id: "1",
        verification: "Pelo menos dois conjuntos independentes de freios eletromecânicos",
        priority: "Alto",
        risk: "Risco de acidentes graves, como quedas ou movimentos descontrolados, devido à falta de redundância nos freios, comprometendo a segurança do elevador",
        mitigation: "Prover os freios de acordo com a ABNT NBR 16858-1:2021, 5.9.2.2.2",
        normaID: "8.1",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 4,
    name: "Motor Elétrico",
    questions: [
    ]
  },
  {
    id: 5,
    name: "Polia de Tração",
    questions: [
      {
        id: "1",
        verification: "Proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade, polias tensoras e coroas dentadas",
        priority: "Médio",
        risk: "Risco de acidente, visto que as partes móveis, como polias motrizes, limitadores de velocidade, polias de desvio, polias tensoras e coroas dentadas, sem a devida proteção durante a manutenção podem expor os técnicos a lesões graves, como esmagamentos, cortes e fraturas.",
        mitigation: "a) instalar a proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade e polias tensoras de acordo com a ABNT NBR 16858-1 2021, 5.5.6, ou b) instalar a proteção contra as lesões causadas pelas coroas dentadas de forma análoga às polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 6,
    name: "Aparelho Seletor/Sensor",
    questions: [
    ]
  },
  {
    id: 7,
    name: "Limitador de Velocidade",
    questions: [
      {
        id: "1",
        verification: "Dispositivo elétrico de segurança de cabo frouxo do limitador de velocidade",
        priority: "Médio",
        risk: "Risco de acidente, visto que a ausência de um dispositivo de monitoramento de tensão do cabo no limitador de velocidade do elevador pode resultar em falhas críticas no sistema de segurança.",
        mitigation: "Instalar um dispositivo de segurança elétrico de acordo com a ABNT NBR 16858-1:2021, 5.6.2.2.1.6 c)",
        normaID: "6.8",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 8,
    name: "Polia de Desvio",
    questions: [
      {
        id: "1",
        verification: "Proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade, polias tensoras e coroas dentadas",
        priority: "Médio",
        risk: "Risco de acidente, visto que as partes móveis, como polias motrizes, limitadores de velocidade, polias de desvio, polias tensoras e coroas dentadas, sem a devida proteção durante a manutenção podem expor os técnicos a lesões graves, como esmagamentos, cortes e fraturas.",
        mitigation: "a) instalar a proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade e polias tensoras de acordo com a ABNT NBR 16858-1 2021, 5.5.6, ou b) instalar a proteção contra as lesões causadas pelas coroas dentadas de forma análoga às polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 9,
    name: "Fita Seletora",
    questions: [
    ]
  },
  {
    id: 10,
    name: "Cabo de Aço de Tração",
    questions: [
      {
        id: "1",
        verification: "Proteção contra queda livre do carro e velocidade excessiva no sentido de descida do carro",
        priority: "Alto",
        risk: "Risco de Acidente, queda do equipamento.",
        mitigation: "Freio de Segurança por acionamento através do limitador de velocidade - a)    verificar que todos os componentes existentes para proteção contra queda livre do carro ou velocidade excessiva do carro no sentido de descida sejam adequados e estejam funcionais, caso contrário b)    prover os meios de proteção contra a queda livre do carro ou contra a velocidade excessiva do carro no sentido de descida de acordo com a ABNT NBR 16858-1:2021, Tabela 10 ou",
        normaID: "6.4",
        limit: "Curto prazo"
      },
      {
        id: "2",
        verification: "Proteção contra a sobrevelocidade do carro ascendente em elevadores com acionamento por tração com contrapeso",
        priority: "Médio",
        risk: "Risco de Acidente.",
        mitigation: "Intalação de dispositivos como Roper Gripper, Limitador de velocidade bidirecional ou freio de emergência no contrapeso - Instalar o meio de proteção contra a sobrevelocidade do carro ascendente de acordo com a ABNT NBR 16858-1:2021, 5.6.6",
        normaID: "6.5",
        limit: "Curto prazo"
      },
      {
        id: "3",
        verification: "Proteção contra o movimento não intencional do carro com as portas abertas",
        priority: "Alto",
        risk: "Risco de movimentação inesperada do carro.",
        mitigation: "Instalar o meio de proteção contra o movimento não Intencional do carro com as portas abertas de acordo com a ABNT NBR 16858-1:2021, 5.6.7",
        normaID: "6.6",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Dispositivo elétrico de segurança de cabo de tração/ corrente frouxo",
        priority: "Médio",
        risk: "Risco de acidente, visto que a ausência de um dispositivo de monitoramento de tensão do cabo tração da máquina de tração do elevador pode resultar em falhas críticas no sistema de segurança.",
        mitigation: "a) instalar um dispositivo de segurança contra o afrouxamento do cabo de acordo com a ABNT NBR 16858-1:2021, 5.5 4.3, ou b)    instalar a proteção contra o afrouxamento da corrente de forma análoga à proteção contra o afrouxamento do cabo de acordo com a ABNT NBR 16858-1:2021, 5.5.4.3",
        normaID: "6.9",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 11,
    name: "Cabo do Limitador/Regulador",
    questions: [
      {
        id: "1",
        verification: "Dispositivo elétrico de segurança de cabo frouxo do limitador de velocidade",
        priority: "Médio",
        risk: "Risco de acidente, visto que a ausência de um dispositivo de monitoramento de tensão do cabo no limitador de velocidade do elevador pode resultar em falhas críticas no sistema de segurança.",
        mitigation: "Instalar um dispositivo de segurança elétrico de acordo com a ABNT NBR 16858-1:2021, 5.6.2.2.1.6 c)",
        normaID: "6.8",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 12,
    name: "Cabina",
    questions: [
      {
        id: "1",
        verification: "Botoeira de inspeção e dispositivo de parada no topo do carro",
        priority: "Alto",
        risk: "Risco significativo para o técnico de manutenção, pois impede a desativação segura do sistema durante os procedimentos de manutenção. Isso aumenta a probabilidade de acidentes, como o acionamento involuntário do elevador enquanto o técnico está em cima do carro, expondo-o ao risco de quedas, esmagamentos ou outras lesões graves.",
        mitigation: "a) prover uma botoeira de inspeção de acordo com a ABNT NBR 16858-1:2021, 5.4.8 a), e b)    prover um dispositivo de parada de acordo com a ABNT NBR 16858-1:2021, 5.4.8 b)",
        normaID: "10.4",
        limit: "Curto prazo"
      },
      {
        id: "2",
        verification: "Comunicação entre a cabina e o local da operação de emergência",
        priority: "Médio",
        risk: "Risco de acidentes e risco psicossocial, pois pode causar pânico ou agravamento da situação em casos de pessoas presas no elevador, principalmente em situações de emergência, como falhas de energia ou acidentes.",
        mitigation: "Instalar um sistema de intercomunicação ou um dispositivo similar de acordo com a ABNT NBR 16858-1:2021, 5.12.3.2",
        normaID: "3.8",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "3",
        verification: "Relação entre a área útil da cabina e a carga nominal",
        priority: "Baixo",
        risk: "",
        mitigation: "a) ajustar a relação entre a área útil da cabina e a carga nominal de acordo com a ABNT NBR 16858-1:2021, 5.4.2, ou b)    restringir o uso deste tipo de elevador a usuários previamente instruídos",
        normaID: "5.1",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Controle de carga na cabina para evitar uma partida normal do elevador no caso de uma sobrecarga",
        priority: "Baixo",
        risk: "A sobrecarga possibilita consequências como falhas operacionais, desnivelamento entre o piso da cabine e o andar, ou até mesmo queda livre em casos extremos.",
        mitigation: "Prover um controle de carga de acordo com a ABNT NBR 16858-1:2021, 5.12.1.2",
        normaID: "5.10",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "5",
        verification: "Sistema de alarme que permite comunicação por voz de duplo sentido",
        priority: "Alto",
        risk: "Riscos significativos de acidentes e comprometimento da segurança em situações de emergência. Sem esse sistema, um passageiro preso no elevador pode enfrentar dificuldades para solicitar socorro de maneira eficiente, especialmente em casos de pânico, problemas de saúde ou situações de risco iminente, como incêndios ou falhas elétricas.",
        mitigation: "Prover um sistema de alarme que permite comunicação por voz de duplo sentido de acordo com a ABNT NBR 16858-1:2021, 5.2.1.6, 5.12.3",
        normaID: "5.11",
        limit: "Curto prazo"
      },
      {
        id: "6",
        verification: "Travamento do alçapão de emergência no teto da cabina",
        priority: "Médio",
        risk: "Risco de acidente com queda ou lesão grave. Se o alçapão estiver inadequado ou travado de maneira errada, o sistema de resgate fica comprometido, o que aumenta a possibilidade de acidentes mais graves.",
        mitigation: "Instalar um dispositivo de travamento do alçapão de acordo com a ABNT NBR 16858-1:2021, 5.4.6.3",
        normaID: "5.3",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "7",
        verification: "Resistência do teto da cabina e do alçapão de emergência",
        priority: "Baixo",
        risk: "o Risco de acidente decorre da possibilidade de o teto da cabine do elevador o ceder ou sofrer deformações  durante a manutenção do equipamento ou situação de resgate.",
        mitigation: "Reforçar o teto da cabina e o alçapão de emergência de acordo com a ABNT NBR 16858-1:2021, 5.4.7.1-a) e 5 2.3.4",
        normaID: "5.4",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      },
      {
        id: "8",
        verification: "Ventilação na cabina",
        priority: "Médio",
        risk: "A ventilação insuficiente na cabine de um elevador de passageiros pode resultar em acúmulo de dióxido de carbono (CO2), desconforto térmico, aumento de contaminantes no ar e dificuldades respiratórias, colocando em risco a saúde dos ocupantes. Além disso, em situações de emergência, a falta de ventilação adequada pode agravar o pânico.",
        mitigation: "Prover a ventilação na cabina de acordo com a ABNT NBR 16858-1 2021, 5.4.9",
        normaID: "5.6",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "9",
        verification: "Iluminação normal na cabina",
        priority: "Médio",
        risk: "A falta de iluminação adequada pode dificultar a visão e aumentar o risco de acidentes, como quedas ou colisões, especialmente em casos de emergência.",
        mitigation: "Provera iluminação de acordo com a ABNT NBR 16858-1:2021, 5.4.10.1,5.4.10.2 e 5.4.10.3",
        normaID: "5.7",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "10",
        verification: "Iluminação de emergência na cabina",
        priority: "Médio",
        risk: "A falta de iluminação adequada pode dificultar a visão e aumentar o risco de acidentes, como quedas ou colisões, especialmente em casos de emergência.",
        mitigation: "Provera iluminação de emergência na cabina de acordo com a ABNT NBR 16858-1:2021, 5.4.10.4",
        normaID: "5.8",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "11",
        verification: "Iluminação de emergência no teto da cabina",
        priority: "Médio",
        risk: "A falta de iluminação adequada pode dificultar a visão e aumentar o risco de acidentes, como quedas ou colisões, especialmente em casos de emergência.",
        mitigation: "Provera iluminação de emergência no teto da cabina de acordo com a ABNT NBR 16858-1:2021, 5.4.10.4",
        normaID: "5.9",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      }
    ]
  },
  {
    id: 13,
    name: "Corredicas De Cabina",
    questions: [
    ]
  },
  {
    id: 14,
    name: "Armacao De Cabina",
    questions: [
    ]
  },
  {
    id: 15,
    name: "Guia De Cabina",
    questions: [
    ]
  },
  {
    id: 16,
    name: "Freio De Seguranca",
    questions: [
      {
        id: "1",
        verification: "Proteção contra queda livre do carro e velocidade excessiva no sentido de descida do carro",
        priority: "Alto",
        risk: "Risco de Acidente, queda do equipamento.",
        mitigation: "Freio de Segurança por acionamento através do limitador de velocidade - a) verificar que todos os componentes existentes para proteção contra queda livre do carro ou velocidade excessiva do carro no sentido de descida sejam adequados e estejam funcionais, caso contrário b)    prover os meios de proteção contra a queda livre do carro ou contra a velocidade excessiva do carro no sentido de descida de acordo com a ABNT NBR 16858-1:2021, Tabela 10 ou",
        normaID: "6.4",
        limit: "Curto prazo"
      },
      {
        id: "2",
        verification: "Proteção contra a sobrevelocidade do carro ascendente em elevadores com acionamento por tração com contrapeso",
        priority: "Médio",
        risk: "A ausência de meio de controle de  sobrevelocidade do carro ascendente, compromete a segurança dos usuários em virtude dos risco de movimentos descontrolados, gerando impactos fortes ou até falhas catastróficas.",
        mitigation: "Intalação de dispositivos como Roper Gripper, Limitador de velocidade bidirecional ou freio de emergência no contrapeso - Instalar o meio de proteção contra a sobrevelocidade do carro ascendente de acordo com a ABNT NBR 16858-1:2021, 5.6.6",
        normaID: "",
        limit: ""
      },
      {
        id: "3",
        verification: "Proteção contra o movimento não intencional do carro com as portas abertas",
        priority: "Alto",
        risk: "Risco de movimentação inesperada do carro.",
        mitigation: "Instalar o meio de proteção contra o movimento não Intencional do carro com as portas abertas de acordo com a ABNT NBR 16858-1:2021, 5.6.7",
        normaID: "6.6",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Dispositivo elétrico de segurança de cabo de tração/ corrente frouxo",
        priority: "Médio",
        risk: "Risco de acidente, visto que a ausência de um dispositivo de monitoramento de tensão do cabo tração da máquina de tração do elevador pode resultar em falhas críticas no sistema de segurança.",
        mitigation: "a) instalar um dispositivo de segurança contra o afrouxamento do cabo de acordo com a ABNT NBR 16858-1:2021, 5.5 4.3, ou b)    instalar a proteção contra o afrouxamento da corrente de forma análoga à proteção contra o afrouxamento do cabo de acordo com a ABNT NBR 16858-1:2021, 5.5.4.3",
        normaID: "6.9",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 17,
    name: "Contrapeso",
    questions: [
      {
        id: "1",
        verification: "Proteção de quaisquer espaços acessíveis abaixo da caixa, onde não existe pilar sólido, que se estende para baixo até o solo firme",
        priority: "Baixo",
        risk: "Risco de acidente ocorre quando não há proteção adequada abaixo da caixa do elevador diante de impacto em caso de falhas do equipamento.",
        mitigation: "Instalar um freio de segurança no contrapeso ou no peso de balanceamento de acordo com a ABNT NBR 16858-1:2021, 5.2.5.4",
        normaID: "2.7",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      }
    ]
  },
  {
    id: 18,
    name: "Suporte De Corredica",
    questions: [
    ]
  },
  {
    id: 19,
    name: "Armacao De Contrapeso",
    questions: [
    ]
  },
  {
    id: 20,
    name: "Guia Do Contrapeso",
    questions: [
      {
        id: "1",
        verification: "Sistema de guias para contrapeso ou peso de balanceamento",
        priority: "Baixo",
        risk: "Risco de acidente ocorre quando o sistema de guias para contrapeso ou peso de balanceamento é inadequado, podendo causar desalinhamento, falha no movimento do contrapeso comprometendo a segurança estrutural. Isso pode levar ao descontrole do sistema, resultando em quedas ou movimentos bruscos do elevador.",
        mitigation: "a) instalar as guias rígidas de acordo com a ABNT NBR 16858-1:2021, 5.7, ou b) prover o guiamento de acordo com a EN 81-21:2018, 5.4.3",
        normaID: "7.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 21,
    name: "Para",
    questions: [
      {
        id: "1",
        verification: "Para-choques do carro e do contrapeso",
        priority: "Alto",
        risk: "A falta de para-choques ou sua ineficácia aumenta o risco de falhas graves no sistema, especialmente em situações de paradas bruscas.",
        mitigation: "Instalar os para-choques de acordo com a ABNT NBR 16858-1:2021, 5.8",
        normaID: "7.2",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 22,
    name: "Polia Tensora",
    questions: [
      {
        id: "1",
        verification: "Proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade, polias tensoras e coroas dentadas",
        priority: "Médio",
        risk: "Risco de acidente, visto que as partes móveis, como polias motrizes, limitadores de velocidade, polias de desvio, polias tensoras e coroas dentadas, sem a devida proteção durante a manutenção podem expor os técnicos a lesões graves, como esmagamentos, cortes e fraturas.",
        mitigation: "a) instalar a proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade e polias tensoras de acordo com a ABNT NBR 16858-1 2021, 5.5.6, ou b) instalar a proteção contra as lesões causadas pelas coroas dentadas de forma análoga às polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 23,
    name: "Limite",
    questions: [
      {
        id: "1",
        verification: "Limitadores de percurso final",
        priority: "Médio",
        risk: "Risco de falha no limitador de fim de percurso em elevadores de passageiros a tração é significativo, pois pode resultar em movimentos descontrolados do elevador, comprometendo a segurança dos usuários. A falta de interrupção adequada do movimento pode causar colisões ou danos estruturais,  exige o monitoramento rigoroso e manutenção preventiva para evitar acidentes graves.",
        mitigation: "Instalar os limitadores de percurso final de acordo com a ABNT NBR 16858-1:2021, 5.12.2",
        normaID: "7.3",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      }
    ]
  },
  {
    id: 24,
    name: "Porta De Pavimento",
    questions: [
      {
        id: "1",
        verification: "Portas de pavimento não perfuradas",
        priority: "Alto",
        risk: "Em caso de portas perfuradas, há risco de usuários colocarem as mãos indevidamente, o que pode resultar em ferimentos. Além disso, objetos podem ser lançados no poço, causando danos ao mecanismo de fechamento e comprometendo o sistema de segurança do elevador.",
        mitigation: "Instalar as portas de pavimento não perfuradas de acordo com a ABNT NBR 16858-12021, 5.3.1.2",
        normaID: "4.1",
        limit: "Imediato"
      },
      {
        id: "2",
        verification: "Dispositivo de proteção (150 N) para limitar o esforço necessário para evitar o fechamento das portas corrediças acionadas automaticamente",
        priority: "Alto",
        risk: "O risco de falha ou dispositivos impróprio das  portas automáticas corrediças é um risco sério, pois, sem ele, as portas podem não detectar obstruções adequadamente e continuar fechando com força o que possibilita ocasionar  lesões aos passageiros.",
        mitigation: "Instalar os dispositivos de acordo com a ABNT NBR 16858-1:2021, 5.3.6.2.2.1 -c) e d)",
        normaID: "4.10",
        limit: "Curto prazo"
      },
      {
        id: "3",
        verification: "Dispositivo de proteção (150 N) para limitar o esforço necessário para evitar o fechamento das portas não corrediças acionadas automaticamente",
        priority: "Alto",
        risk: "O risco de falha ou dispositivos impróprio das  portas automáticas corrediças é um risco sério, pois, sem ele, as portas podem não detectar obstruções adequadamente e continuar fechando com força o que possibilita ocasionar  lesões aos passageiros.",
        mitigation: "Instalar os dispositivos de acordo com a ABNT NBR 16858-1:2021, 5.3 6.2.2.1-c) e d)",
        normaID: "4.11",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Iluminação nos pavimentos",
        priority: "Médio",
        risk: "A iluminação inadequada ou inexistente nos pavimentos aumenta o risco de acidentes, como quedas, devido à visibilidade reduzida. Isso prejudica a segurança dos usuários, especialmente em áreas de acesso e embarque de elevadores. A norma exige iluminação adequada para garantir a visibilidade e segurança em todos os pavimentos.",
        mitigation: "Prover uma iluminação suficiente em cada pavimento de acordo com a ABNT NBR 16858-1:2021, 5.3.7",
        normaID: "4.13",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "5",
        verification: "Dispositivos de travamento da porta de pavimento",
        priority: "Alto",
        risk: "A ausência de um dispositivo de travamento seguro na porta de pavimento pode resultar na abertura involuntária da porta, expondo os usuários a riscos de acidentes.",
        mitigation: "Substituir todos os dispositivos de travamento da porta de pavimento segundo a ABNT NBR 16858-1:2021, 5.3.9.1",
        normaID: "4.14",
        limit: "Curto prazo"
      },
      {
        id: "6",
        verification: "Destravamento de emergência das portas de pavimento com dispositivo de destravamento de emergência especifico (chave tipo triângulo)",
        priority: "Alto",
        risk: "A falta de um dispositivo de destravamento de emergência, como a chave tipo triângulo, na porta de pavimento compromete a evacuação rápida e segura em situações de emergência.",
        mitigation: "Instalar o dispositivo de destravamento de emergência de acordo com a ABNT NBR 16858-1:2021, 5.3.9.3",
        normaID: "4.15",
        limit: "Curto prazo"
      },
      {
        id: "7",
        verification: "Fechamento e travamento da porta de pavimento após a abertura por qualquer razão quando a cabina estiver fora da zona de destravamento",
        priority: "Alto",
        risk: "A porta de pavimento (eixo vertical) está fechada, mas não está trancada. Nas portas de pavimento automáticas dispositivo de travamento em não conformidade com a norma.",
        mitigation: "Instalar um dispositivo de fechamento de acordo com a ABNT NBR 16858-1:2021, 5.3.9.3.4",
        normaID: "4.16",
        limit: "Curto prazo"
      },
      {
        id: "8",
        verification: "Portas de pavimento corrediças multifolhas interligadas mecanicamente (ligação mecânica direta ou confirmação por um dispositivo de segurança elétrico da posição fechada da(s) outra(s)folha(s) não travada(s))",
        priority: "Médio",
        risk: "Risco de abertura involuntária de uma das folhas durante o movimento do elevador, comprometendo a segurança do usuário, podendo evolir para acidentes, como a queda de passageiros ou o bloqueio da entrada/saída. Além disso, a falha pode impedir o correto fechamento das portas, resultando em falha no sistema de segurança.",
        mitigation: "Instalar os dispositivos de acordo com a ABNT NBR 16858-1:2021, 5.3.11",
        normaID: "4.17",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "9",
        verification: "Resistência ao fogo das portas de pavimento",
        priority: "Médio",
        risk: "A ausência de resistência a fogo pode resultar na propagação rápida de chamas e fumaça entre andares, comprometendo a segurança dos usuários durante evacuação e expondo os técnicos a riscos elevados durante intervenções de emergência, dificultando o controle do fogo.",
        mitigation: "Caso as portas de pavimento existentes não estejam em acordo com os regulamentos locais de incêndio da época, instalar as portas de pavimento de acordo com a ABNT NBR 16858-1:2021, 5.3.5.2",
        normaID: "4.18",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "10",
        verification: "A porta automática corrediça horizontal da cabina opera após o fechamento da porta de pavimento do tipo eixo vertical",
        priority: "Médio",
        risk: "O risco ocorre quando a porta de cabina se move enquanto a porta de pavimento está aberta, permitindo o acesso ao poço do elevador. Isso pode resultar em quedas ou acidentes com os usuários, pois há a possibilidade de entrar em um espaço não seguro. A movimentação simultânea pode causar lesões graves.",
        mitigation: "a) assegurar que a porta de pavimento do tipo eixo vertical não esteja destravada até que a porta da cabina esteja totalmente aberta e b)    assegurar que a porta da cabina não inicie o fechamento até que a porta de pavimento do tipo eixo vertical esteja fechada e c)    não são permitidas fechaduras ou travas nas portas de pavimento além dos dispositivos de operação do elevador.",
        normaID: "4.19",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "11",
        verification: "Mecanismo limitador de abertura da porta da cabina onde o dispositivo de travamento da porta de pavimento for acessível a partir do interior da cabina com a cabina fora da zona de destravamento de porta",
        priority: "Médio",
        risk: "O risco é que, com o mecanismo limitador de abertura da porta acessível de dentro da cabina, o operador possa acionar o dispositivo de travamento inadvertidamente, resultando em abertura indevida da porta de pavimento enquanto a cabina está fora da zona de destravamento, o que pode causar acidentes.",
        mitigation: "a) prover o mecanismo limitador de abertura da porta da cabina de acordo com a ABNT NBR 16858-1:2021,5.3.15.2 ou b)    prover um dispositivo de travamento da porta da cabina de acordo com a ABNT NBR 16858-1:2021, 5.3.9.2",
        normaID: "4.21",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "12",
        verification: "Portas de cabina e/ou portas de pavimento pantográficas",
        priority: "Alto",
        risk: "O risco com portas pantográficas é o potencial de falha no mecanismo de fechamento, que pode resultar em fechamento incompleto ou irregular com  possibilidade de acidentes, como esmagamento de passageiros ou obstrução da porta, comprometendo a segurança do sistema.",
        mitigation: "substituir por portas corrediças horizontais de acordo com aABNT NBR 16858-1, 5.3, dentro do razoável e praticável (ver 3.3)",
        normaID: "4.22",
        limit: "Curto prazo"
      },
      {
        id: "13",
        verification: "Resistência mecânica das portas de pavimento",
        priority: "Alto",
        risk: "O risco de resistência inadequada das portas de pavimento é que elas podem não suportar impactos ou esforços mecânicos, levando a deformações ou falhas.",
        mitigation: "Instalar as portas de pavimento de acordo com a ABNT NBR 16858-1:2021, 5.3.5.3",
        normaID: "4.3",
        limit: "Curto prazo"
      },
      {
        id: "14",
        verification: "Portas de pavimento com vidro que não seja o painel visor",
        priority: "Alto",
        risk: "O risco de painel de vidro inadequado nas portas de pavimento é a possibilidade de quebra ou estilhaçamento, representando perigo de cortes e lesões aos passageiros.",
        mitigation: "Instalar as portas de pavimento com vidro de acordo com a ABNT NBR 16858-1:2021, 5.3.5.3.4. 5.3.5 3.5, 5 3.5.3.6, 5.3.5.37",
        normaID: "4.5",
        limit: "Curto prazo"
      },
      {
        id: "15",
        verification: "Painel visor de vidro nas portas de pavimento",
        priority: "Alto",
        risk: "O risco de vidro do visor inadequado nas portas de pavimento é a possibilidade de quebra, causando estilhaços que podem ferir os usuários.",
        mitigation: "a) adequar as dimensões do visor e substituir por vidro laminado de acordo com o Anexo B ou b) substituir o painel visor por um painel sólido e adicionar um indicador de ‘carro aqui’ de acordo com o Anexo B NBR 16858-7",
        normaID: "4.7",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 25,
    name: "Fechador Hidraulico De Portas",
    questions: [
    ]
  },
  {
    id: 26,
    name: "Botoeiras De Pavimento",
    questions: [
      {
        id: "1",
        verification: "Resistência ao vandalismo",
        priority: "NA",
        risk: "O risco de resistência inadequada ou inexistente contra vandalismo é a possibilidade de danos a botoeira e outros componentes do elevador, comprometendo sua funcionalidade e segurança.",
        mitigation: "Na ausência de requisitos da legislação local ou norma nacional, prover medidas de acordo com a CEN/TS 81-83",
        normaID: "1.2",
        limit: "0"
      },
      {
        id: "2",
        verification: "Acessibilidade para pessoas com mobilidade reduzida ou deficiência",
        priority: "NA",
        risk: "O risco de restrição de direitos da pessoas com deficiência de acesso ao elevador, impedindo que indivíduos com mobilidade reduzida ou deficiências utilizem o serviço de forma segura e independente.",
        mitigation: "Prover medidas de acordo com a ABNT NBR 16858-3",
        normaID: "1.1",
        limit: "0"
      }
    ],
  },
  {
    id: 27,
    name: "Aba De Protecao",
    questions: [
      {
        id: "1",
        verification: "Protetor da soleira da cabina (avental) para evitar que pessoa caia na caixa",
        priority: "Alto",
        risk: "A operação de resgate de passageiros retidos no interior da cabina apresenta-se como uma situação de risco elevado, devido à possibilidade de queda no poço do elevador durante a tentativa de resgate",
        mitigation: "Instalar um protetor da soleira abaixo da soleira da cabina.",
        normaID: "5.2",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 28,
    name: "Porta De Cabina",
    questions: [
      {
        id: "1",
        verification: "Portas de pavimento não perfuradas",
        priority: "Alto",
        risk: "Em caso de porta perfurada, a risco de entrada de objetos serem lançados no poço, alem disso, possibilita  a ocorrência de danos mecanismo de fechamento, levando a falhas no sistema de segurança.",
        mitigation: "Instalar as portas de pavimento não perfuradas de acordo com a ABNT NBR 16858-12021, 5.3.1.2",
        normaID: "4.1",
        limit: "Imediato"
      },
      {
        id: "2",
        verification: "Meio contra o agarramento de mãos de crianças em portas de cabina ou portas de pavimento corrediças horizontais com vidro",
        priority: "Médio",
        risk: "O risco de agarramento das mãos de crianças em portas de cabine ou portas de pavimento corrediças horizontais ocorre quando há espaços excessivos entre as folhas das portas ou a estrutura, podendo levar a lesões.",
        mitigation: "Instalar uma proteção de acordo com a ABNT NBR 16858-1:2021, 5.3.6.2.2.1-g)",
        normaID: "4.12",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "3",
        verification: "Presença da(s) porta(s) da cabina",
        priority: "Alto",
        risk: "O risco ocorre quando a porta de cabina se move enquanto a porta de pavimento está aberta, permitindo o acesso ao poço do elevador. Isso pode resultar em quedas ou acidentes com os usuários, pois há a possibilidade de entrar em um espaço não seguro. A movimentação simultânea pode causar lesões graves.",
        mitigation: "a) instalar as porta(s)automática(s) da cabina de acordo com a ABNT NBR 16858-1:2021, 5.3.6.22.1 ou b) instalar as porta(s) elétrica(s) nâo automática(s) de cabina de acordo com a ABNT NBR 16858-1:2021, 5.3.6.2.2 2",
        normaID: "4.20",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Mecanismo limitador de abertura da porta da cabina onde o dispositivo de travamento da porta de pavimento for acessível a partir do interior da cabina com a cabina fora da zona de destravamento de porta",
        priority: "Médio",
        risk: "O risco é que, com o mecanismo limitador de abertura da porta acessível de dentro da cabina, o operador possa acionar o dispositivo de travamento inadvertidamente, resultando em abertura indevida da porta de pavimento enquanto a cabina está fora da zona de destravamento, o que pode causar acidentes.",
        mitigation: "a) prover o mecanismo limitador de abertura da porta da cabina de acordo com a ABNT NBR 16858-1:2021,5.3.15.2 ou b) prover um dispositivo de travamento da porta da cabina de acordo com a ABNT NBR 16858-1:2021, 5.3.9.2",
        normaID: "4.21",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "5",
        verification: "Portas de cabina e/ou portas de pavimento pantográficas",
        priority: "Alto",
        risk: "O risco com portas pantográficas é o potencial de falha no mecanismo de fechamento, que pode resultar em fechamento incompleto ou irregular com  possibilidade de acidentes, como esmagamento de passageiros ou obstrução da porta, comprometendo a segurança do sistema.",
        mitigation: "substituir por portas corrediças horizontais de acordo com aABNT NBR 16858-1, 5.3, dentro do razoável e praticável (ver 3.3)",
        normaID: "4.22",
        limit: "Curto prazo"
      },
      {
        id: "6",
        verification: "Resistência mecânica das portas da cabina",
        priority: "Alto",
        risk: "O risco de resistência inadequada das portas de cabina é que elas podem não suportar impactos ou esforços mecânicos, levando a deformações ou falhas.",
        mitigation: "Instalar as portas da cabina de acordo com a ABNT NBR 16858-12021, 5.3.5 3",
        normaID: "4.4",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "7",
        verification: "Portas da cabina com vidro que não seja o painel visa",
        priority: "Alto",
        risk: "O risco de painel de vidro inadequado nas portas de cabina é a possibilidade de quebra ou estilhaçamento, representando perigo de cortes e lesões aos passageiros.",
        mitigation: "Instalar as portas da cabina com vidro de acordo com aABNT NBR 16858-1:2021, 5 3.5.3.4, 5.3.5 3.5, 5 3.5.3.6, 5.3.5.37",
        normaID: "4.6",
        limit: "Curto prazo"
      },
      {
        id: "8",
        verification: "Painel visor de vidro nas portas da cabina",
        priority: "Alto",
        risk: "O risco de vidro do visor inadequado nas portas de cabine é a possibilidade de quebra, causando estilhaços que podem ferir os usuários.",
        mitigation: "Reduzir a dimensão do painel visor e substituir por vidro laminado de acordo com o Anexo B - Norma ANBT 16858-7",
        normaID: "4.8",
        limit: "Curto prazo"
      },
      {
        id: "9",
        verification: "Dispositivo de proteção (por exemplo, cortina de luz) para reabertura da(s) porta(s), caso ela(s) bata(m) ou esteja(m) na iminência de bater contra uma pessoa que esteja na entrada durante o movimento de fechamento",
        priority: "Alto",
        risk: "Usuário  atingindo pela porta do levador devido seu fechamento abrupto. Pessoas debilitadas, crianças e idosos são especialmente vulneráveis.",
        mitigation: "Instalação de sensor de presença, barreira de infravermelho.",
        normaID: "4.9",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 29,
    name: "Operador De Porta De Cabina",
    questions: [
      {
        id: "1",
        verification: "Dispositivo de proteção (150 N) para limitar o esforço necessário para evitar o fechamento das portas não corrediças acionadas automaticamente",
        priority: "Alto",
        risk: "O risco de falha ou dispositivos impróprio das  portas automáticas corrediças é um risco sério, pois, sem ele, as portas podem não detectar obstruções adequadamente e continuar fechando com força o que possibilita ocasionar  lesões aos passageiros.",
        mitigation: "Instalar os dispositivos de acordo com a ABNT NBR 16858-1:2021, 5.3 6.2.2.1-c) e d)",
        normaID: "4.11",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 30,
    name: "Cabo De Comando",
    questions: [
    ]
  },
  {
    id: 31,
    name: "Tirantes",
    questions: [
    ]
  },
  {
    id: 32,
    name: "Guarda Corpo",
    questions: [
      {
        id: "1",
        verification: "Proteção contra queda (balaustrada) do teto da cabina",
        priority: "Alto",
        risk: "A ausência ou inadequação da balaustrada no teto da cabina aumenta o risco de queda do técnico durante a manutenção, comprometendo a proteção necessária para evitar acidentes.",
        mitigation: "a) reduzira distância livre para 0,30 m ou menos, entre a borda externa do teto da cabina e a parede adjacente e a divisória estendida por toda a altura da caixa, ou b)    instalar a balaustrada no teto da cabina de acordo com a ABNT NBR 16858-1 2021, 5.4.7.3, ou c)    instalar a balaustrada no teto da cabina de acordo com a EN 81-21:2018, 5.6",
        normaID: "5.5",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 33,
    name: "Protetor De Polia De Tracao",
    questions: [
      {
        id: "1",
        verification: "Proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade, polias tensoras e coroas dentadas",
        priority: "Médio",
        risk: "Risco de acidente, visto que as partes móveis, como polias motrizes, limitadores de velocidade, polias de desvio, polias tensoras e coroas dentadas, sem a devida proteção durante a manutenção podem expor os técnicos a lesões graves, como esmagamentos, cortes e fraturas.",
        mitigation: "a) instalar a proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade e polias tensoras de acordo com a ABNT NBR 16858-1 2021, 5.5.6, ou b) instalar a proteção contra as lesões causadas pelas coroas dentadas de forma análoga às polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "2",
        verification: "Proteção contra a salda dos cabos das polias motrizes e polias de desvio ou a saída das correntes das coroas dentadas",
        priority: "Médio",
        risk: "Risco deslocamento indesejado dos cabos ou correntes, levando à perda de controle do movimento do elevador e de acidente.",
        mitigation: "a) instalar a proteção contra a saída dos cabos das polias motrizes e polias de desvio de acordo com a ABNT NBR 16858-1:2021, 5 5.6, ou b) instalar a proteção contra a saída das correntes das coroas dentadas de forma análoga a saida dos cabos das polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.2",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "3",
        verification: "Proteção contra a introdução de objetos entre os cabos e polias ou entre as correntes e as coroas dentadas",
        priority: "Baixo",
        risk: "Risco de acidente, visto que as partes móveis, como polias motrizes, limitadores de velocidade, polias de desvio, polias tensoras e coroas dentadas, sem a devida proteção durante a manutenção podem expor os técnicos a lesões graves, como esmagamentos, cortes e fraturas.",
        mitigation: "a) instalar a proteção contra a introdução de objetos entre os cabos e polias de acordo com aABNT NBR 16858-1:2021, 5.5 6, ou b) instalar a proteção contra a introdução de objetos entre as correntes e as coroas dentadas de forma análoga à proteção contra a introdução de objetos entre os cabos e as polias. de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.3",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      }
    ]
  },
  {
    id: 34,
    name: "Protetor Do Regulador De Velocidade",
    questions: [
      {
        id: "1",
        verification: "Proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade, polias tensoras e coroas dentadas",
        priority: "Médio",
        risk: "Risco de acidente, visto que as partes móveis, como polias motrizes, limitadores de velocidade, polias de desvio, polias tensoras e coroas dentadas, sem a devida proteção durante a manutenção podem expor os técnicos a lesões graves, como esmagamentos, cortes e fraturas.",
        mitigation: "a) instalar a proteção contra as lesões causadas pelas polias motrizes, polias de desvio, limitadores de velocidade e polias tensoras de acordo com a ABNT NBR 16858-1 2021, 5.5.6, ou b) instalar a proteção contra as lesões causadas pelas coroas dentadas de forma análoga às polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.1",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "2",
        verification: "Proteção contra a saída dos cabos das polias motrizes e polias de desvio ou a saída das correntes das coroas dentadas",
        priority: "Médio",
        risk: "A inexistência ou inadequação dos meios de proteção contra a saída dos cabos de polias motrizes e de desvio, ou das correntes de coroas dentadas, expõe o técnico a riscos de acidentes graves, como enroscamento ou rompimento dos cabos, podendo causar lesões sérias ou fatais durante a manutenção.",
        mitigation: "a) instalar a proteção contra a saída dos cabos das polias motrizes e polias de desvio de acordo com a ABNT NBR 16858-1:2021, 5 5.6, ou b)    instalar a proteção contra a saída das correntes das coroas dentadas de forma análoga a saida dos cabos das polias motrizes e polias de desvio, de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.2",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "3",
        verification: "Proteção contra a introdução de objetos entre os cabos e polias ou entre as correntes e as coroas dentadas",
        priority: "Baixo",
        risk: "A inexistência ou inadequação dos meios de proteção contra a saída dos cabos de polias motrizes e de desvio, ou das correntes de coroas dentadas, expõe o técnico a riscos de acidentes graves, como enroscamento ou rompimento dos cabos, podendo causar lesões sérias ou fatais durante a manutenção.",
        mitigation: "a) instalar a proteção contra a introdução de objetos entre os cabos e polias de acordo com aABNT NBR 16858-1:2021, 5.5 6, ou b)    instalar a proteção contra a introdução de objetos entre as correntes e as coroas dentadas de forma análoga à proteção contra a introdução de objetos entre os cabos e as polias. de acordo com a ABNT NBR 16858-1:2021, 5.5.6",
        normaID: "6.3",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      }
    ]
  },
  {
    id: 35,
    name: "Escada Marinheiro",
    questions: [
      {
        id: "1",
        verification: "Meio de acesso ao poço",
        priority: "Alto",
        risk: "A inexistência ou inadequação do meio de acesso ao poço coloca o técnico em risco de queda ou acidentes durante a manutenção, dificultando a entrada e saída seguras do poço e expondo-o a situações perigosas, como o contato com partes móveis ou componentes elétricos.",
        mitigation: "Prover um meio de acesso ao poço de acordo com a ABNT NBR 16858-1:2021, 5.2.2.4",
        normaID: "2.13",
        limit: "Curto prazo"
      }
    ],
    "caixa_(botoeira)_de_inspecao": [
      {
        id: "1",
        verification: "Botoeira de inspeção e dispositivo de parada no topo do carro",
        priority: "Alto",
        risk: "A inconformidade ou inexistência da botoeira de inspeção e do dispositivo de parada no topo do carro impede a parada segura do elevador durante a manutenção, expondo o técnico a riscos de esmagamento, quedas ou movimentação inesperada da cabine.",
        mitigation: "a) prover uma botoeira de inspeção de acordo com a ABNT NBR 16858-1:2021, 5.4.8 a), e b) prover um dispositivo de parada de acordo com a ABNT NBR 16858-1:2021, 5.4.8 b)",
        normaID: "10.4",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 36,
    name: "Chave Pap",
    questions: [
      {
        id: "1",
        verification: "Dispositivo de parada no poço",
        priority: "Alto",
        risk: "A falta o inconformidade de dispositivo de parada (botão stop) no poço impede a parada imediata do elevador em situações de emergência, colocando o técnico em risco de acidentes graves, como quedas, esmagamento ou contato com partes móveis durante a manutenção.",
        mitigation: "Instalar um ou mais dispositivos de parada no poço de acordo com a ABNT NBR 16858-1:2021, 5.2.1 5.1-a)",
        normaID: "2.15",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 37,
    name: "Iluminacao Do Passadico",
    questions: [
      {
        id: "1",
        verification: "Iluminação da caixa",
        priority: "Alto",
        risk: "A inexistência ou inadequação da iluminação na caixa expõe o usuário a riscos de quedas ou lesões ao entrar ou sair do elevador, dificultando a visualização de possíveis obstáculos ou sinais de aviso em condições de pouca luz.",
        mitigation: "Prover a iluminação na caixa de acordo com aABNT NBR 16858-1:2021, 5.2.1.4.1",
        normaID: "2.14",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 38,
    name: "Espaco Da Maquinaria",
    questions: [
      {
        id: "1",
        verification: "Acesso aos espaços da maquinaria e à casa de polias",
        priority: "Alto",
        risk: "A inexistência ou insegurança dos meios de acesso para os espaços da maquinaria e a casa de polias coloca o técnico em risco de quedas, acidentes com partes móveis ou dificuldades em realizar a manutenção de forma segura, comprometendo a integridade física durante o trabalho.",
        mitigation: "Instalar um meio de acesso seguro de acordo com a ABNT NBR 16858-12021, 5.22.5",
        normaID: "3.1",
        limit: "Curto prazo"
      },
      {
        id: "2",
        verification: "Iluminação nos espaços da maquinaria e na casa de polias",
        priority: "Alto",
        risk: "A iluminação inadequada nos espaços da maquinaria e na casa de polias coloca o técnico em risco de quedas, lesões e erros durante a manutenção, dificultando a identificação de componentes e possíveis falhas, além de aumentar a probabilidade de acidentes devido à visibilidade limitada.",
        mitigation: "Provera iluminação elétrica de acordo com a ABNT NBR 16858-12021, 5.2.1.4.2",
        normaID: "3.2",
        limit: "Curto prazo"
      },
      {
        id: "3",
        verification: "Dispositivo de parada na casa de polias",
        priority: "Alto",
        risk: "A inexistência ou inadequação dos dispositivos de parada (botões stop) na casa de polias impede a interrupção rápida do sistema em caso de emergência, expondo o técnico a riscos de esmagamento, choque elétrico ou lesões causadas pela movimentação inesperada das polias.",
        mitigation: "Instalar um dispositivo de parada de acordo com a ABNT NBR 16858-12021, 5 2.1.5 2-c)",
        normaID: "3.3",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Ponto(s) de suspensão para permitir o içamento de equipamentos pesados nos espaços da maquinaria e, onde necessário",
        priority: "Médio",
        risk: "A irregularidade ou aunsência dos pontos de suspensão para o manuseio dos equipamentos nos espaços da maquinaria e na última altura coloca o técnico em risco de acidentes, como quedas ou lesões, devido à falta de apoio seguro para levantamento ou movimentação dos equipamentos durante a manutenção/Instalação.",
        mitigation: "a) comprovar e indicar a carga segura de trabalho emquilogramas (kg), ou b) prover o ponto(s) de suspensão convenientemente posicionado(s) com a indicação da carga segura de trabalho em quilogramas (kg) de acordo com a ABNT NBR 16058-1:2021, 5.21.7",
        normaID: "3.4",
        limit: "Curto prazo"
      },
      {
        id: "5",
        verification: "Piso antiderrapante nas casas de máquinas e nas casas de polias",
        priority: "Baixo",
        risk: "O piso escorregadio nos espaços da maquinaria ou na casa de polias aumenta o risco de quedas e lesões graves para o técnico, comprometendo a segurança durante a manutenção ao dificultar o deslocamento seguro e estável nesses ambientes.",
        mitigation: "Instalar um piso antiderrapante de acordo com a ABNT NBR 16858-1:2021, 5.21.9",
        normaID: "3.5",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      },
      {
        id: "6",
        verification: "Espaços livres horizontais ou verticais para trabalho seguro nos equipamentos dos espaços da maquinaria",
        priority: "Médio",
        risk: "A insuficiência de espaços livres horizontais ou verticais nos espaços da maquinaria compromete a segurança do técnico, dificultando a execução de tarefas de manutenção e aumentando o risco de lesões devido à falta de mobilidade e acesso adequado aos equipamentos.",
        mitigation: "a) prover os espaços horizontais e verticais de acordo com a ABNT NBR 16858-1 2021, 52.6.3.2.1-a) e b), 5.2.6.3.2 2, 5.2.6 3.2.3, 5.2.64 2.1-a) e b), 5.2 6.4.2 2, ou b) quando nâo houver espaços horizontais ou verticais suficientes, devem ser providas as proteções contra as partes móveis dos equipamentos de acordo com a ABNT NBR ISO 13857:2021, 4.2, 4.1",
        normaID: "3.6",
        limit: "Médio prazo ou em conjunto com uma ampla modernização"
      },
      {
        id: "7",
        verification: "Desníveis, rebaixos e dutos na casa de máquinas",
        priority: "Alto",
        risk: "A inexistência ou inadequação da proteção para diferentes níveis e recessos na casa de máquinas expõe o técnico a riscos de quedas ou acidentes ao transitar por áreas com desníveis, aumentando a probabilidade de lesões graves durante a manutenção.",
        mitigation: "Instalar os dispositivos de acordo com a ABNT NBR 16858-12021,5.26.3.2.4, 52.6.3.2.5",
        normaID: "3.7",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 39,
    name: "Poco",
    questions: [
      {
        id: "1",
        verification: "Botoeira de inspeção no poço",
        priority: "Baixo",
        risk: "A falta ou mal funcionamento da botoeira de inspeção no poço impede o controle seguro da movimentação do elevador durante a manutenção, expondo o técnico a riscos de esmagamento ou lesões devido à falta de parada rápida em caso de emergência.",
        mitigation: "Prover uma botoeira de inspeção no poço de acordo com a ABNT NBR 16858-1:2021, 5.2.1.5 1-b)",
        normaID: "10.5",
        limit: "Longo prazo ou em conjunto com uma modernização do componente relacionado"
      },
      {
        id: "2",
        verification: "Espaços de refúgio e folgas no poço",
        priority: "Alto",
        risk: "Espaços de refúgio e folgas insuficientes no poço do elevador comprometem a segurança do técnico, dificultando o manuseio seguro de ferramentas e equipamentos, aumentando o risco de acidentes em situações de emergência ou durante a manutenção.",
        mitigation: "a) prover os espaços de refúgio e folgas no poço de acordo com a ABNT NBR 16858-1:2021, 5.25.8, ou b) instalar os dispositivos que produzam os espaços de refúgio e folgas no poço de acordo com a EN 81-21:2018, 5.7",
        normaID: "2.12",
        limit: "Curto prazo"
      },
      {
        id: "3",
        verification: "Painel de proteção para evitar acesso ao espaço abaixo do contrapeso ou do peso de balanceamento",
        priority: "Baixo",
        risk: "A ausência ou inadequação da proteção na área de deslocamento do contrapeso/peso de balanceamento no poço de elevador representa risco de contato acidental com o sistema em movimento, podendo causar ferimentos graves, comprometendo a segurança dos profissionais de manutenção.",
        mitigation: "Prover um dispositivo de travamento de acordo com a ABNT NBR 16858-1:2021, 5.2.3.3 b) e c)",
        normaID: "2.8",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "Divisória no poço para evitar acesso ao poço do elevador adjacente, quando existir mais de um elevador em uma caixa comum",
        priority: "Alto",
        risk: "A inexistência ou inadequação da divisória no poço do elevador em uma caixa comum aumenta o risco de queda ou contato acidental com componentes mecânicos, comprometendo a segurança dos profissionais de manutenção.",
        mitigation: "Instalar uma divisória no poço de acordo com a ABNT NBR 16858-1:2021, 5.2.5.5 2",
        normaID: "2.9",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 40,
    name: "Caixa",
    questions: [
      {
        id: "1",
        verification: "Divisória entre as partes móveis dos elevadores localizados em uma caixa comum",
        priority: "Alto",
        risk: "A inexistência ou inadequação da divisória no poço do elevador em uma caixa comum aumenta o risco de queda ou contato acidental com componentes mecânicos, comprometendo a segurança dos profissionais de manutenção.",
        mitigation: "Instalar uma divisória estendida por toda a altura da caixa de acordo com a ABNT NBR 16858-1:2021, 5.2 5.5.2",
        normaID: "2.10",
        limit: "Curto prazo"
      },
      {
        id: "2",
        verification: "Espaços de refúgio no teto da cabina e folgas na última altura",
        priority: "Alto",
        risk: "A falta de espaços de refúgio adequados no teto da cabina e folgas insuficientes na última altura podem impedir uma evacuação segura em caso de emergência, aumentando o risco de lesões.",
        mitigation: "a) prover os espaços de refúgio e folgas na última altura de acordo com a ABNT NBR 16858-1:2021, 5.2 5.7, ou b) instalar os dispositivos que produzam os espaços de refúgio e folgas na última altura de acordo com a EN 81-21:2018, 5.5",
        normaID: "2.11",
        limit: "Curto prazo"
      },
      {
        id: "3",
        verification: "Distância horizontal entre a superfície interna da caixa e a soleira da cabina, armação da entrada da cabina ou a porta da cabina (ou a extremidade da entrada das portas tipo corrediça horizontal) por toda a altura da caixa",
        priority: "Alto",
        risk: "A distância horizontal excessiva entre a superfície interna da caixa e a soleira ou portas da cabina pode causar risco de queda ou tropeço dos usuários ao entrar ou sair do elevador, comprometendo a segurança e o conforto.",
        mitigation: "a) instalar os meios de reduzir a distância conforme descrito na ABNT NBR 16858-12021, 5.2.5 3.1 ou, b) Instalar os dispositivos de travamento da porta da cabina conforme descrito na ABNT NBR 16858-12021, 5.3.92",
        normaID: "2.17",
        limit: "Curto prazo"
      },
      {
        id: "4",
        verification: "A cabina deve parar quando a porta de acesso, de emergência e de inspeção da caixa ou do poço for aberta",
        priority: "Alto",
        risk: "O carro não parar quando as portas de acesso, emergência ou inspeção são abertas representa um risco grave tanto para usuários quanto para técnicos, pois pode causar lesões devido à movimentação inesperada do elevador durante operações de entrada ou manutenção.",
        mitigation: "Instalar um dispositivo de segurança de acordo com a ABNT NBR 16858-1:2021, 5.2.3.3-d)",
        normaID: "2.2",
        limit: "Curto prazo"
      },
      {
        id: "5",
        verification: "Fechamento da caixa não perfurado",
        priority: "Alto",
        risk: "Caixas abertas ou perfurados expõem a riscos de cortes, esmagamento ou fatalidades se atingidos por uma cabina em movimento.",
        mitigation: "Efetue o fechamento completo da caixa, mantendo apenas as aberturas que são permitidas pelas normas, garantindo assim que nada possa adentrar no interior dela.",
        normaID: "2.3",
        limit: "Curto prazo"
      },
      {
        id: "6",
        verification: "Onde o fechamento da caixa for perfurado, o acesso ao dispositivo de travamento da porta nâo pode ser possível para pessoas nâo autorizadas, para evitar o mau uso (por exemplo, acessar através da abertura do fechamento perfurado)",
        priority: "Alto",
        risk: "O fechamento da caixa com paredes perfuradas ao redor do dispositivo de travamento da porta expõe usuários  ao risco de contato acidental ou indevido com partes móveis ou componentes eletromecânicos, aumentando a possibilidade de ferimentos.",
        mitigation: "a) instalar o fechamento não perfurado na caixa, ou b) instalar a proteção em torno do dispositivo de travamento da porta para evitar qualquer manipulação com o uso de uma haste de 0.30 m de comprimento. NBR 16858-7",
        normaID: "2.4",
        limit: "Curto prazo"
      },
      {
        id: "7",
        verification: "Altura e acabamento da superfície vertical abaixo das soleiras da porta de pavimento",
        priority: "Alto",
        risk: "A superfície vertical inadequada abaixo das soleiras das portas de pavimento pode não ter resistência suficiente para suportar impactos ou cargas durante o uso, resultando em danos, oferecendo risco de falha ou acidentes aos usuários.",
        mitigation: "Abaixo da soleira da porta de pavimento deve atender a ABNT NBR 16858-1:2021, 5 2.5.3.2",
        normaID: "2.6",
        limit: "Curto prazo"
      }
    ]
  },
  {
    id: 41,
    name: "Fecho Eletromagnético",
    questions: [
      {
        id: "1",
        verification: "Dispositivos de travamento da porta de pavimento",
        priority: "Alto",
        risk: "A ausência de um dispositivo de travamento seguro na porta de pavimento pode resultar na abertura involuntária da porta, expondo os usuários a riscos de acidentes.",
        mitigation: "Substituir todos os dispositivos de travamento da porta de pavimento segundo a ABNT NBR 16858-1:2021, 5.3.9.1",
        normaID: "4.14",
        limit: "Curto prazo"
      },
    ]
  }
];