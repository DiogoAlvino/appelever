import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { InspectionModel } from '~/models/inspectionModel';

interface UseInspectionByIdResult {
  inspection: InspectionModel | null;
  loading: boolean;
}

export function useInspectionById(inspectionId: string): UseInspectionByIdResult {
  const [inspection, setInspection] = useState<InspectionModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        const docRef = doc(db, 'inspections', inspectionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setInspection({
            id: docSnap.id,
            ...data,
            dataCriacao: data.dataCriacao?.toDate?.() || new Date(),
            dataAtualizacao: data.dataAtualizacao?.toDate?.() || new Date(),
          } as InspectionModel);
        } else {
          setInspection(null);
        }
      } catch (error) {
        console.error('Erro ao buscar inspeção:', error);
        setInspection(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInspection();
  }, [inspectionId]);

  return { inspection, loading };
}
