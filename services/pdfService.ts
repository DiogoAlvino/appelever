import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { EquipmentModel } from '~/models/equipmentModel';
import { InspectionModel } from '~/models/inspectionModel';

export async function generatePDFWithHTML(
  inspection: InspectionModel,
  equipment: EquipmentModel
) {
  try {
    const dataHoraAtual = new Date().toLocaleString('pt-BR');

    const htmlContent = `
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #333;
        }
        h1, h2 {
          text-align: center;
        }
        .section {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          page-break-inside: avoid;
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
          font-size: 12px;
          color: #555;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <h1>Ficha de Inspeção</h1>

      <div class="section">
        <h2>Dados do Equipamento</h2>
        <p><span class="label">Identificação:</span> ${equipment?.detalhes_equipamento?.identificacaoEquipamento || 'N/A'}</p>
        <p><span class="label">ID:</span> ${equipment?.id}</p>
        <p><span class="label">Local:</span> ${equipment?.local?.edificacao || 'N/A'}</p>
        <p><span class="label">Endereço:</span> ${equipment?.local?.logradouro}, ${equipment?.local?.numero} - ${equipment?.local?.bairro}</p>
        <p><span class="label">Responsável Técnico:</span> ${equipment?.responsavel?.nome} - ${equipment?.responsavel?.funcao}</p>
        <p><span class="label">Contato:</span> ${equipment?.responsavel?.telefone} - ${equipment?.responsavel?.email}</p>
        <p><span class="label">Data de Instalação:</span> ${new Date(equipment?.detalhes_equipamento?.dataInstalacao).toLocaleDateString('pt-BR')}</p>
        <p><span class="label">Fabricante:</span> ${equipment?.detalhes_equipamento?.fabricante}</p>
        <p><span class="label">CNPJ:</span> ${equipment?.detalhes_equipamento?.cnpj}</p>
        <p><span class="label">Modelo:</span> ${equipment?.detalhes_equipamento?.modelo}</p>
        <p><span class="label">Capacidade:</span> ${equipment?.detalhes_equipamento?.capacidadeNominal} kg</p>
        <p><span class="label">Tipo de uso:</span> ${equipment?.detalhes_equipamento?.tipoDeUso}</p>
        <p><span class="label">Nº Paradas:</span> ${equipment?.detalhes_equipamento?.numeroDeParadas}</p>
        <p><span class="label">Casa de Máquinas:</span> ${equipment?.detalhes_equipamento?.casaDeMaquinas ? 'Sim' : 'Não'}</p>
        <p><span class="label">Empresa Conservadora:</span> ${equipment?.empresa_conservadora?.razaoSocial} (${equipment?.empresa_conservadora?.cnpj})</p>
      </div>

      ${equipment?.uploads?.filter(u => u.arquivo).map(file => `
        <h2 style="page-break-before: always;">Imagem do Equipamento: ${file.nome}</h2>
        <img src="${file.arquivo}" class="full-image" />
      `).join('')}

      <div class="section">
        <h2>Dados da Inspeção</h2>
        <p><span class="label">Responsável:</span> ${inspection?.usuario}</p>
        <p><span class="label">Data:</span> ${new Date(inspection?.dataCriacao).toLocaleDateString('pt-BR')}</p>
      </div>

      <div class="section">
        <h2>Itens Verificados</h2>
        ${Object.entries(inspection.answers).map(([id, q]) => `
          <div class="item">
            <p><span class="label">Item:</span> ${id}</p>
            <p><span class="label">Resposta:</span> ${q.answer?.toUpperCase()}</p>
            <p><span class="label">Prioridade:</span> ${q.priority}</p>
            <p><span class="label">Verificação:</span> ${q.verification}</p>
          </div>
        `).join('')}
      </div>

      ${Object.entries(inspection.answers).flatMap(([id, q]) =>
        Array.isArray(q.uploads) && q.uploads.length > 0
          ? q.uploads
              .filter(file => !!file.arquivo && typeof file.arquivo === 'string')
              .map(file => `
                <h2 style="page-break-before: always;">Imagem do Item ${id}: ${file.nome}</h2>
                <img src="${file.arquivo}" class="full-image" />
              `)
          : []
      ).join('')}

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
