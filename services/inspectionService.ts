import { db } from '~/utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { InspectionModel } from '~/models/inspectionModel';
import { questions } from '~/data/questions';
import { InspectionAnswerModel } from '~/models/inspectionAnswerModel';

export async function saveInspection(
  equipmentId: string,
  respostasUsuario: { [id: string]: 'sim' | 'nao' | 'na' | null },
  usuario: string
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
