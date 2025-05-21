export interface EquipmentModel {
    id?: string; 
    dataCriacao: Date;
    usuario: string;
    responsavel: {
        nome: string;
        funcao: string;
        telefone: string;
        email: string;
    };
    local: {
        edificacao: string;
        cep: string;
        cidade: string;
        estado: string;
        logradouro: string;
        numero: string;
        complemento: string;
    };
    detalhes_equipamento: {
        dataInstalacao: Date;
        identificacaoEquipamento: string;
        fabricante: string;
        cnpj: string;
        modelo: string;
        capacidadeNominal: number;
        tipoDeUso: string;
        numeroDeParadas: number;
        casaDeMaquinas: boolean;
    };
    empresa_conservadora: {
        razaoSocial: string;
        cnpj: string;
    };
    uploads: Array<{
        nome: string;
        arquivo: string;
    }>;
}
