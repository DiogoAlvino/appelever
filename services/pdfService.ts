import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { materials } from '~/data/materials';
import { EquipmentModel } from '~/models/equipmentModel';
import { ForensicModel } from '~/models/forensicModel';
import { InspectionModel } from '~/models/inspectionModel';
import { auth } from "~/utils/firebase";

export async function generatePDFWithHTML(
  inspection: InspectionModel,
  equipment: EquipmentModel
) {
  try {
    const dataHoraAtual = new Date().toLocaleString('pt-BR');

    const rawData = equipment?.detalhes_equipamento?.dataInstalacao as any;

    let dataInstalacaoEquipamento = 'N/A';

    if (rawData instanceof Date) {
      dataInstalacaoEquipamento = rawData.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } else if (rawData?.seconds) {
      const parsed = new Date(rawData.seconds * 1000);
      dataInstalacaoEquipamento = parsed.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    const respostas = Object.values(inspection.answers);
    const quantidadeRespostas = Object.values(inspection.answers).length;
    const totalNao = respostas.filter(r => r.answer === 'nao').length;

    const prioridadeDosNConformes = respostas
      .filter(r => r.answer === 'nao' && r.priority)
      .map(r => r.priority?.toLowerCase());

    let criticidade = 'Não aplicável';

    if (prioridadeDosNConformes.includes('alto')) {
      criticidade = "Alto";
    } else if (prioridadeDosNConformes.includes('médio') || prioridadeDosNConformes.includes('medio')) {
      criticidade = "Médio";
    } else if (prioridadeDosNConformes.includes("baixo")) {
      criticidade = "Baixo";
    }


    const htmlContent = `
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 45px;
        }

        h1, h2 {
          text-align: center;
        }

        .header-text {
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .section {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 40px;
        }

        .label {
          font-weight: bold;
        }

        .item {
          border-bottom: 1px dashed #ddd;
          padding: 10px 0;
        }

        .full-image {
          width: 100%;
          max-height: 700px;
          object-fit: contain;
          margin: 20px 0;
          page-break-after: always;
        }

        .footer {
          text-align: right;
          font-size: 14px;
          color: #555;
          margin-top: 40px;
        }

      image-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 12px;
    }

    .image-item {
      width: calc(50% - 10px); /* 2 por linha com gap */
      text-align: center;
      page-break-inside: avoid;
    }

    .image-item img {
      width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: contain;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    .image-item p {
      font-size: 12px;
      margin-top: 4px;
      color: #555;
    }
      .answer-section {
    margin-bottom: 24px;
  }
      </style>
    </head>
    <body>
      <h1>Ficha de Inspeção</h1>
      
      <div class="header-text">
        Inspeção de conformidade em elevadores de passageiros a tração.<br />
        Fundamentado NBR 16585-7
      </div>

      <div class="section">
        <h2>Dados do Equipamento</h2>
        <p><span class="label">Identificação:</span> ${equipment?.detalhes_equipamento?.identificacaoEquipamento || 'N/A'}</p>
        <p><span class="label">Local:</span> ${equipment?.local?.edificacao || 'N/A'}</p>
        <p><span class="label">Endereço:</span> ${equipment?.local?.logradouro}, ${equipment?.local?.numero} - ${equipment?.local?.bairro}</p>
        <p><span class="label">Responsável Técnico:</span> ${equipment?.responsavel?.nome} - ${equipment?.responsavel?.funcao}</p>
        <p><span class="label">Contato:</span> ${equipment?.responsavel?.telefone} - ${equipment?.responsavel?.email}</p>
        <p><span class="label">Data de Instalação:</span> ${dataInstalacaoEquipamento}</p>
        <p><span class="label">Fabricante:</span> ${equipment?.detalhes_equipamento?.fabricante}</p>
        <p><span class="label">CNPJ:</span> ${equipment?.detalhes_equipamento?.cnpj}</p>
        <p><span class="label">Modelo:</span> ${equipment?.detalhes_equipamento?.modelo}</p>
        <p><span class="label">Capacidade:</span> ${equipment?.detalhes_equipamento?.capacidadeNominal} kg</p>
        <p><span class="label">Tipo de uso:</span> ${equipment?.detalhes_equipamento?.tipoDeUso}</p>
        <p><span class="label">Nº Paradas:</span> ${equipment?.detalhes_equipamento?.numeroDeParadas}</p>
        <p><span class="label">Casa de Máquinas:</span> ${equipment?.detalhes_equipamento?.casaDeMaquinas ? 'Sim' : 'Não'}</p>
        <p><span class="label">Empresa Conservadora:</span> ${equipment?.empresa_conservadora?.razaoSocial} (${equipment?.empresa_conservadora?.cnpj})</p>
        
        ${equipment?.uploads?.filter(u => u.arquivo).length > 0 ? `
          <p><span class="label">Arquivos: </span></p>
          <div class="image-grid">
            ${equipment.uploads.filter(u => u.arquivo).map(file => `
              <div class="image-item">
                <img src="${file.arquivo}" />
                 <p>${file.nome}</p>
              </div>
           `).join('')}
          </div>
        ` : ''}
      </div>



      <div class="section">
        <h2>Responsável pela inspeção</h2>
        <p><span class="label">Responsável:</span> ${auth.currentUser?.displayName || 'usuário'}</p>
        <p><span class="label">Data:</span> ${new Date(inspection?.dataCriacao).toLocaleDateString('pt-BR')}</p>
      </div>

      <div class="section">
        <h2>Resumo da Verificação</h2>
        <p><span class="label">Itens verificados:</span> ${quantidadeRespostas}</p>
        <p><span class="label">Itens não conformes:</span> ${totalNao}</p>
        <p><span class="label">Criticidade:</span> ${criticidade}</p>
      </div>


      <div class="section">
        <h2>Itens Verificados</h2>
          ${Object.entries(inspection.answers).map(([id, q]) => {
      const uploads = Array.isArray(q.uploads)
        ? q.uploads.filter(file => !!file.arquivo && typeof file.arquivo === 'string')
        : [];

      return `
        <div class="item">
          <p><span class="label">Item:</span> ${id}</p>
          <p><span class="label">Resposta:</span> ${q.answer?.toUpperCase()}</p>
          <p><span class="label">Prioridade:</span> ${q.priority}</p>
          <p><span class="label">Verificação:</span> ${q.verification}</p>
          
          ${uploads.length > 0 ? `
            <p><span class="label">Arquivos: </span></p>
            <div class="image-grid">
              ${uploads.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
            ` ).join('')}
            </div>
          ` : ''}
            </div>
            `;
    }).join('')}
        </div>



      <div class="section">
        <h2>Implementações Necessárias</h2>
        ${Object.values(inspection.answers).filter(q => q.answer === 'nao').length > 0
        ? Object.entries(inspection.answers)
          .filter(([, q]) => q.answer === 'nao')
          .map(([id, q]) => `
                <div class="item">
                  <p><span class="label">Item:</span> ${id}</p>
                  <p><span class="label">Norma:</span> ${q.normaID}</p>
                  <p><span class="label">Descrição:</span> ${q.mitigation}</p>
                  <p><span class="label">Necessidade:</span> ${q.limit}</p>
                </div>
              `).join('')
        : `<p>Nenhuma implementação necessária.</p>`}
      </div>

      <div class="footer">
        Documento gerado em: ${dataHoraAtual}
      </div>
    </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}

