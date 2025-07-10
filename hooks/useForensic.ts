import { useState } from 'react';

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

    const [equipePericial, setEquipePericial] = useState([
        { nome: '', cargo: '', matricula: '' }
    ]);

    const [informacoes, setInformacoes] = useState([
        {
            descricao: '',
            observacao: '',
        }
    ]);

    const [reconhecimentoArea, setReconhecimentoArea] = useState('');
    const [medidasMitigadoras, setMedidasMitigadoras] = useState('');
    const [relatorioRia, setRelatorioRia] = useState('');
    const [outroDocumento, setOutroDocumento] = useState('');
    const [descricaoLesoes, setDescricaoLesoes] = useState('');
    const [depoimentoRelato, setDepoimentoRelato] = useState('');
    const [descricaoDetalhada, setDescricaoDetalhada] = useState('');
    const [mensagemInformacoesGerais, setMensagemInformacoesGerais] = useState<string[]>(['']);  // Para cada item em informacoes
    const [mensagemDepoimentos, setMensagemDepoimentos] = useState<string[]>(['']);  // Para cada item em depoimentos
    const [mensagemLesoesDepoimentos, setMensagemLesoesDepoimentos] = useState<string[]>(['']);  // Para descrever lesões em vítimas, quando aplicável
    const [mensagemRiscoAPR, setMensagemRiscoAPR] = useState<string>('');  // Campo de texto: medidasMitigatoria
    const [mensagemDescricaoVestigio, setMensagemDescricaoVestigio] = useState<string>('');  // Descrição do vestígio
    const [mensagemDescricaoPreliminar, setMensagemDescricaoPreliminar] = useState<string[]>(['']);  // Campo: descricaoDetalhada
    const [mensagemAcondicionamentoOutro, setMensagemAcondicionamentoOutro] = useState<string[]>(['']);  // Campo: tipoAcondicionamentoOutros
    const [mensagemDocumentacaoOutro, setMensagemDocumentacaoOutro] = useState<string>('');  // Outro tipo de documento


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

    const [peritoAuxiliar, setPeritoAuxiliar] = useState([
        { nome: '', matricula: '' }
    ]);

    const [tecnico, setTecnico] = useState([
        { nome: '', matricula: '' }
    ]);

    const [outros, setOutros] = useState([
        { nome: '', matricula: '' }
    ]);

    const [vestigio, setVestigio] = useState({
        numeroVestigio: '',
        unidadeOrigem: '',
        procedimento: '',
        responsavelColeta: '',
        responsavelMatricula: '',
        numeroLacre: '',
        outroDocumento: '',
    });

    const [dadosPreliminares, setDadosPreliminares] = useState([
        {
            numeroVestigio: '',
            unidadeOrigem: '',
            procedimento: '',
            naturezaVestigio: '',
            naturezaOutros: '',
            descricaoDetalhada: '',
        }
    ]);

    const [acondicionamento, setAcondicionamento] = useState([
        {
            responsavelColeta: '',
            matricula: '',
            tipoAcondicionamento: '',
            tipoAcondicionamentoOutros: '',
            numeroLacre: '',
        }
    ]);

    const [documentacao, setDocumentacao] = useState({
        projetos: '',
        memorialCalculo: '',
        licencaAlvara: '',
        art: '',
        planoManutencao: '',
        contratoManutencao: '',
        registroManutencao: '',
        relatorioRia: '',
        outro: '',
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

    const removerCampo = <T,>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        indexToRemove: number
    ) => {
        setter(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const clearFieldError = (field: string) => {
        if (errors[field]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[field];
            setErrors(updatedErrors);
        }
    };

    const resetForm = () => {
        setDadosIniciais({
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
        setRiscoAPR({
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
        setVestigio({
            numeroVestigio: '',
            unidadeOrigem: '',
            procedimento: '',
            responsavelColeta: '',
            responsavelMatricula: '',
            numeroLacre: '',
            outroDocumento: '',
        });
        setDocumentacao({
            projetos: '',
            memorialCalculo: '',
            licencaAlvara: '',
            art: '',
            planoManutencao: '',
            contratoManutencao: '',
            registroManutencao: '',
            relatorioRia: '',
            outro: '',
        });
        setEquipePericial([{ nome: '', cargo: '', matricula: '' }]);
        setPeritoAuxiliar([{ nome: '', matricula: '' }]);
        setTecnico([{ nome: '', matricula: '' }]);
        setOutros([{ nome: '', matricula: '' }]);
        setDadosPreliminares([
            {
                numeroVestigio: '',
                unidadeOrigem: '',
                procedimento: '',
                naturezaVestigio: '',
                naturezaOutros: '',
                descricaoDetalhada: '',
            }
        ]);
        setAcondicionamento([
            {
                responsavelColeta: '',
                matricula: '',
                tipoAcondicionamento: '',
                tipoAcondicionamentoOutros: '',
                numeroLacre: '',
            }
        ]);
        setDepoimentos([
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
        setInformacoes([
            {
                descricao: '',
                observacao: '',
            }
        ]);
        setReconhecimentoArea('');
        setMedidasMitigadoras('');
        setRelatorioRia('');
        setOutroDocumento('');
        setDescricaoLesoes('');
        setDepoimentoRelato('');
        setDescricaoDetalhada('');
        setErrors({});
    };

    return {
        dadosIniciais,
        setDadosIniciais,
        equipePericial,
        setEquipePericial,
        peritoAuxiliar,
        setPeritoAuxiliar,
        outros,
        setOutros,
        tecnico,
        setTecnico,
        dadosPreliminares,
        setDadosPreliminares,
        acondicionamento,
        setAcondicionamento,
        informacoes,
        setInformacoes,
        depoimentos,
        setDepoimentos,
        riscoAPR,
        setRiscoAPR,
        vestigio,
        setVestigio,
        documentacao,
        setDocumentacao,
        reconhecimentoArea,
        setReconhecimentoArea,
        medidasMitigadoras,
        setMedidasMitigadoras,
        relatorioRia,
        setRelatorioRia,
        outroDocumento,
        setOutroDocumento,
        descricaoLesoes,
        setDescricaoLesoes,
        depoimentoRelato,
        setDepoimentoRelato,
        descricaoDetalhada,
        setDescricaoDetalhada,
        adicionarCampo,
        atualizarCampo,
        removerCampo,
        resetForm,
        clearFieldError,
        errors,
        setErrors,
        mensagemInformacoesGerais,
        setMensagemInformacoesGerais,
        mensagemDepoimentos,
        setMensagemDepoimentos,
        mensagemLesoesDepoimentos,
        setMensagemLesoesDepoimentos,
        mensagemRiscoAPR,
        setMensagemRiscoAPR,
        mensagemDescricaoVestigio,
        setMensagemDescricaoVestigio,
        mensagemDescricaoPreliminar,
        setMensagemDescricaoPreliminar,
        mensagemAcondicionamentoOutro,
        setMensagemAcondicionamentoOutro,
        mensagemDocumentacaoOutro,
        setMensagemDocumentacaoOutro,
    };
};
