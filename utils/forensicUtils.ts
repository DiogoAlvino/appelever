import { ForensicModel } from "~/models/forensicModel";

export function isDadosIniciaisRespondido(dados: ForensicModel): boolean {
    const { dadosIniciais, equipePericial } = dados;

    return (
        dadosIniciais.peritoResponsavel?.trim() !== '' ||
        dadosIniciais.cargoPerito?.trim() !== '' ||
        dadosIniciais.matriculaPerito?.trim() !== '' ||
        dadosIniciais.tipoOcorrencia?.trim() !== '' ||
        dadosIniciais.autoridadePolicialNome?.trim() !== '' ||
        dadosIniciais.viatura?.trim() !== '' ||
        dadosIniciais.numeroVitimas?.trim() !== '' ||
        dadosIniciais.condicaoVitimas?.trim() !== '' ||
        dadosIniciais.autoridadePolicial?.trim() !== '' ||
        !!dadosIniciais.localizacao?.address?.trim() ||
        equipePericial.some(
            (membro) =>
                membro.nome?.trim() !== '' ||
                membro.cargo?.trim() !== '' ||
                membro.matricula?.trim() !== ''
        )
    );
}

export function isMateriaisRespondido(dados: ForensicModel): boolean {
    const { materiais } = dados;

    return (
        materiais.selecionados.length > 0 ||
        materiais.outroDescricao?.trim() !== ''
    );
}

export function isAnalisePreliminarRespondido(dados: ForensicModel): boolean {
    const { analisePreliminar } = dados;

    const {
        reconhecimentoArea,
        condicoesAmbientais,
        caracteristicasLocal,
        informacoes,
        arquivosReconhecimentoArea
    } = analisePreliminar;

    return (
        reconhecimentoArea.trim() !== '' ||
        condicoesAmbientais.trim() !== '' ||
        caracteristicasLocal.trim() !== '' ||
        arquivosReconhecimentoArea.length > 0 ||
        informacoes.some(info => info.descricao.trim() !== '' || info.observacao.trim() !== '')
    );
}

export function isRiscoAPRRespondido(dados: ForensicModel): boolean {
    const risco = dados.risco?.riscoAPR;

    return (
        risco?.peritoResponsavel?.trim() !== '' ||
        risco?.peritoMatricula?.trim() !== '' ||
        risco?.riscoAcidente?.trim() !== '' ||
        risco?.riscoFisico?.trim() !== '' ||
        risco?.riscoQuimico === true ||
        risco?.riscoBiologico === true ||
        risco?.gravidade?.trim() !== '' ||
        risco?.probabilidade?.trim() !== '' ||
        risco?.medidasMitigatoria?.trim() !== ''
    );
}

export function isExamesRespondido(dados: ForensicModel): boolean {
  const exames = dados.exames;
  const documentacao = exames.documentacao;

  const camposChecklist = [
    exames.maquinaTracao,
    exames.limitadorVelocidade,
    exames.cabos,
    exames.contrapeso,
    exames.cabine,
    exames.portas,
    exames.freiosEmergencia,
    exames.sistemaControle,
    exames.sistemaEletrico,
    exames.sensores,
    exames.pocoElevador,
  ];

  const algumChecklistRespondido = camposChecklist.some((lista) =>
    lista.some(
      (campo) =>
        (campo.observacao && campo.observacao.trim() !== '') ||
        (campo.arquivos && campo.arquivos.length > 0)
    )
  );

  const algumDocumentoPreenchido =
    documentacao.projetos?.trim() !== '' ||
    documentacao.projetosArquivos.length > 0 ||
    documentacao.memorialCalculo?.trim() !== '' ||
    documentacao.memorialCalculoArquivos.length > 0 ||
    documentacao.licencaAlvara?.trim() !== '' ||
    documentacao.licencaAlvaraArquivos.length > 0 ||
    documentacao.art?.trim() !== '' ||
    documentacao.artArquivos.length > 0 ||
    documentacao.planoManutencao?.trim() !== '' ||
    documentacao.planoManutencaoArquivos.length > 0 ||
    documentacao.contratoManutencao?.trim() !== '' ||
    documentacao.contratoManutencaoArquivos.length > 0 ||
    documentacao.registroManutencao?.trim() !== '' ||
    documentacao.registroManutencaoArquivos.length > 0 ||
    documentacao.relatorioRia?.trim() !== '' ||
    documentacao.relatorioRiaArquivos.length > 0 ||
    documentacao.outro?.trim() !== '' ||
    documentacao.outroArquivos.length > 0;

  return (
    algumDocumentoPreenchido ||
    exames.observacoesDocumentacao?.trim() !== '' ||
    exames.vestigiosDocumentacao.length > 0 ||
    exames.vestigiosEquipamentos.length > 0 ||
    exames.vestigiosEntrevistas.length > 0 ||
    exames.vestigiosPerinecroscopia.length > 0 ||
    algumChecklistRespondido ||
    exames.depoimentos.some((dep) =>
      dep.tipoEntrevistado?.trim() !== '' ||
      dep.genero?.trim() !== '' ||
      dep.nomeEntrevistado?.trim() !== '' ||
      dep.identificacao?.trim() !== '' ||
      dep.endereco?.trim() !== '' ||
      dep.idade?.trim() !== '' ||
      dep.descricaoLesoes?.trim() !== '' ||
      dep.depoimentoRelato?.trim() !== '' ||
      dep.arquivoLesoes.length > 0
    ) ||
    exames.cadaverSexo?.trim() !== '' ||
    exames.cadaverCorPele?.trim() !== '' ||
    exames.cadaverCabelo?.trim() !== '' ||
    exames.cadaverSinaisIdentificadores?.trim() !== '' ||
    exames.cadaverDescricaoVestes?.trim() !== '' ||
    exames.cadaverOutro?.trim() !== '' ||
    exames.analiseDisposicaoCadaver?.trim() !== '' ||
    exames.sinaisTanatologicos?.trim() !== '' ||
    exames.descricaoLesoesCadaver?.trim() !== '' ||
    exames.arquivosDisposicaoCadaver.length > 0 ||
    exames.arquivosTanatologicos.length > 0 ||
    exames.arquivosLesoesCadaver.length > 0
  );
}



