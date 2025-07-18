import {
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { ForensicModel } from '~/models/forensicModel';

export async function saveForensicModular(data: ForensicModel) {
  try {
    const docRef = await addDoc(collection(db, 'forensic'), {
      dadosIniciais: data.dadosIniciais,
      equipePericial: data.equipePericial,
    });

    const forensicId = docRef.id;

    await setDoc(doc(db, 'forensic_materials', forensicId), data.materiais);

    await setDoc(doc(db, 'forensic_analysis', forensicId), {
      reconhecimentoArea: data.analisePreliminar.reconhecimentoArea,
      condicoesAmbientais: data.analisePreliminar.condicoesAmbientais,
      caracteristicasLocal: data.analisePreliminar.caracteristicasLocal,
      informacoes: data.analisePreliminar.informacoes,
      arquivosReconhecimentoArea: data.analisePreliminar.arquivosReconhecimentoArea,
    });

    await setDoc(doc(db, 'forensic_risk', forensicId), {
      riscoAPR: data.risco.riscoAPR,
      peritoAuxiliar: data.risco.peritoAuxiliar,
      tecnico: data.risco.tecnico,
      outros: data.risco.outros,
    });

    await setDoc(doc(db, 'forensic_exams', forensicId), {
      documentacao: data.exames.documentacao,
      observacoesDocumentacao: data.exames.observacoesDocumentacao,

      maquinaTracao: data.exames.maquinaTracao,
      limitadorVelocidade: data.exames.limitadorVelocidade,
      cabos: data.exames.cabos,
      contrapeso: data.exames.contrapeso,
      cabine: data.exames.cabine,
      portas: data.exames.portas,
      freiosEmergencia: data.exames.freiosEmergencia,
      sistemaControle: data.exames.sistemaControle,
      sistemaEletrico: data.exames.sistemaEletrico,
      sensores: data.exames.sensores,
      pocoElevador: data.exames.pocoElevador,

      depoimentos: data.exames.depoimentos,

      cadaverSexo: data.exames.cadaverSexo,
      cadaverCorPele: data.exames.cadaverCorPele,
      cadaverCabelo: data.exames.cadaverCabelo,
      cadaverSinaisIdentificadores: data.exames.cadaverSinaisIdentificadores,
      cadaverDescricaoVestes: data.exames.cadaverDescricaoVestes,
      cadaverOutro: data.exames.cadaverOutro,
      analiseDisposicaoCadaver: data.exames.analiseDisposicaoCadaver,
      arquivosDisposicaoCadaver: data.exames.arquivosDisposicaoCadaver,
      sinaisTanatologicos: data.exames.sinaisTanatologicos,
      arquivosTanatologicos: data.exames.arquivosTanatologicos,
      descricaoLesoesCadaver: data.exames.descricaoLesoesCadaver,
      arquivosLesoesCadaver: data.exames.arquivosLesoesCadaver,
    });

    // 6. Salvar vestígios
    const vestigiosTotais = [
      ...(data.exames.vestigiosDocumentacao || []),
      ...(data.exames.vestigiosEquipamentos || []),
      ...(data.exames.vestigiosEntrevistas || []),
      ...(data.exames.vestigiosPerinecroscopia || []),
    ];

    const vestigioPromises = vestigiosTotais.map((vestigio) => {
      return addDoc(collection(db, 'forensic_vestigios'), {
        forensicId,
        ...vestigio,
      });
    });

    await Promise.all(vestigioPromises);

    return forensicId;
  } catch (error) {
    console.error('Erro ao salvar perícia modular:', error);
    throw error;
  }
}
