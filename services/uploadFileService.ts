import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { UploadModel } from '~/models/uploadModel';

export const uploadFileToStorage = async (file: File | Blob, fileName: string, equipmentId: string): Promise<UploadModel> => {
  const storage = getStorage();
  const uniqueName = `${uuid()}_${fileName}`;
  const storagePath = `equipments/${equipmentId}/${uniqueName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return {
    nome: fileName,
    url,
    path: storagePath,
    uploadedAt: new Date(),
  };
};
