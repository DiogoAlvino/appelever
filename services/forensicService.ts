import {
  collection,
  addDoc,
  setDoc,
  doc,
  where,
  query,
  getDocs,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { ForensicModel } from '~/models/forensicModel';

export async function saveForensicModular(data: ForensicModel) {
  try {
    let forensicId = data.id;

    if (forensicId) {
      await setDoc(doc(db, 'forensic', forensicId), {
        id: forensicId,
        usuario: data.usuario,
        dadosIniciais: data.dadosIniciais,
        equipePericial: data.equipePericial,
        dataCriacao: data.dataCriacao,
      });
    } else {
      const docRef = await addDoc(collection(db, 'forensic'), {
        usuario: data.usuario,
        dadosIniciais: data.dadosIniciais,
        equipePericial: data.equipePericial,
        dataCriacao: data.dataCriacao,
      });
      forensicId = docRef.id;

      await setDoc(docRef, {
        id: forensicId,
        usuario: data.usuario,
        dadosIniciais: data.dadosIniciais,
        equipePericial: data.equipePericial,
        dataCriacao: data.dataCriacao,
      });
    }

    // Materiais
    await setDoc(doc(db, 'forensic_materials', forensicId), data.materiais);

    // Análise
    await setDoc(doc(db, 'forensic_analysis', forensicId), {
      reconhecimentoArea: data.analisePreliminar.reconhecimentoArea,
      condicoesAmbientais: data.analisePreliminar.condicoesAmbientais,
      caracteristicasLocal: data.analisePreliminar.caracteristicasLocal,
      informacoes: data.analisePreliminar.informacoes,
      arquivosReconhecimentoArea: data.analisePreliminar.arquivosReconhecimentoArea,
      localizacao: data.analisePreliminar.localizacao ?? null, // ou undefined, se preferir
    });

    // Riscos
    await setDoc(doc(db, 'forensic_risk', forensicId), {
      aprs: data.risco.aprs || [],
    });

    // Exames
    await setDoc(doc(db, 'forensic_exams', forensicId), {
      documentacao: data.exames.documentacao,
      observacoesDocumentacao: data.exames.observacoesDocumentacao,

      equipamentosExame: {
        maquinaTracao: data.exames.equipamentosExame.maquinaTracao,
        limitadorVelocidade: data.exames.equipamentosExame.limitadorVelocidade,
        cabos: data.exames.equipamentosExame.cabos,
        contrapeso: data.exames.equipamentosExame.contrapeso,
        cabine: data.exames.equipamentosExame.cabine,
        portas: data.exames.equipamentosExame.portas,
        freiosEmergencia: data.exames.equipamentosExame.freiosEmergencia,
        sistemaControle: data.exames.equipamentosExame.sistemaControle,
        sistemaEletrico: data.exames.equipamentosExame.sistemaEletrico,
        sensores: data.exames.equipamentosExame.sensores,
        pocoElevador: data.exames.equipamentosExame.pocoElevador,

        dataHoraMaquinaTracao: formatarTimestamp(data.exames.equipamentosExame.dataHoraMaquinaTracao),
        dataHoraLimitador: formatarTimestamp(data.exames.equipamentosExame.dataHoraLimitador),
        dataHoraCabos: formatarTimestamp(data.exames.equipamentosExame.dataHoraCabos),
        dataHoraContrapeso: formatarTimestamp(data.exames.equipamentosExame.dataHoraContrapeso),
        dataHoraCabine: formatarTimestamp(data.exames.equipamentosExame.dataHoraCabine),
        dataHoraPortas: formatarTimestamp(data.exames.equipamentosExame.dataHoraPortas),
        dataHoraFreios: formatarTimestamp(data.exames.equipamentosExame.dataHoraFreios),
        dataHoraSistemaControle: formatarTimestamp(data.exames.equipamentosExame.dataHoraSistemaControle),
        dataHoraSistemaEletrico: formatarTimestamp(data.exames.equipamentosExame.dataHoraSistemaEletrico),
        dataHoraSensores: formatarTimestamp(data.exames.equipamentosExame.dataHoraSensores),
        dataHoraPocoElevador: formatarTimestamp(data.exames.equipamentosExame.dataHoraPocoElevador),
      },

      depoimentos: data.exames.depoimentos,
      perinecroscopia: data.exames.perinecroscopia,
    });

    // Vestígios — para edição, idealmente deveríamos limpar os antigos primeiro
    const vestigiosTotais = [
      ...(data.exames.vestigiosDocumentacao || []),
      ...(data.exames.vestigiosEquipamentos || []),
      ...(data.exames.vestigiosEntrevistas || []),
      ...(data.exames.vestigiosPerinecroscopia || []),
    ];

    // (Opcional) Deletar vestígios antigos antes de adicionar os novos
    if (data.id) {
      const vestigiosRef = collection(db, 'forensic_vestigios');
      const q = query(vestigiosRef, where('forensicId', '==', forensicId));
      const snapshot = await getDocs(q);
      const deletes = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletes);
    }

    // Adiciona os vestígios novos
    const vestigioPromises = vestigiosTotais.map((vestigio) => {
      let dataHoraFormatada: Timestamp | null = null;

      if (vestigio.dataHora instanceof Date) {
        dataHoraFormatada = Timestamp.fromDate(vestigio.dataHora);
      } else if (typeof vestigio.dataHora === 'string') {
        const parsed = new Date(vestigio.dataHora);
        if (!isNaN(parsed.getTime())) dataHoraFormatada = Timestamp.fromDate(parsed);
      } else if (
        vestigio.dataHora &&
        typeof vestigio.dataHora === 'object' &&
        'seconds' in (vestigio.dataHora as any)
      ) {
        const seconds = (vestigio.dataHora as any).seconds;
        dataHoraFormatada = Timestamp.fromMillis(seconds * 1000);
      }

      return addDoc(collection(db, 'forensic_vestigios'), {
        forensicId,
        ...vestigio,
        dataHora: dataHoraFormatada,
      });
    });
    await Promise.all(vestigioPromises);

    return forensicId;
  } catch (error) {
    console.error('Erro ao salvar perícia modular:', error);
    throw error;
  }
}

export async function deleteForensicById(forensicId: string) {
  try {
    const collectionsWithDocId = [
      'forensic',
      'forensic_materials',
      'forensic_analysis',
      'forensic_risk',
      'forensic_exams',
    ];

    await Promise.all(
      collectionsWithDocId.map((col) => deleteDoc(doc(db, col, forensicId)))
    );

    const vestigiosRef = collection(db, 'forensic_vestigios');
    const q = query(vestigiosRef, where('forensicId', '==', forensicId));
    const snapshot = await getDocs(q);

    const deleteVestigios = snapshot.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)
    );
    await Promise.all(deleteVestigios);

    console.log(`Análise forense ${forensicId} excluída com sucesso.`);
  } catch (error) {
    console.error('Erro ao excluir análise forense:', error);
    throw error;
  }
}

function formatarTimestamp(data: any): Timestamp | null {
  if (data instanceof Date) {
    return Timestamp.fromDate(data);
  } else if (typeof data === 'string') {
    const parsed = new Date(data);
    return !isNaN(parsed.getTime()) ? Timestamp.fromDate(parsed) : null;
  } else if (data && typeof data === 'object' && 'seconds' in data) {
    const seconds = (data as any).seconds;
    return Timestamp.fromMillis(seconds * 1000);
  }
  return null;
}

