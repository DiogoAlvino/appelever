import { db } from '~/utils/firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { InspectionModel } from '~/models/inspectionModel';
import { questions } from '~/data/questions';
import { InspectionAnswerModel } from '~/models/inspectionAnswerModel';
import { UploadWithMeta } from '~/models/uploadModel';

export async function saveInspection(
  equipmentId: string,
  respostasUsuario: { [id: string]: 'sim' | 'nao' | 'na' | null },
  usuario: string,
  imagens: { [questionId: string]: UploadWithMeta[] }
) {
  const answers: { [id: string]: InspectionAnswerModel } = {};

  questions.forEach((section) => {
    section.questions.forEach((q) => {
      const id = `${section.id}.${q.id}`;
      const resposta = respostasUsuario[id];

      if (resposta) {
        answers[id] = {
          answer: resposta,
          priority: q.priority as 'alto' | 'medio' | 'médio' | 'baixo',
          risk: q.risk,
          mitigation: q.mitigation,
          verification: q.verification,
          normaID: q.normaID,
          limit: q.limit,
          uploads: imagens[id] || [],
        };
      }
    });
  });

  const novaInspecao: Omit<InspectionModel, 'id'> = {
    equipmentId,
    dataCriacao: new Date(),
    dataAtualizacao: new Date(),
    usuario,
    answers,
  };

  await addDoc(collection(db, 'inspections'), novaInspecao);
}

export async function fetchInspectionById(inspectionId: string): Promise<InspectionModel | null> {
  try {
    const docRef = doc(db, 'inspections', inspectionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...(docSnap.data() as InspectionModel) };
    } else {
      console.warn('Inspeção não encontrada');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar inspeção por ID:', error);
    throw error;
  }
}