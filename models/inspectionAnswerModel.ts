import { UploadWithMeta } from './uploadModel';


export interface InspectionAnswerModel {
  answer: 'sim' | 'nao' | 'na';
  priority: 'alto' | 'medio' | 'médio' | 'baixo';
  risk: string;
  mitigation: string;
  verification: string;
  normaID?: string;
  limit?: string;
  uploads?: UploadWithMeta[];
}