export async function generateForensicPDF(forensic: ForensicModel) {
  try {
    const dataHoraAtual = new Date().toLocaleString('pt-BR');


    const imagensDocumentacao = [
      ...(forensic.exames?.documentacao?.projetosArquivos || []),
      ...(forensic.exames?.documentacao?.memorialCalculoArquivos || []),
      ...(forensic.exames?.documentacao?.licencaAlvaraArquivos || []),
      ...(forensic.exames?.documentacao?.artArquivos || []),
      ...(forensic.exames?.documentacao?.planoManutencaoArquivos || []),
      ...(forensic.exames?.documentacao?.contratoManutencaoArquivos || []),
      ...(forensic.exames?.documentacao?.registroManutencaoArquivos || []),
      ...(forensic.exames?.documentacao?.relatorioRiaArquivos || []),
      ...(forensic.exames?.documentacao?.outroArquivos || []),
    ];

    // Pré-condições no topo da função (antes do HTML)
    const doc = forensic.exames?.documentacao || {};
    const temDocumentacao = Object.values(doc).some(v =>
      typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) ? v.length > 0 : !!v
    );
    const temObservacoes = (forensic.exames?.observacoesDocumentacao?.trim() || '') !== '';
    const temPerinecroscopia = Object.values(forensic.exames?.perinecroscopia || {}).some(v =>
      typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) ? v.length > 0 : !!v
    );
    const eq = forensic.exames?.equipamentosExame || {};
    const temEquipamentos = Object.values(eq).some(v =>
      Array.isArray(v) ? v.length > 0 : !!v
    );

    const depoimentos = forensic.exames?.depoimentos || [];
    const temDepoimentos = Array.isArray(depoimentos) && depoimentos.some(d =>
      Object.values(d).some(v => typeof v === 'string' ? v.trim() !== '' : Array.isArray(v) ? v.length > 0 : !!v)
    );
    const temMateriais = (
      (Array.isArray(forensic.materiais?.selecionados) && forensic.materiais.selecionados.length > 0) ||
      (forensic.materiais?.outroDescricao?.trim() || '') !== ''
    );

    const ap = forensic.analisePreliminar || {};
    const imagensAnalise = Array.isArray(ap.arquivosReconhecimentoArea) ? ap.arquivosReconhecimentoArea : [];

    const temReconhecimentoArea = ap.reconhecimentoArea?.trim() !== '';
    const temCondicoesAmbientais = ap.condicoesAmbientais?.trim() !== '';
    const temCaracteristicasLocal = ap.caracteristicasLocal?.trim() !== '';
    const temLocalizacao = ap.localizacao?.address?.trim() !== '';
    const temImagens = imagensAnalise.length > 0;

    const temInformacoes = Array.isArray(ap.informacoes) && ap.informacoes.some(info =>
      (info.descricao?.trim() || '') !== '' || (info.observacao?.trim() || '') !== ''
    );

    const mostrarAnalisePreliminar =
      temReconhecimentoArea ||
      temCondicoesAmbientais ||
      temCaracteristicasLocal ||
      temLocalizacao ||
      temImagens ||
      temInformacoes;

    const aprs = forensic.risco?.aprs || [];

    let temResponsavel = false;
    let temMatricula = false;
    let temRiscoAcidente = false;
    let temRiscoFisico = false;
    let temRiscoBiologico = false;
    let temRiscoQuimico = false;
    let temGravidade = false;
    let temProbabilidade = false;
    let temMedidas = false;
    let temPeritoAuxiliar = false;
    let temTecnico = false;
    let temOutros = false;

    for (const item of aprs) {
      const risco = item.riscoAPR || {};
      const equipe = item || {};

      if (risco.peritoResponsavel?.trim()) temResponsavel = true;
      if (risco.peritoMatricula?.trim()) temMatricula = true;
      if (risco.riscoAcidente?.trim()) temRiscoAcidente = true;
      if (risco.riscoFisico?.trim()) temRiscoFisico = true;
      if (typeof risco.riscoBiologico === 'boolean') temRiscoBiologico = true;
      if (typeof risco.riscoQuimico === 'boolean') temRiscoQuimico = true;
      if (risco.gravidade?.trim()) temGravidade = true;
      if (risco.probabilidade?.trim()) temProbabilidade = true;
      if (risco.medidasMitigatoria?.trim()) temMedidas = true;

      const peritosAux = Array.isArray(equipe.peritoAuxiliar) ? equipe.peritoAuxiliar : [];
      const tecnicos = Array.isArray(equipe.tecnico) ? equipe.tecnico : [];
      const outros = Array.isArray(equipe.outros) ? equipe.outros : [];

      if (peritosAux.some(p => p.nome || p.matricula)) temPeritoAuxiliar = true;
      if (tecnicos.some(t => t.nome || t.matricula)) temTecnico = true;
      if (outros.some(o => o.nome || o.matricula)) temOutros = true;
    }

    const mostrarRiscos = (
      temResponsavel || temMatricula || temRiscoAcidente || temRiscoFisico ||
      temRiscoBiologico || temRiscoQuimico || temGravidade || temProbabilidade ||
      temMedidas || temPeritoAuxiliar || temTecnico || temOutros
    );


    const di = forensic.dadosIniciais || {};
    const equipeDi = forensic.equipePericial || [];

    const temPeritoResponsavel = di.peritoResponsavel?.trim() !== '';
    const temCargoPerito = di.cargoPerito?.trim() !== '';
    const temMatriculaPerito = di.matriculaPerito?.trim() !== '';
    const temDataHora = !!di.dataHora;
    const temTipoOcorrencia = di.tipoOcorrencia?.trim() !== '';
    const temAutoridadeNome = di.autoridadePolicialNome?.trim() !== '';
    const temAutoridade = di.autoridadePolicial?.trim() !== '';
    const temViatura = di.viatura?.trim() !== '';
    const temNumeroVitimas = !!di.numeroVitimas;
    const temCondicaoVitimas = di.condicaoVitimas?.trim() !== '';
    const temEndereco = typeof di.localizacao?.address === 'string' && di.localizacao.address.trim() !== '';


    const temEquipe = Array.isArray(equipeDi) && equipeDi.some(m => m.nome || m.matricula || m.cargo);

    const mostrarDadosIniciais =
      temPeritoResponsavel || temCargoPerito || temMatriculaPerito || temDataHora || temTipoOcorrencia ||
      temAutoridadeNome || temAutoridade || temViatura || temNumeroVitimas || temCondicaoVitimas ||
      temEndereco || temEquipe;


    function formatarData(rawData: any): string {
      if (rawData instanceof Date) {
        return rawData.toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (typeof rawData === 'object' && rawData?.seconds) {
        const parsed = new Date(rawData.seconds * 1000);
        return parsed.toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (typeof rawData === 'string' || typeof rawData === 'number') {
        const parsed = new Date(rawData);
        if (!isNaN(parsed.getTime())) {
          return parsed.toLocaleString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
      }
      return 'Data inválida';
    }

    function renderEquipamentoPDF(lista: any[], titulo: string) {
      if (!Array.isArray(lista)) return '';

      const itensValidos = lista.filter(item =>
        item.observacao?.trim() || (Array.isArray(item.arquivos) && item.arquivos.length > 0)
      );

      if (itensValidos.length === 0) return '';

      return `
    <div style="margin-bottom: 24px;">
      <h3>${titulo}</h3>
      ${itensValidos.map((item, idx) => {
        const imagens = Array.isArray(item.arquivos) && item.arquivos.length > 0
          ? item.arquivos.map((file: { arquivo: any; nome: any; }) => `
              <div style="display: inline-block; margin: 4px; text-align: center;">
                <img src="${file.arquivo}" alt="${file.nome}" style="width: 120px; height: auto; object-fit: contain; border: 1px solid #ccc; border-radius: 4px;" />
                <div style="font-size: 10px; max-width: 120px; overflow: hidden; text-overflow: ellipsis;">${file.nome}</div>
              </div>
            `).join('')
          : '';

        return `
          <div style="margin-bottom: 12px;">
            ${item.titulo ? `<p><strong>${idx + 1}. ${item.titulo}</strong></p>` : ''}
            ${item.observacao ? `<p>${item.observacao}</p>` : ''}
            ${imagens ? `<div style="image-item">${imagens}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
    }





    const html = `
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
          }
          h1, h2 {
            text-align: center;
          }
          .section {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 40px;
          }
          .label {
            font-weight: bold;
          }
          .image-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 12px;
            justify-content: center;
          }
          .image-item {
            width: calc(50% - 10px);
            text-align: center;
            page-break-inside: avoid;
          }
          .image-item img {
            width: 100%;
            max-height: 300px;
            object-fit: contain;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
          .image-item p {
            font-size: 12px;
            margin-top: 4px;
            color: #555;
          }
          .footer {
            text-align: right;
            font-size: 14px;
            margin-top: 40px;
          }
          .vestigio-block {
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Ficha de Análise Forense</h1>

        <div class="section">
          <h2>Responsável</h2>
          <p><span class="label">Usuário:</span> ${forensic.usuario}</p>
          <p><span class="label">Data:</span> ${new Date(forensic.dataCriacao).toLocaleDateString('pt-BR')}</p>
        </div>

        ${mostrarDadosIniciais ? `
  <div class="section">
    <h2>Dados Iniciais</h2>

    ${temPeritoResponsavel ? `<p><span class="label">Responsável:</span> ${di.peritoResponsavel}</p>` : ''}
    ${temCargoPerito ? `<p><span class="label">Cargo do Perito:</span> ${di.cargoPerito}</p>` : ''}
    ${temMatriculaPerito ? `<p><span class="label">Matrícula:</span> ${di.matriculaPerito}</p>` : ''}
    ${temDataHora ? `<p><span class="label">Data/Hora:</span> ${formatarData(di.dataHora)}</p>` : ''}
    ${temTipoOcorrencia ? `<p><span class="label">Tipo de Ocorrência:</span> ${di.tipoOcorrencia}</p>` : ''}
    ${temAutoridadeNome ? `<p><span class="label">Nome da Autoridade:</span> ${di.autoridadePolicialNome}</p>` : ''}
    ${temAutoridade ? `<p><span class="label">Autoridade Policial:</span> ${di.autoridadePolicial}</p>` : ''}
    ${temViatura ? `<p><span class="label">Viatura:</span> ${di.viatura}</p>` : ''}
    ${temNumeroVitimas ? `<p><span class="label">Número de Vítimas:</span> ${di.numeroVitimas}</p>` : ''}
    ${temCondicaoVitimas ? `<p><span class="label">Condição das Vítimas:</span> ${di.condicaoVitimas}</p>` : ''}

    ${temEndereco ? `<p><span class="label">Endereço:</span> ${di.localizacao?.address}</p>` : ''}
   

    ${temEquipe ? `
      <p><span class="label">Equipe Pericial:</span></p>
      <ul>
        ${equipeDi
            .map(m => (m.nome || m.matricula || m.cargo) ? `
            <li>
              ${m.nome ? `Nome: ${m.nome}` : ''}
              ${m.matricula ? ` | Matrícula: ${m.matricula}` : ''}
              ${m.cargo ? ` | Cargo: ${m.cargo}` : ''}
            </li>` : ''
            ).join('')}
      </ul>
    ` : ''}
  </div>
` : ''}

      

        ${mostrarAnalisePreliminar ? `
  <div class="section">
    <h2>Análise Preliminar do Local</h2>

    ${temReconhecimentoArea ? `
      <p><span class="label">Reconhecimento da área:</span> ${ap.reconhecimentoArea}</p>
    ` : ''}
    ${temImagens ? `
      <div class="image-grid">
        ${imagensAnalise.map(f => `
          <div class="image-item">
            <img src="${f.arquivo}" />
            <p>${f.nome}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${temCondicoesAmbientais ? `
      <p><span class="label">Condições Ambientais:</span> ${ap.condicoesAmbientais}</p>
    ` : ''}

    ${temCaracteristicasLocal ? `
      <p><span class="label">Características do Local:</span> ${ap.caracteristicasLocal}</p>
    ` : ''}

    ${temLocalizacao && ap.localizacao ? `
  <p><span class="label">Endereço:</span> ${ap.localizacao.address}</p>
  <p><span class="label">Latitude:</span> ${ap.localizacao.latitude}</p>
  <p><span class="label">Longitude:</span> ${ap.localizacao.longitude}</p>
` : ''}



    ${temInformacoes ? `
      <h3>Informações do Fato</h3>
      ${ap.informacoes.map((info, index) => {
              const hasDesc = info.descricao?.trim();
              const hasObs = info.observacao?.trim();
              if (!hasDesc && !hasObs) return '';
              return `
          ${hasDesc ? `<p><span class="label">Fato ${index + 1}:</span> ${info.descricao}</p>` : ''}
          ${hasObs ? `<p><span class="label">Observação:</span> ${info.observacao}</p>` : ''}
        `;
            }).join('')}
    ` : ''}

  </div>
` : ''}


      ${mostrarRiscos ? `
  <div class="section">
    <h2>Riscos</h2>

    ${aprs.map((item, index) => {
              const risco = item.riscoAPR || {};
              const equipe = item || {};

              const temResponsavel = risco.peritoResponsavel?.trim();
              const temMatricula = risco.peritoMatricula?.trim();
              const temRiscoAcidente = risco.riscoAcidente?.trim();
              const temRiscoFisico = risco.riscoFisico?.trim();
              const temRiscoBiologico = typeof risco.riscoBiologico === 'boolean';
              const temRiscoQuimico = typeof risco.riscoQuimico === 'boolean';
              const temGravidade = risco.gravidade?.trim();
              const temProbabilidade = risco.probabilidade?.trim();
              const temMedidas = risco.medidasMitigatoria?.trim();

              const peritosAux = Array.isArray(equipe.peritoAuxiliar) ? equipe.peritoAuxiliar : [];
              const tecnicos = Array.isArray(equipe.tecnico) ? equipe.tecnico : [];
              const outros = Array.isArray(equipe.outros) ? equipe.outros : [];

              const temPeritoAuxiliar = peritosAux.some(p => p.nome || p.matricula);
              const temTecnico = tecnicos.some(t => t.nome || t.matricula);
              const temOutros = outros.some(o => o.nome || o.matricula);

              if (
                !temResponsavel && !temMatricula && !temRiscoAcidente && !temRiscoFisico &&
                !temRiscoBiologico && !temRiscoQuimico && !temGravidade && !temProbabilidade &&
                !temMedidas && !temPeritoAuxiliar && !temTecnico && !temOutros
              ) {
                return '';
              }

              return `
        <div class="subsection">
          <h3>Risco ${index + 1}</h3>

          ${temResponsavel ? `<p><span class="label">Perito responsável:</span> ${risco.peritoResponsavel}</p>` : ''}
          ${temMatricula ? `<p><span class="label">Matrícula:</span> ${risco.peritoMatricula}</p>` : ''}

          ${temPeritoAuxiliar ? `
            <p><span class="label">Peritos Auxiliares:</span></p>
            <ul>
              ${peritosAux.map(p => (p.nome || p.matricula) ? `<li>${p.nome || ''} (${p.matricula || ''})</li>` : '').join('')}
            </ul>
          ` : ''}

          ${temTecnico ? `
            <p><span class="label">Técnicos:</span></p>
            <ul>
              ${tecnicos.map(t => (t.nome || t.matricula) ? `<li>${t.nome || ''} (${t.matricula || ''})</li>` : '').join('')}
            </ul>
          ` : ''}

          ${temOutros ? `
            <p><span class="label">Outros Envolvidos:</span></p>
            <ul>
              ${outros.map(o => (o.nome || o.matricula) ? `<li>${o.nome || ''} (${o.matricula || ''})</li>` : '').join('')}
            </ul>
          ` : ''}

          ${temRiscoAcidente ? `<p><span class="label">Risco Acidente:</span> ${risco.riscoAcidente}</p>` : ''}
          ${temRiscoFisico ? `<p><span class="label">Risco Físico:</span> ${risco.riscoFisico}</p>` : ''}
          ${temRiscoBiologico ? `<p><span class="label">Risco Biológico:</span> ${risco.riscoBiologico ? 'Sim' : 'Não'}</p>` : ''}
          ${temRiscoQuimico ? `<p><span class="label">Risco Químico:</span> ${risco.riscoQuimico ? 'Sim' : 'Não'}</p>` : ''}
          ${temGravidade ? `<p><span class="label">Gravidade:</span> ${risco.gravidade}</p>` : ''}
          ${temProbabilidade ? `<p><span class="label">Probabilidade:</span> ${risco.probabilidade}</p>` : ''}
          ${temMedidas ? `<p><span class="label">Medidas Mitigatórias:</span> ${risco.medidasMitigatoria}</p>` : ''}
        </div>
      `;
            }).join('')}
  </div>
` : ''}



        ${temMateriais ? `
  <div class="section">
    <h2>Materiais, EPI e EPC</h2>
    ${Array.isArray(forensic.materiais?.selecionados) && forensic.materiais.selecionados.length > 0
          ? forensic.materiais.selecionados.map(id => {
            const item = materials.flatMap(g => g.items).find(i => i.id === id);
            return `<p>• ${item?.label || 'Material desconhecido'}</p>`;
          }).join('')
          : ''
        }
    ${forensic.materiais?.outroDescricao
          ? `<p><span class="label">Outro:</span> ${forensic.materiais.outroDescricao}</p>`
          : ''
        }
  </div>
` : ''}


        ${temDocumentacao || temObservacoes || temPerinecroscopia || temEquipamentos || temDepoimentos ? `
          <div class="section">
            <h2>Exames</h2>
  
             ${temDocumentacao || temObservacoes ? `
              <div class="section">
              
              <h2>Documentação</h2>
              ${doc.projetos ? `<p><span class="label">Projetos:</span> ${doc.projetos}</p>` : ''}
              ${doc.memorialCalculo ? `<p><span class="label">Memorial de Cálculo:</span> ${doc.memorialCalculo}</p>` : ''}
              ${doc.licencaAlvara ? `<p><span class="label">Licença/Alvará:</span> ${doc.licencaAlvara}</p>` : ''}
              ${doc.art ? `<p><span class="label">ART:</span> ${doc.art}</p>` : ''}
              ${doc.planoManutencao ? `<p><span class="label">Plano de Manutenção:</span> ${doc.planoManutencao}</p>` : ''}
              ${doc.contratoManutencao ? `<p><span class="label">Contrato de Manutenção:</span> ${doc.contratoManutencao}</p>` : ''}
              ${doc.registroManutencao ? `<p><span class="label">Registro de Manutenção:</span> ${doc.registroManutencao}</p>` : ''}
              ${doc.relatorioRia ? `<p><span class="label">Relatório RIA:</span> ${doc.relatorioRia}</p>` : ''}
              ${doc.outro ? `<p><span class="label">Outro:</span> ${doc.outro}</p>` : ''}
                ${[
            { titulo: 'Projetos', arquivos: doc.projetosArquivos },
            { titulo: 'Memorial de Cálculo', arquivos: doc.memorialCalculoArquivos },
            { titulo: 'Licença/Alvará', arquivos: doc.licencaAlvaraArquivos },
            { titulo: 'ART', arquivos: doc.artArquivos },
            { titulo: 'Plano de Manutenção', arquivos: doc.planoManutencaoArquivos },
            { titulo: 'Contrato de Manutenção', arquivos: doc.contratoManutencaoArquivos },
            { titulo: 'Registro de Manutenção', arquivos: doc.registroManutencaoArquivos },
            { titulo: 'Relatório RIA', arquivos: doc.relatorioRiaArquivos },
            { titulo: 'Outro', arquivos: doc.outroArquivos },
          ]
            .filter(({ arquivos }) => Array.isArray(arquivos) && arquivos.length > 0)
            .map(({ titulo, arquivos }) => `
          <div>
            <p class="fonfont-size: 12px; margin-top: 10" >📎 ${titulo}:</p>
            <div class="image-grid">
              ${arquivos
                .filter(f => !!f.arquivo)
                .map(f => `
                  <div class="image-item">
                    <img src="${f.arquivo}" />
                    <p>${f.nome || 'Sem nome'}</p>
                  </div>
                `).join('')}
            </div>
          </div>
        `).join('')}
              </div>


      ${Array.isArray(forensic.exames.vestigiosDocumentacao) && forensic.exames.vestigiosDocumentacao.length > 0 ? `
  ${forensic.exames.vestigiosDocumentacao.map((vestigio, idx) => {
                  const dados = vestigio?.dadosCompletos;
                  const dp = dados?.dadosPreliminares || {};
                  const ac = dados?.acondicionamento || {};

                  const temDados =
                    dp.numeroVestigio || dp.naturezaVestigio || dp.unidadeOrigem || dp.procedimento || dp.descricaoDetalhada ||
                    ac.responsavelColeta || ac.matricula || ac.tipoAcondicionamento || ac.tipoAcondicionamentoOutros ||
                    (ac.localizacao?.address) ||
                    (Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0) ||
                    (Array.isArray(ac.arquivos) && ac.arquivos.length > 0);

                  if (!temDados) return '';

                  return `
      <div class="vestigio-block">
        <p><strong>Vestígio nº ${idx + 1} (Documentação)</strong></p>
        <p><strong>Dados preliminares</strong></p>
        ${dp.numeroVestigio ? `<p>• Nº ${dp.numeroVestigio}</p>` : ''}
        ${dp.naturezaVestigio ? `<p>• Natureza: ${dp.naturezaVestigio}</p>` : ''}
        ${dp.unidadeOrigem ? `<p>• Unidade de origem: ${dp.unidadeOrigem}</p>` : ''}
        ${dp.procedimento ? `<p>• Procedimento: ${dp.procedimento}</p>` : ''}
        ${dp.descricaoDetalhada ? `<p>• Descrição: ${dp.descricaoDetalhada}</p>` : ''}

        ${Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0 ? `
            <p class="label">📎 Arquivos da descrição:</p>
            <div class="image-grid">
              ${dp.descricaoDetalhadaArquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }

        <p><strong>Acondicionamento</strong></p>
        ${ac.responsavelColeta ? `<p>• Responsável: ${ac.responsavelColeta}</p>` : ''}
        ${ac.matricula ? `<p>• Matrícula: ${ac.matricula}</p>` : ''}
        ${ac.tipoAcondicionamento ? `<p>• Tipo: ${ac.tipoAcondicionamento}</p>` : ''}
        ${ac.tipoAcondicionamentoOutros ? `<p>• Outros: ${ac.tipoAcondicionamentoOutros}</p>` : ''}
        ${ac.localizacao?.address ? `<p>• Localização: ${ac.localizacao.address}, Lat: ${ac.localizacao.latitude}, Lng: ${ac.localizacao.longitude}</p>` : ''}

        ${Array.isArray(ac.arquivos) && ac.arquivos.length > 0 ? `
            <p class="label">📎 Arquivos do acondicionamento:</p>
            <div class="image-grid">
              ${ac.arquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }
      </div>
    `;
                }).join('')}
` : ''}
      ` : ''}

      ${temEquipamentos ? `
  <div class="section">
    <h2>Equipamentos</h2>

    ${renderEquipamentoPDF(eq.maquinaTracao, "Casa de Máquinas - Máquina de Tração")}
    ${renderEquipamentoPDF(eq.limitadorVelocidade, "Casa de Máquinas - Limitador de Velocidade")}
    ${renderEquipamentoPDF(eq.cabos, "Cabos")}
    ${renderEquipamentoPDF(eq.contrapeso, "Contrapeso")}
    ${renderEquipamentoPDF(eq.cabine, "Cabine")}
    ${renderEquipamentoPDF(eq.portas, "Portas")}
    ${renderEquipamentoPDF(eq.freiosEmergencia, "Freios de Emergência")}
    ${renderEquipamentoPDF(eq.sistemaControle, "Sistema de Controle")}
    ${renderEquipamentoPDF(eq.sistemaEletrico, "Sistema Elétrico")}
    ${renderEquipamentoPDF(eq.sensores, "Sensores")}
    ${renderEquipamentoPDF(eq.pocoElevador, "Poço do Elevador")}
  </div>
        ${Array.isArray(forensic.exames.vestigiosEquipamentos) && forensic.exames.vestigiosEquipamentos.length > 0 ? `
  ${forensic.exames.vestigiosEquipamentos.map((vestigio, idx) => {
                  const dados = vestigio?.dadosCompletos;
                  const dp = dados?.dadosPreliminares || {};
                  const ac = dados?.acondicionamento || {};

                  const temDados =
                    dp.numeroVestigio || dp.naturezaVestigio || dp.unidadeOrigem || dp.procedimento || dp.descricaoDetalhada ||
                    ac.responsavelColeta || ac.matricula || ac.tipoAcondicionamento || ac.tipoAcondicionamentoOutros ||
                    (ac.localizacao?.address) ||
                    (Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0) ||
                    (Array.isArray(ac.arquivos) && ac.arquivos.length > 0);

                  if (!temDados) return '';

                  return `
      <div class="vestigio-block">
        <p><strong>Vestígio nº ${idx + 1} (Equipamento)</strong></p>
        <p><strong>Dados preliminares</strong></p>
        ${dp.numeroVestigio ? `<p>• Nº ${dp.numeroVestigio}</p>` : ''}
        ${dp.naturezaVestigio ? `<p>• Natureza: ${dp.naturezaVestigio}</p>` : ''}
        ${dp.unidadeOrigem ? `<p>• Unidade de origem: ${dp.unidadeOrigem}</p>` : ''}
        ${dp.procedimento ? `<p>• Procedimento: ${dp.procedimento}</p>` : ''}
        ${dp.descricaoDetalhada ? `<p>• Descrição: ${dp.descricaoDetalhada}</p>` : ''}

        ${Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0 ? `
            <p class="label">📎 Arquivos da descrição:</p>
            <div class="image-grid">
              ${dp.descricaoDetalhadaArquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }

        <p><strong>Acondicionamento</strong></p>
        ${ac.responsavelColeta ? `<p>• Responsável: ${ac.responsavelColeta}</p>` : ''}
        ${ac.matricula ? `<p>• Matrícula: ${ac.matricula}</p>` : ''}
        ${ac.tipoAcondicionamento ? `<p>• Tipo: ${ac.tipoAcondicionamento}</p>` : ''}
        ${ac.tipoAcondicionamentoOutros ? `<p>• Outros: ${ac.tipoAcondicionamentoOutros}</p>` : ''}
        ${ac.localizacao?.address ? `<p>• Localização: ${ac.localizacao.address}, Lat: ${ac.localizacao.latitude}, Lng: ${ac.localizacao.longitude}</p>` : ''}

        ${Array.isArray(ac.arquivos) && ac.arquivos.length > 0 ? `
            <p class="label">📎 Arquivos do acondicionamento:</p>
            <div class="image-grid">
              ${ac.arquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }
      </div>
    `;
                }).join('')}
` : ''}


` : ''}



    ${temDepoimentos ? `

      <div class="section">
      <h3>Entrevistas</h3>
      ${depoimentos.map((dep, index) => `
        <div style="margin-bottom: 16px;">
          <h4>Entrevista ${index + 1}</h4>
          ${dep.dataHoraEntrevista ? `<p><span class="label">Data do registro:</span> ${formatarData(dep.dataHoraEntrevista)}</p>` : ''}
          ${dep.tipoEntrevistado ? `<p><span class="label">Categoria:</span> ${dep.tipoEntrevistado}</p>` : ''}
          ${dep.nomeEntrevistado ? `<p><span class="label">Nome:</span> ${dep.nomeEntrevistado}</p>` : ''}
          ${dep.identificacao ? `<p><span class="label">Identificação:</span> ${dep.identificacao}</p>` : ''}
          ${dep.endereco ? `<p><span class="label">Endereço:</span> ${dep.endereco}</p>` : ''}
          ${dep.idade ? `<p><span class="label">Idade:</span> ${dep.idade}</p>` : ''}
          ${dep.genero ? `<p><span class="label">Sexo:</span> ${dep.genero}</p>` : ''}
          ${dep.depoimentoRelato ? `<p><span class="label">Depoimento:</span> ${dep.depoimentoRelato}</p>` : ''}
          ${dep.descricaoLesoes ? `<p><span class="label">Descrição das lesões:</span> ${dep.descricaoLesoes}</p>` : ''}
    
          ${Array.isArray(dep.arquivoLesoes) && dep.arquivoLesoes.length > 0 ? `
            <div class="image-grid">
              ${dep.arquivoLesoes.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
      
      </div>

  ${Array.isArray(forensic.exames.vestigiosEntrevistas) && forensic.exames.vestigiosEntrevistas.length > 0 ? `
  ${forensic.exames.vestigiosEntrevistas.map((vestigio, idx) => {
                  const dados = vestigio?.dadosCompletos;
                  const dp = dados?.dadosPreliminares || {};
                  const ac = dados?.acondicionamento || {};

                  const temDados =
                    dp.numeroVestigio || dp.naturezaVestigio || dp.unidadeOrigem || dp.procedimento || dp.descricaoDetalhada ||
                    ac.responsavelColeta || ac.matricula || ac.tipoAcondicionamento || ac.tipoAcondicionamentoOutros ||
                    (ac.localizacao?.address) ||
                    (Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0) ||
                    (Array.isArray(ac.arquivos) && ac.arquivos.length > 0);

                  if (!temDados) return '';

                  return `
      <div class="vestigio-block">
        <p><strong>Vestígio nº ${idx + 1} (Entrevista) </strong></p>
        <p><strong>Dados preliminares</strong></p>
        ${dp.numeroVestigio ? `<p>• Nº ${dp.numeroVestigio}</p>` : ''}
        ${dp.naturezaVestigio ? `<p>• Natureza: ${dp.naturezaVestigio}</p>` : ''}
        ${dp.unidadeOrigem ? `<p>• Unidade de origem: ${dp.unidadeOrigem}</p>` : ''}
        ${dp.procedimento ? `<p>• Procedimento: ${dp.procedimento}</p>` : ''}
        ${dp.descricaoDetalhada ? `<p>• Descrição: ${dp.descricaoDetalhada}</p>` : ''}

        ${Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0 ? `
            <p class="label">📎 Arquivos da descrição:</p>
            <div class="image-grid">
              ${dp.descricaoDetalhadaArquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }

        <p><strong>Acondicionamento</strong></p>
        ${ac.responsavelColeta ? `<p>• Responsável: ${ac.responsavelColeta}</p>` : ''}
        ${ac.matricula ? `<p>• Matrícula: ${ac.matricula}</p>` : ''}
        ${ac.tipoAcondicionamento ? `<p>• Tipo: ${ac.tipoAcondicionamento}</p>` : ''}
        ${ac.tipoAcondicionamentoOutros ? `<p>• Outros: ${ac.tipoAcondicionamentoOutros}</p>` : ''}
        ${ac.localizacao?.address ? `<p>• Localização: ${ac.localizacao.address}, Lat: ${ac.localizacao.latitude}, Lng: ${ac.localizacao.longitude}</p>` : ''}

        ${Array.isArray(ac.arquivos) && ac.arquivos.length > 0 ? `
            <p class="label">📎 Arquivos do acondicionamento:</p>
            <div class="image-grid">
              ${ac.arquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }
      </div>
    `;
                }).join('')}
` : ''}


` : ''}



      ${temPerinecroscopia ? `

        <div class="section">
        <h3>Perinecroscopia</h3>
      
        ${forensic.exames.perinecroscopia?.dataHora ? `<p><span class="label">Data do registro:</span> ${formatarData(forensic.exames.perinecroscopia.dataHora)}</p>` : ''}
        ${forensic.exames.perinecroscopia?.cadaverSexo ? `<p><span class="label">Sexo:</span> ${forensic.exames.perinecroscopia.cadaverSexo}</p>` : ''}
        ${forensic.exames.perinecroscopia?.cadaverCorPele ? `<p><span class="label">Cor da Pele:</span> ${forensic.exames.perinecroscopia.cadaverCorPele}</p>` : ''}
        ${forensic.exames.perinecroscopia?.cadaverCabelo ? `<p><span class="label">Cabelo:</span> ${forensic.exames.perinecroscopia.cadaverCabelo}</p>` : ''}
        ${forensic.exames.perinecroscopia?.cadaverSinaisIdentificadores ? `<p><span class="label">Sinais identificadores:</span> ${forensic.exames.perinecroscopia.cadaverSinaisIdentificadores}</p>` : ''}
        ${forensic.exames.perinecroscopia?.cadaverDescricaoVestes ? `<p><span class="label">Descrição das vestes:</span> ${forensic.exames.perinecroscopia.cadaverDescricaoVestes}</p>` : ''}
        ${forensic.exames.perinecroscopia?.cadaverOutro ? `<p><span class="label">Outro:</span> ${forensic.exames.perinecroscopia.cadaverOutro}</p>` : ''}
      
        ${forensic.exames.perinecroscopia?.analiseDisposicaoCadaver || (forensic.exames.perinecroscopia?.arquivosDisposicaoCadaver?.length > 0) ? `
          <h4>Análise da disposição do cadáver</h4>
          ${forensic.exames.perinecroscopia.analiseDisposicaoCadaver ? `<p>${forensic.exames.perinecroscopia.analiseDisposicaoCadaver}</p>` : ''}
          ${forensic.exames.perinecroscopia.arquivosDisposicaoCadaver?.length > 0 ? `
            <div class="image-grid">
              ${forensic.exames.perinecroscopia.arquivosDisposicaoCadaver.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        ` : ''}
      
        ${forensic.exames.perinecroscopia?.sinaisTanatologicos || (forensic.exames.perinecroscopia?.arquivosTanatologicos?.length > 0) ? `
          <h4>Sinais tanatológicos</h4>
          ${forensic.exames.perinecroscopia.sinaisTanatologicos ? `<p>${forensic.exames.perinecroscopia.sinaisTanatologicos}</p>` : ''}
          ${forensic.exames.perinecroscopia.arquivosTanatologicos?.length > 0 ? `
            <div class="image-grid">
              ${forensic.exames.perinecroscopia.arquivosTanatologicos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        ` : ''}
      
        ${forensic.exames.perinecroscopia?.descricaoLesoesCadaver || (forensic.exames.perinecroscopia?.arquivosLesoesCadaver?.length > 0) ? `
          <h4>Descrição das lesões</h4>
          ${forensic.exames.perinecroscopia.descricaoLesoesCadaver ? `<p>${forensic.exames.perinecroscopia.descricaoLesoesCadaver}</p>` : ''}
          ${forensic.exames.perinecroscopia.arquivosLesoesCadaver?.length > 0 ? `
            <div class="image-grid">
              ${forensic.exames.perinecroscopia.arquivosLesoesCadaver.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        ` : ''}
      ` : ''}
        
        </div>

${Array.isArray(forensic.exames.vestigiosPerinecroscopia) && forensic.exames.vestigiosPerinecroscopia.length > 0 ? `
  ${forensic.exames.vestigiosPerinecroscopia.map((vestigio, idx) => {
                  const dados = vestigio?.dadosCompletos;
                  const dp = dados?.dadosPreliminares || {};
                  const ac = dados?.acondicionamento || {};

                  const temDados =
                    dp.numeroVestigio || dp.naturezaVestigio || dp.unidadeOrigem || dp.procedimento || dp.descricaoDetalhada ||
                    ac.responsavelColeta || ac.matricula || ac.tipoAcondicionamento || ac.tipoAcondicionamentoOutros ||
                    (ac.localizacao?.address) ||
                    (Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0) ||
                    (Array.isArray(ac.arquivos) && ac.arquivos.length > 0);

                  if (!temDados) return '';

                  return `
      <div class="vestigio-block">
        <p><strong>Vestígio nº ${idx + 1} (Perinecroscopia) </strong></p>
        <p><strong>Dados preliminares</strong></p>
        ${dp.numeroVestigio ? `<p>• Nº ${dp.numeroVestigio}</p>` : ''}
        ${dp.naturezaVestigio ? `<p>• Natureza: ${dp.naturezaVestigio}</p>` : ''}
        ${dp.unidadeOrigem ? `<p>• Unidade de origem: ${dp.unidadeOrigem}</p>` : ''}
        ${dp.procedimento ? `<p>• Procedimento: ${dp.procedimento}</p>` : ''}
        ${dp.descricaoDetalhada ? `<p>• Descrição: ${dp.descricaoDetalhada}</p>` : ''}

        ${Array.isArray(dp.descricaoDetalhadaArquivos) && dp.descricaoDetalhadaArquivos.length > 0 ? `
            <p class="label">📎 Arquivos da descrição:</p>
            <div class="image-grid">
              ${dp.descricaoDetalhadaArquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }

        <p><strong>Acondicionamento</strong></p>
        ${ac.responsavelColeta ? `<p>• Responsável: ${ac.responsavelColeta}</p>` : ''}
        ${ac.matricula ? `<p>• Matrícula: ${ac.matricula}</p>` : ''}
        ${ac.tipoAcondicionamento ? `<p>• Tipo: ${ac.tipoAcondicionamento}</p>` : ''}
        ${ac.tipoAcondicionamentoOutros ? `<p>• Outros: ${ac.tipoAcondicionamentoOutros}</p>` : ''}
        ${ac.localizacao?.address ? `<p>• Localização: ${ac.localizacao.address}, Lat: ${ac.localizacao.latitude}, Lng: ${ac.localizacao.longitude}</p>` : ''}

        ${Array.isArray(ac.arquivos) && ac.arquivos.length > 0 ? `
            <p class="label">📎 Arquivos do acondicionamento:</p>
            <div class="image-grid">
              ${ac.arquivos.map(file => `
                <div class="image-item">
                  <img src="${file.arquivo}" />
                  <p>${file.nome}</p>
                </div>
              `).join('')}
            </div>
          ` : ''
                    }
      </div>
    `;
                }).join('')}
` : ''}

      
  


  
          </div>
          
          ` : ''}

        <div class="footer">
          Documento gerado em: ${dataHoraAtual}
        </div>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error('Erro ao gerar PDF da análise forense:', error);
  }
}