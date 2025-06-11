import { InspectionAnswerModel } from "./inspectionAnswerModel";

export interface InspectionModel {
    id?: string;
    equipmentId: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
    usuario: string;
    answers: {
        [perguntaId: string]: InspectionAnswerModel;
    };
}