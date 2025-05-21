export interface EquipmentDetailsModel {
    dataInstalacao: Date;
    identificacaoEquipamento: string;
    fabricante: string;
    cnpj: string;
    modelo: string;
    capacidadeNominal: number;
    tipoDeUso: string;
    numeroDeParadas: number;
    casaDeMaquinas: boolean;
}
