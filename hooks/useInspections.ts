import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebase';

export function useInspections() {
    const [inspections, setInspections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInspections = async () => {
        setLoading(true);
        const snapshot = await getDocs(collection(db, 'inspections'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInspections(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchInspections();
    }, []);

    return { inspections, loading, reload: fetchInspections };
}
