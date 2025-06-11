export interface InspectionAnswerModel {
    answer: 'sim' | 'nao' | 'na';
    priority: 'alto' | 'medio' | 'médio' | 'baixo';
    risk: string;
    mitigation: string;
    verification: string;
}