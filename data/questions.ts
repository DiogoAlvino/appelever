export const questions = [
    {
        id: '10.1',
        description: 'Proteção contra falha à terra em um circuito...',
        prioridade: 'alta',
    },
    {
        id: '10.2',
        description: 'Proteção contra inversão de fase no circuito...',
        prioridade: 'baixa',
    },
];

export const equipment = [
    {
      id: "id equipamento 1",
      name: "Elevador TESTE",
      address: "Av. Central, 123",
      building: "Bloco A",
      technician: {
        name: "Carlos Souza",
        role: "Engenheiro Eletricista",
        phone: "(11) 99999-0001",
        email: "carlos@empresa.com",
      },
      installationDate: "2023-01-15",
      manufacturer: "Otis",
      cnpj: "12.345.678/0001-90",
      model: "X200",
      capacity: "800kg",
      occupancy: "10 pessoas",
      speed: "1.5 m/s",
      usageType: "Residencial",
      stops: 5,
      machineRoom: "Existente",
      maintenanceCompany: {
        name: "Manutenc Elevadores LTDA",
        cnpj: "98.765.432/0001-12",
      },
      files: ["manual.pdf", "certificado.pdf"],
      inspections: [
        { id: "01", date: "2025-02-01", name: "Inspeção anual" },
        { id: "02", date: "2025-05-13", name: "Revisão elétrica" },
      ],
    },
    {
      id: "id equipamento 2",
      name: "Elevador TESTE DOIS",
      address: "Av. Central, 123",
      building: "Bloco A",
      technician: {
        name: "WEMELLY SANTOS",
        role: "Engenheiro Eletricista",
        phone: "(11) 99999-0001",
        email: "carlos@empresa.com",
      },
      installationDate: "2023-01-15",
      manufacturer: "Otis",
      cnpj: "12.345.678/0001-90",
      model: "X200",
      capacity: "800kg",
      occupancy: "10 pessoas",
      speed: "1.5 m/s",
      usageType: "Residencial",
      stops: 5,
      machineRoom: "Existente",
      maintenanceCompany: {
        name: "Manutenc Elevadores LTDA",
        cnpj: "98.765.432/0001-12",
      },
      files: ["manual.pdf", "certificado.pdf"],
      inspections: [
        { id: "01", date: "2025-02-01", name: "Inspeção anual" },
        { id: "02", date: "2025-05-13", name: "Revisão elétrica" },
      ],
    },
  ];
  

export const inspections = [
    {
        id: "01",
        date: "2025-02-01",
        name: "chave de fenda"
    },
    {
        id: "02",
        date: "2025-05-13",
        name: "chave de roda"
    }
]