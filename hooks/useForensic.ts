import { useState } from 'react';
import { FileItem, VestigioResumo, CampoChecklist, Depoimento, Documentacao, RiscoAPR } from '~/types/forensicTypes';

export const useForensic = () => {
    const [dadosIniciais, setDadosIniciais] = useState({
        peritoResponsavel: '',
        cargoPerito: '',
        matriculaPerito: '',
        dataHora: new Date(),
        tipoOcorrencia: '',
        autoridadePolicialNome: '',
        viatura: '',
        numeroVitimas: '',
        condicaoVitimas: '',
        autoridadePolicial: '',
        reconhecimento: '',
    });

    const [riscoAPR, setRiscoAPR] = useState<RiscoAPR>({
        peritoResponsavel: '',
        peritoMatricula: '',
        riscoAcidente: '',
        riscoFisico: '',
        riscoQuimico: false,
        riscoBiologico: false,
        gravidade: '',
        probabilidade: '',
        medidasMitigatoria: '',
    });

    const [dadosPreliminares, setDadosPreliminares] = useState([{
        numeroVestigio: '',
        unidadeOrigem: '',
        procedimento: '',
        naturezaVestigio: '',
        naturezaOutros: '',
        descricaoDetalhada: '',
        descricaoDetalhadaArquivos: [] as FileItem[],
    }]);

    const [acondicionamento, setAcondicionamento] = useState([{
        responsavelColeta: '',
        matricula: '',
        tipoAcondicionamento: '',
        tipoAcondicionamentoOutros: '',
        numeroLacre: '',
        arquivos: [] as FileItem[],
    }]);

    const [equipePericial, setEquipePericial] = useState([{ nome: '', cargo: '', matricula: '' }]);
    const [informacoes, setInformacoes] = useState([{ descricao: '', observacao: '' }]);

    const [peritoAuxiliar, setPeritoAuxiliar] = useState([{ nome: '', matricula: '' }]);
    const [tecnico, setTecnico] = useState([{ nome: '', matricula: '' }]);
    const [outros, setOutros] = useState([{ nome: '', matricula: '' }]);

    const [materialOutroDescricao, setMaterialOutroDescricao] = useState('');

    const [reconhecimentoArea, setReconhecimentoArea] = useState('');
    const [condicoesAmbientais, setCondicoesAmbientais] = useState('');
    const [caracteristicasLocal, setCaracteristicasLocal] = useState('');
    const [arquivosReconhecimentoArea, setArquivosReconhecimentoArea] = useState<FileItem[]>([]);

    const [documentacao, setDocumentacao] = useState<Documentacao>({
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
    });

    const [observacoesDocumentacao, setObservacoesDocumentacao] = useState('');
    const [vestigiosDocumentacao, setVestigiosDocumentacao] = useState<VestigioResumo[]>([]);

    const [maquinaTracao, setMaquinaTracao] = useState<CampoChecklist[]>([]);
    const [limitadorVelocidade, setLimitadorVelocidade] = useState<CampoChecklist[]>([]);
    const [cabos, setCabos] = useState<CampoChecklist[]>([]);
    const [contrapeso, setContrapeso] = useState<CampoChecklist[]>([]);
    const [cabine, setCabine] = useState<CampoChecklist[]>([]);
    const [portas, setPortas] = useState<CampoChecklist[]>([]);
    const [freiosEmergencia, setFreiosEmergencia] = useState<CampoChecklist[]>([]);
    const [sistemaControle, setSistemaControle] = useState<CampoChecklist[]>([]);
    const [sistemaEletrico, setSistemaEletrico] = useState<CampoChecklist[]>([]);
    const [sensores, setSensores] = useState<CampoChecklist[]>([]);
    const [pocoElevador, setPocoElevador] = useState<CampoChecklist[]>([]);
    const [vestigiosEquipamentos, setVestigiosEquipamentos] = useState<VestigioResumo[]>([]);

    const [depoimentos, setDepoimentos] = useState<Depoimento[]>([
        {
            tipoEntrevistado: '',
            genero: '',
            nomeEntrevistado: '',
            identificacao: '',
            endereco: '',
            idade: '',
            descricaoLesoes: '',
            depoimentoRelato: '',
        },
    ]);
    const [vestigiosEntrevistas, setVestigiosEntrevistas] = useState<VestigioResumo[]>([]);

    const [cadaverSexo, setCadaverSexo] = useState('');
    const [cadaverCorPele, setCadaverCorPele] = useState('');
    const [cadaverCabelo, setCadaverCabelo] = useState('');
    const [cadaverSinaisIdentificadores, setCadaverSinaisIdentificadores] = useState('');
    const [cadaverDescricaoVestes, setCadaverDescricaoVestes] = useState('');
    const [cadaverOutro, setCadaverOutro] = useState('');
    const [analiseDisposicaoCadaver, setAnaliseDisposicaoCadaver] = useState('');
    const [arquivosDisposicaoCadaver, setArquivosDisposicaoCadaver] = useState<FileItem[]>([]);
    const [sinaisTanatologicos, setSinaisTanatologicos] = useState('');
    const [arquivosTanatologicos, setArquivosTanatologicos] = useState<FileItem[]>([]);
    const [descricaoLesoesCadaver, setDescricaoLesoesCadaver] = useState('');
    const [arquivosLesoesCadaver, setArquivosLesoesCadaver] = useState<FileItem[]>([]);
    const [vestigiosPerinecroscopia, setVestigiosPerinecroscopia] = useState<VestigioResumo[]>([]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const adicionarCampo = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, novoItem: T) => {
        setter(prev => [...prev, novoItem]);
    };

    const atualizarCampo = <T,>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        index: number,
        campo: keyof T,
        valor: T[keyof T]
    ) => {
        setter(prev => {
            const copia = [...prev];
            copia[index] = { ...copia[index], [campo]: valor };
            return copia;
        });
    };

    const removerCampo = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, indexToRemove: number) => {
        setter(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const clearFieldError = (field: string) => {
        if (errors[field]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[field];
            setErrors(updatedErrors);
        }
    };

    return {
        dadosIniciais, setDadosIniciais,
        equipePericial, setEquipePericial,
        peritoAuxiliar, setPeritoAuxiliar,
        tecnico, setTecnico,
        outros, setOutros,
        reconhecimentoArea, setReconhecimentoArea,
        condicoesAmbientais, setCondicoesAmbientais,
        caracteristicasLocal, setCaracteristicasLocal,
        arquivosReconhecimentoArea, setArquivosReconhecimentoArea,
        documentacao, setDocumentacao,
        observacoesDocumentacao, setObservacoesDocumentacao,
        vestigiosDocumentacao, setVestigiosDocumentacao,
        maquinaTracao, setMaquinaTracao,
        limitadorVelocidade, setLimitadorVelocidade,
        cabos, setCabos,
        contrapeso, setContrapeso,
        cabine, setCabine,
        portas, setPortas,
        freiosEmergencia, setFreiosEmergencia,
        sistemaControle, setSistemaControle,
        sistemaEletrico, setSistemaEletrico,
        sensores, setSensores,
        pocoElevador, setPocoElevador,
        vestigiosEquipamentos, setVestigiosEquipamentos,
        depoimentos, setDepoimentos,
        vestigiosEntrevistas, setVestigiosEntrevistas,
        cadaverSexo, setCadaverSexo,
        cadaverCorPele, setCadaverCorPele,
        cadaverCabelo, setCadaverCabelo,
        cadaverSinaisIdentificadores, setCadaverSinaisIdentificadores,
        cadaverDescricaoVestes, setCadaverDescricaoVestes,
        cadaverOutro, setCadaverOutro,
        analiseDisposicaoCadaver, setAnaliseDisposicaoCadaver,
        arquivosDisposicaoCadaver, setArquivosDisposicaoCadaver,
        sinaisTanatologicos, setSinaisTanatologicos,
        arquivosTanatologicos, setArquivosTanatologicos,
        descricaoLesoesCadaver, setDescricaoLesoesCadaver,
        arquivosLesoesCadaver, setArquivosLesoesCadaver,
        vestigiosPerinecroscopia, setVestigiosPerinecroscopia,
        materialOutroDescricao, setMaterialOutroDescricao,
        informacoes, setInformacoes,
        adicionarCampo, atualizarCampo, removerCampo,
        errors, setErrors, clearFieldError,
        riscoAPR, setRiscoAPR,
        dadosPreliminares, setDadosPreliminares,
        acondicionamento, setAcondicionamento
    };
};
