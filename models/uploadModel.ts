export interface UploadModel {
  nome: string;
  arquivo: string;
}

export type UploadWithMeta = UploadModel & {
  uri: string;
  size: number;
  id: string;
};