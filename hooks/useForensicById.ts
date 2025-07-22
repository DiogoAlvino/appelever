import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import { ForensicModel, VestigioResumo } from '~/models/forensicModel';

export function useForensicById(forensicId: string) {
    const [data, setData] = useState<ForensicModel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForensicData = async () => {
            try {
                setLoading(true);

                const mainDoc = await getDoc(doc(db, 'forensic', forensicId));
                if (!mainDoc.exists()) {
                    setData(null);
                    setLoading(false);
                    return;
                }

                const mainData = mainDoc.data();

                const [materialsSnap, analysisSnap, riskSnap, examsSnap, vestigiosSnap] = await Promise.all([
                    getDoc(doc(db, 'forensic_materials', forensicId)),
                    getDoc(doc(db, 'forensic_analysis', forensicId)),
                    getDoc(doc(db, 'forensic_risk', forensicId)),
                    getDoc(doc(db, 'forensic_exams', forensicId)),
                    getDocs(query(collection(db, 'forensic_vestigios'), where('forensicId', '==', forensicId))),
                ]);

                const materialsData = materialsSnap.data();
                const materiais = {
                    selecionados: Array.isArray(materialsData?.selecionados) ? materialsData.selecionados : [],
                    outroDescricao: typeof materialsData?.outroDescricao === 'string' ? materialsData.outroDescricao : '',
                };

                const vestigios = vestigiosSnap.docs.map(doc => doc.data()).filter((v): v is VestigioResumo => {
                    return (
                        typeof v.numeroVestigio === 'string' &&
                        typeof v.naturezaVestigio === 'string' &&
                        ['equipamentos', 'entrevistas', 'documentacao', 'perinecroscopia'].includes(v.origem)
                    );
                });

                const vestigiosDocumentacao = vestigios.filter(v => v.origem === 'documentacao');
                const vestigiosEquipamentos = vestigios.filter(v => v.origem === 'equipamentos');
                const vestigiosEntrevistas = vestigios.filter(v => v.origem === 'entrevistas');
                const vestigiosPerinecroscopia = vestigios.filter(v => v.origem === 'perinecroscopia');

                const examsData = examsSnap.data() || {};

                const fullData: ForensicModel = {
                    id: forensicId,
                    usuario: mainData.usuario || '',
                    dataCriacao: mainData.dataCriacao || null,
                    dadosIniciais: mainData.dadosIniciais || {},
                    equipePericial: mainData.equipePericial || [],
                    materiais,
                    analisePreliminar: {
                        reconhecimentoArea: analysisSnap.data()?.reconhecimentoArea || '',
                        condicoesAmbientais: analysisSnap.data()?.condicoesAmbientais || '',
                        caracteristicasLocal: analysisSnap.data()?.caracteristicasLocal || '',
                        informacoes: analysisSnap.data()?.informacoes || [],
                        arquivosReconhecimentoArea: analysisSnap.data()?.arquivosReconhecimentoArea || [],
                    },

                    risco: {
                        riscoAPR: riskSnap.data()?.riscoAPR || {
                            peritoResponsavel: '',
                            peritoMatricula: '',
                            riscoAcidente: '',
                            riscoFisico: '',
                            riscoQuimico: false,
                            riscoBiologico: false,
                            gravidade: '',
                            probabilidade: '',
                            medidasMitigatoria: '',
                        },
                        peritoAuxiliar: riskSnap.data()?.peritoAuxiliar || [],
                        tecnico: riskSnap.data()?.tecnico || [],
                        outros: riskSnap.data()?.outros || [],
                    },

                    exames: {
                        documentacao: examsData.documentacao || {
                            projetos: '',
                            projetosArquivos: [],
                            memorialCalculo: '',
                            memorialCalculoArquivos: [],
                            licencaAlvara: '',
                            licencaAlvaraArquivos: [],
                            art: '',
                            artArquivos: [],
                            planoManutencao: '',
                            planoManutencaoArquivos: [],
                            contratoManutencao: '',
                            contratoManutencaoArquivos: [],
                            registroManutencao: '',
                            registroManutencaoArquivos: [],
                            relatorioRia: '',
                            relatorioRiaArquivos: [],
                            outro: '',
                            outroArquivos: [],
                        },
                        observacoesDocumentacao: examsData.observacoesDocumentacao || '',
                        vestigiosDocumentacao,
                        equipamentosExame: {
                            maquinaTracao: examsData.equipamentosExame?.maquinaTracao || [],
                            limitadorVelocidade: examsData.equipamentosExame?.limitadorVelocidade || [],
                            cabos: examsData.equipamentosExame?.cabos || [],
                            contrapeso: examsData.equipamentosExame?.contrapeso || [],
                            cabine: examsData.equipamentosExame?.cabine || [],
                            portas: examsData.equipamentosExame?.portas || [],
                            freiosEmergencia: examsData.equipamentosExame?.freiosEmergencia || [],
                            sistemaControle: examsData.equipamentosExame?.sistemaControle || [],
                            sistemaEletrico: examsData.equipamentosExame?.sistemaEletrico || [],
                            sensores: examsData.equipamentosExame?.sensores || [],
                            pocoElevador: examsData.equipamentosExame?.pocoElevador || [],
                        },
                        vestigiosEquipamentos,
                        depoimentos: examsData.depoimentos || [],
                        vestigiosEntrevistas,
                        perinecroscopia: {
                            cadaverSexo: examsData.perinecroscopia?.cadaverSexo || '',
                            cadaverCorPele: examsData.perinecroscopia?.cadaverCorPele || '',
                            cadaverCabelo: examsData.perinecroscopia?.cadaverCabelo || '',
                            cadaverSinaisIdentificadores: examsData.perinecroscopia?.cadaverSinaisIdentificadores || '',
                            cadaverDescricaoVestes: examsData.perinecroscopia?.cadaverDescricaoVestes || '',
                            cadaverOutro: examsData.perinecroscopia?.cadaverOutro || '',
                            analiseDisposicaoCadaver: examsData.perinecroscopia?.analiseDisposicaoCadaver || '',
                            arquivosDisposicaoCadaver: examsData.perinecroscopia?.arquivosDisposicaoCadaver || [],
                            sinaisTanatologicos: examsData.perinecroscopia?.sinaisTanatologicos || '',
                            arquivosTanatologicos: examsData.perinecroscopia?.arquivosTanatologicos || [],
                            descricaoLesoesCadaver: examsData.perinecroscopia?.descricaoLesoesCadaver || '',
                            arquivosLesoesCadaver: examsData.perinecroscopia?.arquivosLesoesCadaver || [],
                        },
                        vestigiosPerinecroscopia,
                    },

                    condicaoVitimas: undefined,
                    numeroVitimas: undefined,
                    viatura: undefined,
                    autoridadePolicialNome: undefined,
                    tipoOcorrencia: undefined,
                    matriculaPerito: undefined,
                    cargoPerito: false,
                    peritoResponsavel: undefined
                };

                setData(fullData);
            } catch (err) {
                console.error('Erro ao buscar análise forense:', err);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (forensicId) {
            fetchForensicData();
        }
    }, [forensicId]);

    return { forensic: data, loading };
}