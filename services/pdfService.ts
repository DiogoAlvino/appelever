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
          margin-bottom: 50px;
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

    const imagensAnalise = forensic.analisePreliminar?.arquivosReconhecimentoArea || [];
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
        </style>
      </head>
      <body>
        <h1>Ficha de Análise Forense</h1>

        <div class="section">
          <h2>Responsável</h2>
          <p><span class="label">Usuário:</span> ${forensic.usuario}</p>
          <p><span class="label">Data:</span> ${new Date(forensic.dataCriacao).toLocaleDateString('pt-BR')}</p>
        </div>

        <div class="section">
          <h2>Dados Iniciais</h2>
          <p><span class="label">Autoridade Policial:</span> ${forensic.dadosIniciais?.autoridadePolicial}</p>
          <p><span class="label">Nome da Autoridade:</span> ${forensic.dadosIniciais?.autoridadePolicialNome}</p>
          <p><span class="label">Cargo do Perito:</span> ${forensic.dadosIniciais?.cargoPerito}</p>
          <p><span class="label">Condição das Vítimas:</span> ${forensic.dadosIniciais?.condicaoVitimas}</p>
          <p><span class="label">Data/Hora:</span> ${new Date(forensic.dadosIniciais?.dataHora).toLocaleString('pt-BR')}</p>
          <p><span class="label">Matrícula:</span> ${forensic.dadosIniciais?.matriculaPerito}</p>
          <p><span class="label">Número de Vítimas:</span> ${forensic.dadosIniciais?.numeroVitimas}</p>
          <p><span class="label">Responsável:</span> ${forensic.dadosIniciais?.peritoResponsavel}</p>
          <p><span class="label">Tipo de Ocorrência:</span> ${forensic.dadosIniciais?.tipoOcorrencia}</p>
          <p><span class="label">Viatura:</span> ${forensic.dadosIniciais?.viatura}</p>
          <p><span class="label">Endereço:</span> ${forensic.dadosIniciais?.localizacao?.address}</p>
          <p><span class="label">Latitude:</span> ${forensic.dadosIniciais?.localizacao?.latitude}</p>
          <p><span class="label">Longitude:</span> ${forensic.dadosIniciais?.localizacao?.longitude}</p>
        </div>

        <div class="section">
          <h2>Equipe Pericial</h2>
          ${forensic.equipePericial?.map(p => `
            <p><span class="label">Nome:</span> ${p.nome}, <span class="label">Cargo:</span> ${p.cargo}, <span class="label">Matrícula:</span> ${p.matricula}</p>
          `).join('') || '<p>Nenhum membro registrado.</p>'}
        </div>

        <div class="section">
          <h2>Análise Preliminar</h2>
          <p><span class="label">Reconhecimento da área:</span> ${forensic.analisePreliminar?.reconhecimentoArea}</p>
          <p><span class="label">Condições Ambientais:</span> ${forensic.analisePreliminar?.condicoesAmbientais}</p>
          <p><span class="label">Características do Local:</span> ${forensic.analisePreliminar?.caracteristicasLocal}</p>
          ${imagensAnalise.length > 0 ? `
            <div class="image-grid">
              ${imagensAnalise.map(f => `
                <div class="image-item">
                  <img src="${f.arquivo}" />
                  <p>${f.nome}</p>
                </div>
              `).join('')}
            </div>` : ''}
        </div>

        <div class="section">
          <h2>Riscos</h2>
          <p><span class="label">Risco Acidente:</span> ${forensic.risco?.riscoAPR?.riscoAcidente}</p>
          <p><span class="label">Biológico:</span> ${forensic.risco?.riscoAPR?.riscoBiologico ? 'Sim' : 'Não'}</p>
          <p><span class="label">Físico:</span> ${forensic.risco?.riscoAPR?.riscoFisico}</p>
          <p><span class="label">Químico:</span> ${forensic.risco?.riscoAPR?.riscoQuimico ? 'Sim' : 'Não'}</p>
          <p><span class="label">Gravidade:</span> ${forensic.risco?.riscoAPR?.gravidade}</p>
          <p><span class="label">Probabilidade:</span> ${forensic.risco?.riscoAPR?.probabilidade}</p>
          <p><span class="label">Medidas Mitigatórias:</span> ${forensic.risco?.riscoAPR?.medidasMitigatoria}</p>
        </div>

        <div class="section">
          <h2>Materiais, EPI e EPC</h2>
          ${Array.isArray(forensic.materiais?.selecionados) && forensic.materiais.selecionados.length > 0
        ? forensic.materiais.selecionados.map(id => {
          const item = materials.flatMap(g => g.items).find(i => i.id === id);
          return `<p>• ${item?.label || 'Material desconhecido'}</p>`;
        }).join('')
        : '<p>Nenhum material selecionado.</p>'}

        </div>

        <div class="section">
          <h2>Exames - Documentação</h2>
          <p><span class="label">Projetos:</span> ${forensic.exames?.documentacao?.projetos}</p>
          <p><span class="label">Memorial de Cálculo:</span> ${forensic.exames?.documentacao?.memorialCalculo}</p>
          <p><span class="label">Licença/Alvará:</span> ${forensic.exames?.documentacao?.licencaAlvara}</p>
          <p><span class="label">ART:</span> ${forensic.exames?.documentacao?.art}</p>
          <p><span class="label">Plano de Manutenção:</span> ${forensic.exames?.documentacao?.planoManutencao}</p>
          <p><span class="label">Contrato de Manutenção:</span> ${forensic.exames?.documentacao?.contratoManutencao}</p>
          <p><span class="label">Registro de Manutenção:</span> ${forensic.exames?.documentacao?.registroManutencao}</p>
          <p><span class="label">Relatório RIA:</span> ${forensic.exames?.documentacao?.relatorioRia}</p>
          <p><span class="label">Outro:</span> ${forensic.exames?.documentacao?.outro}</p>
          <p><span class="label">Observações:</span> ${forensic.exames?.observacoesDocumentacao}</p>

          ${[
        { titulo: 'Projetos', arquivos: forensic.exames?.documentacao?.projetosArquivos },
        { titulo: 'Memorial de Cálculo', arquivos: forensic.exames?.documentacao?.memorialCalculoArquivos },
        { titulo: 'Licença/Alvará', arquivos: forensic.exames?.documentacao?.licencaAlvaraArquivos },
        { titulo: 'ART', arquivos: forensic.exames?.documentacao?.artArquivos },
        { titulo: 'Plano de Manutenção', arquivos: forensic.exames?.documentacao?.planoManutencaoArquivos },
        { titulo: 'Contrato de Manutenção', arquivos: forensic.exames?.documentacao?.contratoManutencaoArquivos },
        { titulo: 'Registro de Manutenção', arquivos: forensic.exames?.documentacao?.registroManutencaoArquivos },
        { titulo: 'Relatório RIA', arquivos: forensic.exames?.documentacao?.relatorioRiaArquivos },
        { titulo: 'Outro', arquivos: forensic.exames?.documentacao?.outroArquivos },
      ].map(({ titulo, arquivos }) => (
        arquivos?.length > 0 ? `
    <div>
      <p class="label">📎 ${titulo}:</p>
      <div class="image-grid">
        ${arquivos.map(f => `
          <div class="image-item">
            <img src="${f.arquivo}" />
            <p>${f.nome}</p>
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''
      )).join('')}

        </div>

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