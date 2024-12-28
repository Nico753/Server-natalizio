const fs = require('fs').promises;
const path = require('path');

// Percorso al file JSON
const jsonFilePath = path.join(__dirname, '../public/data.json');

exports.handler = async function(event) {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const currentData = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(currentData)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nella lettura del file', details: err.message })
    };
  }
};
