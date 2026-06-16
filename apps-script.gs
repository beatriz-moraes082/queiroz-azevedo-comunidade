/**
 * Comunidade de Corretores — Queiroz Azevedo
 * Recebe as pré-inscrições da landing page e grava uma linha na planilha.
 *
 * COMO INSTALAR (5 minutos):
 *  1. Crie uma planilha no Google Sheets (ex.: "Pré-inscrições — Corretores").
 *  2. No menu da planilha: Extensões > Apps Script.
 *  3. Apague o conteúdo padrão e cole TODO este arquivo.
 *  4. Clique em Salvar (ícone de disquete).
 *  5. Clique em Implantar > Nova implantação.
 *       - Tipo: "App da Web"
 *       - Executar como: Eu mesmo
 *       - Quem pode acessar: "Qualquer pessoa"
 *  6. Autorize quando pedir (sua conta Google).
 *  7. Copie a URL gerada (termina em /exec) e cole no index.html,
 *     na variável GOOGLE_SCRIPT_URL.
 *
 * Pronto. Cada envio do formulário vira uma linha na planilha.
 * (Para alterar o código depois, use Implantar > Gerenciar implantações > editar.)
 */

var CABECALHO = [
  'Data/Hora', 'Nome', 'WhatsApp', 'Instagram', 'Cidade', 'CRECI',
  'Atua na região', 'Origem'
];

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // garante o cabeçalho na primeira vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(CABECALHO);
      sheet.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
    }

    var p = (e && e.parameter) ? e.parameter : {};
    var agora = Utilities.formatDate(new Date(), 'America/Maceio', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      agora,
      p.nome      || '',
      p.whats     || '',
      p.instagram || '',
      p.cidade    || '',
      p.creci     || '',
      p.perfil    || '',
      p.origem    || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// permite abrir a URL no navegador só para testar se está no ar
function doGet() {
  return ContentService.createTextOutput('Endpoint ativo — Comunidade de Corretores.');
}
