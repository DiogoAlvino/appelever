import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '~/utils/firebase';
import { EquipmentModel } from '~/models/equipmentModel';

export async function saveEquipment(data: EquipmentModel) {
  return await addDoc(collection(db, 'equipamentos'), {
    ...data,
    usuario: auth.currentUser?.email || 'Usuário não identificado',
    dataCriacao: new Date(),
  });
}