import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { InspectionModel } from '~/models/inspectionModel';

export function useInspections() {
  const [inspections, setInspections] = useState<InspectionModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInspections = async (email: string) => {
    if (!email) return;

    setLoading(true);
    try {
      const q = query(collection(db, 'inspections'), where('usuario', '==', email));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => {
        const raw = doc.data();
        return {
          id: doc.id,
          ...raw,
          dataCriacao: raw.dataCriacao?.toDate?.() || new Date(),
          dataAtualizacao: raw.dataAtualizacao?.toDate?.() || new Date(),
        } as InspectionModel;
      });

      setInspections(data);
    } catch (error) {
      console.error('Erro ao buscar inspeções:', error);
      setInspections([]);
    }
    setLoading(false);
  };

  return { inspections, loading, fetchInspections };
}
