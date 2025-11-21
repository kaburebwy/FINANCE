const fs = require('fs');
const pdf = require('pdf-parse');
async function parseInvoice(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  const text = data.text;
  const amountMatch = text.match(/(?:Total\s*[:\-]?\s*R\$|Total\s*[:\-]?\s*)([0-9\.,]+)/i);
  const dateMatch = text.match(/(\d{2}\/\d{2}\/\d{4})/);
  const amount = amountMatch ? parseFloat(amountMatch[1].replace(/\./g,'').replace(',', '.')) : null;
  const date = dateMatch ? dateMatch[1].split('/').reverse().join('-') : null;
  return { amount, date, rawTextSnippet: text.slice(0, 200) };
}
module.exports = { parseInvoice };
