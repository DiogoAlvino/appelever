import { useState } from 'react';

export type FileItem = {
    name: string;
    uri: string;
    type: 'image' | 'file' | 'photo';
    size: number;
};

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

    const [equipePericial, setEquipePericial] = useState([{ nome: '', cargo: '', matricula: '' }]);
    const [informacoes, setInformacoes] = useState([{ descricao: '', observacao: '' }]);
    const [peritoAuxiliar, setPeritoAuxiliar] = useState([{ nome: '', matricula: '' }]);
    const [tecnico, setTecnico] = useState([{ nome: '', matricula: '' }]);
    const [outros, setOutros] = useState([{ nome: '', matricula: '' }]);

    const [reconhecimentoArea, setReconhecimentoArea] = useState('');
    const [condicoesAmbientais, setCondicoesAmbientais] = useState('');
    const [caracteristicasLocal, setCaracteristicasLocal] = useState('');
    const [observacoesDocumentacao, setObservacoesDocumentacao] = useState('');
    const [cadaverSexo, setCadaverSexo] = useState('');
    const [cadaverCorPele, setCadaverCorPele] = useState('');
    const [cadaverCabelo, setCadaverCabelo] = useState('');
    const [cadaverSinaisIdentificadores, setCadaverSinaisIdentificadores] = useState('');
    const [cadaverDescricaoVestes, setCadaverDescricaoVestes] = useState('');
    const [cadaverOutro, setCadaverOutro] = useState('');
    const [analiseDisposicaoCadaver, setAnaliseDisposicaoCadaver] = useState('');
    const [sinaisTanatologicos, setSinaisTanatologicos] = useState('');
    const [descricaoLesoesCadaver, setDescricaoLesoesCadaver] = useState('');

    const [arquivosProjetos, setArquivosProjetos] = useState<FileItem[]>([]);
    const [arquivosMemorial, setArquivosMemorial] = useState<FileItem[]>([]);
    const [arquivosLicenca, setArquivosLicenca] = useState<FileItem[]>([]);
    const [arquivosArt, setArquivosArt] = useState<FileItem[]>([]);
    const [arquivosPlano, setArquivosPlano] = useState<FileItem[]>([]);
    const [arquivosContrato, setArquivosContrato] = useState<FileItem[]>([]);
    const [arquivosRegistro, setArquivosRegistro] = useState<FileItem[]>([]);
    const [arquivosRia, setArquivosRia] = useState<FileItem[]>([]);
    const [arquivosOutro, setArquivosOutro] = useState<FileItem[]>([]);
    const [arquivosVestigioDescricao, setArquivosVestigioDescricao] = useState<FileItem[]>([]);
    const [arquivosAcondicionamento, setArquivosAcondicionamento] = useState<FileItem[]>([]);
    const [arquivosDisposicaoCadaver, setArquivosDisposicaoCadaver] = useState<FileItem[]>([]);
    const [arquivosTanatologicos, setArquivosTanatologicos] = useState<FileItem[]>([]);
    const [arquivosLesoesCadaver, setArquivosLesoesCadaver] = useState<FileItem[]>([]);

    const [medidasMitigadoras, setMedidasMitigadoras] = useState('');
    const [relatorioRia, setRelatorioRia] = useState('');
    const [outroDocumento, setOutroDocumento] = useState('');
    const [descricaoLesoes, setDescricaoLesoes] = useState('');
    const [depoimentoRelato, setDepoimentoRelato] = useState('');
    const [descricaoDetalhada, setDescricaoDetalhada] = useState('');

    const [mensagemInformacoesGerais, setMensagemInformacoesGerais] = useState<string[]>(['']);
    const [mensagemDepoimentos, setMensagemDepoimentos] = useState<string[]>(['']);
    const [mensagemLesoesDepoimentos, setMensagemLesoesDepoimentos] = useState<string[]>(['']);
    const [mensagemRiscoAPR, setMensagemRiscoAPR] = useState<string>('');
    const [mensagemDescricaoVestigio, setMensagemDescricaoVestigio] = useState<string>('');
    const [mensagemDescricaoPreliminar, setMensagemDescricaoPreliminar] = useState<string[]>(['']);
    const [mensagemAcondicionamentoOutro, setMensagemAcondicionamentoOutro] = useState<string[]>(['']);
    const [mensagemDocumentacaoOutro, setMensagemDocumentacaoOutro] = useState<string>('');

    const [materiaisSelecionados, setMateriaisSelecionados] = useState<number[]>([]);
    const [materialOutroDescricao, setMaterialOutroDescricao] = useState('');

    const [vestigiosDocumentacao, setVestigiosDocumentacao] = useState<any[]>([]);

    const [maquinaTracao, setMaquinaTracao] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [limitadorVelocidade, setLimitadorVelocidade] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [cabos, setCabos] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [contrapeso, setContrapeso] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [cabine, setCabine] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [portas, setPortas] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [freiosEmergencia, setFreiosEmergencia] = useState<{
        [id: number]: { texto: string; arquivos: FileItem[] }
    }>({});

    const [sistemaControle, setSistemaControle] = useState<{ [id: number]: { texto: string; arquivos: FileItem[] } }>({});
    const [sistemaEletrico, setSistemaEletrico] = useState<{ [id: number]: { texto: string; arquivos: FileItem[] } }>({});
    const [sensores, setSensores] = useState<{ [id: number]: { texto: string; arquivos: FileItem[] } }>({});
    const [pocoElevador, setPocoElevador] = useState<{ [id: number]: { texto: string; arquivos: FileItem[] } }>({});

    const [vestigiosPerinecroscopia, setVestigiosPerinecroscopia] = useState<any[]>([]);


    const [riscoAPR, setRiscoAPR] = useState({
        riscoAcidente: '',
        riscoFisico: '',
        gravidade: '',
        probabilidade: '',
        riscoQuimico: false,
        riscoBiologico: false,
        autoridadePolicial: '',
        peritoResponsavel: '',
        peritoMatricula: '',
        medidasMitigatoria: '',
    });

    const [vestigio, setVestigio] = useState({
        numeroVestigio: '',
        unidadeOrigem: '',
        procedimento: '',
        responsavelColeta: '',
        responsavelMatricula: '',
        numeroLacre: '',
        outroDocumento: '',
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


    const [documentacao, setDocumentacao] = useState({
        projetos: '',
        projetosArquivos: [] as FileItem[],
        memorialCalculo: '',
        memorialCalculoArquivos: [] as FileItem[],
        licencaAlvara: '',
        licencaAlvaraArquivos: [] as FileItem[],
        art: '',
        artArquivos: [] as FileItem[],
        planoManutencao: '',
        planoManutencaoArquivos: [] as FileItem[],
        contratoManutencao: '',
        contratoManutencaoArquivos: [] as FileItem[],
        registroManutencao: '',
        registroManutencaoArquivos: [] as FileItem[],
        relatorioRia: '',
        relatorioRiaArquivos: [] as FileItem[],
        outro: '',
        outroArquivos: [] as FileItem[],
    });


    const [depoimentos, setDepoimentos] = useState([
        {
            tipoEntrevistado: '',
            genero: '',
            nomeEntrevistado: '',
            identificacao: '',
            endereco: '',
            idade: '',
            descricaoLesoes: '',
            depoimentoRelato: '',
        }
    ]);

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
        observacoesDocumentacao, setObservacoesDocumentacao,
        cadaverSexo, setCadaverSexo,
        cadaverCorPele, setCadaverCorPele,
        cadaverCabelo, setCadaverCabelo,
        cadaverSinaisIdentificadores, setCadaverSinaisIdentificadores,
        cadaverDescricaoVestes, setCadaverDescricaoVestes,
        cadaverOutro, setCadaverOutro,
        analiseDisposicaoCadaver, setAnaliseDisposicaoCadaver,
        sinaisTanatologicos, setSinaisTanatologicos,
        descricaoLesoesCadaver, setDescricaoLesoesCadaver,
        arquivosProjetos, setArquivosProjetos,
        arquivosMemorial, setArquivosMemorial,
        arquivosLicenca, setArquivosLicenca,
        arquivosArt, setArquivosArt,
        arquivosPlano, setArquivosPlano,
        arquivosContrato, setArquivosContrato,
        arquivosRegistro, setArquivosRegistro,
        arquivosRia, setArquivosRia,
        arquivosOutro, setArquivosOutro,
        arquivosVestigioDescricao, setArquivosVestigioDescricao,
        arquivosAcondicionamento, setArquivosAcondicionamento,
        arquivosDisposicaoCadaver, setArquivosDisposicaoCadaver,
        arquivosTanatologicos, setArquivosTanatologicos,
        arquivosLesoesCadaver, setArquivosLesoesCadaver,
        medidasMitigadoras, setMedidasMitigadoras,
        relatorioRia, setRelatorioRia,
        outroDocumento, setOutroDocumento,
        descricaoLesoes, setDescricaoLesoes,
        depoimentoRelato, setDepoimentoRelato,
        descricaoDetalhada, setDescricaoDetalhada,
        documentacao, setDocumentacao,
        vestigiosDocumentacao,
        setVestigiosDocumentacao,
        riscoAPR, setRiscoAPR,
        vestigio, setVestigio,
        dadosPreliminares, setDadosPreliminares,
        acondicionamento, setAcondicionamento,
        depoimentos, setDepoimentos,
        informacoes, setInformacoes,
        mensagemInformacoesGerais, setMensagemInformacoesGerais,
        mensagemDepoimentos, setMensagemDepoimentos,
        mensagemLesoesDepoimentos, setMensagemLesoesDepoimentos,
        mensagemRiscoAPR, setMensagemRiscoAPR,
        mensagemDescricaoVestigio, setMensagemDescricaoVestigio,
        mensagemDescricaoPreliminar, setMensagemDescricaoPreliminar,
        mensagemAcondicionamentoOutro, setMensagemAcondicionamentoOutro,
        mensagemDocumentacaoOutro, setMensagemDocumentacaoOutro,
        adicionarCampo, atualizarCampo, removerCampo,
        clearFieldError, errors, setErrors,
        materiaisSelecionados, setMateriaisSelecionados,
        materialOutroDescricao, setMaterialOutroDescricao,
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
        vestigiosPerinecroscopia, setVestigiosPerinecroscopia
    };
};
