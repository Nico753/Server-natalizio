const fs = require('fs');
const path = require('path');

// Percorso al file JSON che si trova nella cartella 'public'
const jsonFilePath = path.join(__dirname, '../public/data.json');

exports.handler = async function(event, context) {
  try {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const currentData = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(currentData)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nella lettura del file' })
    };
  }
};
