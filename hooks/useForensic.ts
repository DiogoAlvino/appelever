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
    });

    const [equipePericial, setEquipePericial] = useState([
        { nome: '', cargo: '', matricula: '' }
    ]);


    const [message, setMessage] = useState('');
    
    const [informacoes, setInformacoes] = useState([
        {
            descricao: '',
            observacao: '',
        }
    ]);


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
        });
        setMessage('');
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
        ])


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
        message,
        setMessage,
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
        adicionarCampo,
        atualizarCampo,
        removerCampo,
        resetForm,
        clearFieldError,
        errors,
        setErrors,
    };
};
