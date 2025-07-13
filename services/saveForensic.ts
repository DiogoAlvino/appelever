import { db } from '~/utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ForensicModel } from '~/models/forensicModel';

export const saveForensic = async (dados: ForensicModel) => {
  try {
    const docRef = await addDoc(collection(db, 'forensic'), dados);
    console.log('Documento criado com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar dados forenses:', error);
    throw error;
  }
};
