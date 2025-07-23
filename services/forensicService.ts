import {
  collection,
  addDoc,
  setDoc,
  doc,
  where,
  query,
  getDocs,
  deleteDoc,
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
    });

    // Riscos
    await setDoc(doc(db, 'forensic_risk', forensicId), {
      riscoAPR: data.risco.riscoAPR,
      peritoAuxiliar: data.risco.peritoAuxiliar,
      tecnico: data.risco.tecnico,
      outros: data.risco.outros,
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
    const vestigioPromises = vestigiosTotais.map((vestigio) =>
      addDoc(collection(db, 'forensic_vestigios'), {
        forensicId,
        ...vestigio,
      })
    );
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
