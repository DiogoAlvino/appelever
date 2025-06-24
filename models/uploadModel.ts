export interface UploadModel {
  arquivo: string | number | (string | number)[] | null | undefined;
  nome: string;
  url: string;
  path: string;
  uploadedAt: Date;
}