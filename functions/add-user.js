const fs = require('fs').promises;
const path = require('path');

// Percorso al file JSON
const jsonFilePath = path.join(__dirname, '../public/data.json');

exports.handler = async function(event) {
  if (event.httpMethod === 'POST') {
    const newUser = JSON.parse(event.body);

    try {
      const data = await fs.readFile(jsonFilePath, 'utf8');
      const currentData = JSON.parse(data);

      // Controlla se l'utente esiste già
      const userExists = currentData.Users.some(u => u.email === newUser.email);
      if (userExists) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Utente già esistente' })
        };
      }

      // Aggiungi il nuovo utente
      currentData.Users.push(newUser);

      // Scrivi i dati aggiornati nel file JSON
      await fs.writeFile(jsonFilePath, JSON.stringify(currentData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Nuovo utente aggiunto', newUser })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nella scrittura del file', details: err.message })
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Metodo non supportato' })
  };
};
