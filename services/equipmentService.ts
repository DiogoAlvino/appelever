import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, auth } from '~/utils/firebase';
import { EquipmentModel } from '~/models/equipmentModel';

export async function saveEquipment(data: EquipmentModel) {
  return await addDoc(collection(db, 'equipamentos'), {
    ...data,
    usuario: auth.currentUser?.email || 'Usuário não identificado',
    dataCriacao: new Date(),
  });
}

export async function fetchEquipments() {
  const userEmail = auth.currentUser?.email;
  if (!userEmail) return [];

  const q = query(
    collection(db, 'equipamentos'),
    where('usuario', '==', userEmail)
  );

  const snapshot = await getDocs(q);
  const equipments: EquipmentModel[] = [];

  snapshot.forEach((doc) => {
    equipments.push({
      id: doc.id,
      ...(doc.data() as EquipmentModel),
    });
  });

  return equipments;
}

export async function fetchEquipmentById(id: string) {
  const docRef = doc(db, 'equipamentos', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...(docSnap.data() as EquipmentModel),
    };
  } else {
    throw new Error('Equipamento não encontrado');
  }
}

export const updateEquipment = async (id: string, data: any) => {
  await updateDoc(doc(db, 'equipamentos', id), data);
};