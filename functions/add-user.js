const fs = require('fs').promises;
const path = require('path');

// Percorso al file JSON
const jsonFilePath = path.join(__dirname, '../public/data.json');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    // Estrai il nuovo utente dal body della richiesta
    const newUser = JSON.parse(event.body);  // Supponiamo che tu invii l'utente come JSON

    try {
      // Leggi il file esistente
      const data = await fs.readFile(jsonFilePath, 'utf8');
      const currentData = JSON.parse(data);

      // Aggiungi il nuovo utente
      currentData.Users.push(newUser);

      // Scrivi i dati aggiornati nel file JSON
      await fs.writeFile(jsonFilePath, JSON.stringify(currentData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Nuovo utente aggiunto', newUser }),
        headers: {
          'Access-Control-Allow-Origin': '*',  // Permetti tutte le origini
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nella scrittura del file', details: err.message }),
        headers: {
          'Access-Control-Allow-Origin': '*',  // Permetti tutte le origini anche in caso di errore
        }
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Metodo non supportato' }),
    headers: {
      'Access-Control-Allow-Origin': '*',  // Permetti tutte le origini anche in caso di errore
    }
  };
};
