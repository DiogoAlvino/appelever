import { db } from '~/utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { InspectionModel } from '~/models/inspectionModel';
import { questions } from '~/data/questions';
import { InspectionAnswerModel } from '~/models/inspectionAnswerModel';
import { UploadModel } from '~/models/uploadModel';

export async function saveInspection(
  equipmentId: string,
  respostasUsuario: { [id: string]: 'sim' | 'nao' | 'na' | null },
  usuario: string,
  imagens: { [questionId: string]: UploadModel[] }
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
