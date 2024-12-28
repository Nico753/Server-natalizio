const fs = require('fs');
const path = require('path');

// Percorso al file JSON che si trova nella cartella 'public'
const jsonFilePath = path.join(__dirname, '../public/data.json');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    const newUser = JSON.parse(event.body); // Ottieni i dati del nuovo utente

    try {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      const currentData = JSON.parse(data);

      // Aggiungi il nuovo utente
      currentData.Users.push(newUser);

      // Scrivi i dati aggiornati nel file JSON
      fs.writeFileSync(jsonFilePath, JSON.stringify(currentData, null, 2), 'utf8');

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Nuovo utente aggiunto', newUser })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nella scrittura del file' })
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Metodo non supportato' })
  };
};

