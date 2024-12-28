const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event, context) {
  const tempJsonFilePath = '/tmp/data.json'; // Percorso nel file system temporaneo

  if (event.httpMethod === 'POST') {
    // Estrai il nuovo utente dal body della richiesta
    const newUser = JSON.parse(event.body);

    try {
      // Prima copiamo il file "data.json" dalla cartella "public" a "/tmp"
      const publicJsonFilePath = path.join(__dirname, '../public/data.json');
      const data = await fs.readFile(publicJsonFilePath, 'utf8');
      const currentData = JSON.parse(data);

      // Aggiungi il nuovo utente
      currentData.Users.push(newUser);

      // Scrivi i dati aggiornati nel file temporaneo
      await fs.writeFile(tempJsonFilePath, JSON.stringify(currentData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Nuovo utente aggiunto', newUser }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nella scrittura del file', details: err.message }),
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Metodo non supportato' }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };
};
