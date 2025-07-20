import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { ForensicModel } from '~/types/forensicTypes';

export function useForensicList() {
    const [forensics, setForensics] = useState<ForensicModel[]>([]);
    const [loadingForensics, setLoadingForensics] = useState(false);

    const fetchForensics = async (email: string) => {
        if (!email) return;

        setLoadingForensics(true);
        try {
            const q = query(collection(db, 'forensic'), where('usuario', '==', email));
            const snapshot = await getDocs(q);

            const data: ForensicModel[] = snapshot.docs
                .map((doc) => {
                    const raw = doc.data();
                    if (!raw || !raw.usuario || !raw.dadosIniciais) return null;

                    return {
                        id: doc.id,
                        ...raw,
                    } as ForensicModel;
                })
                .filter(Boolean) as ForensicModel[];


            setForensics(data);
        } catch (error) {
            console.error('Erro ao buscar análises forenses:', error);
            setForensics([]);
        }
        setLoadingForensics(false);
    };

    return {
        forensics,
        loadingForensics,
        fetchForensics,
    };
}