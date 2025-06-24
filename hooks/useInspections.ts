import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/utils/firebase';

export function useInspections() {
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInspections = async (email: string) => {
    if (!email) return;

    setLoading(true);
    try {
      const q = query(collection(db, 'inspections'), where('usuario', '==', email));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInspections(data);
    } catch (error) {
      console.error('Erro ao buscar inspeções:', error);
      setInspections([]);
    }
    setLoading(false);
  };

  return { inspections, loading, fetchInspections };
}