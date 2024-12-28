const fs = require('fs').promises;
const path = require('path');

// Percorso al file JSON
const jsonFilePath = path.join(__dirname, '../public/data.json');

exports.handler = async function(event) {
  if (event.httpMethod === 'POST') {
    const userId = event.queryStringParameters.userId;
    const product = JSON.parse(event.body);

    try {
      const data = await fs.readFile(jsonFilePath, 'utf8');
      const currentData = JSON.parse(data);

      // Trova l'utente
      const user = currentData.Users.find(u => u.id === userId);
      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Utente non trovato' })
        };
      }

      // Aggiungi il prodotto al carrello
      user.shoppingCart.push(product);

      // Scrivi i dati aggiornati nel file JSON
      await fs.writeFile(jsonFilePath, JSON.stringify(currentData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Prodotto aggiunto al carrello', shoppingCart: user.shoppingCart })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nella lettura o scrittura del file', details: err.message })
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Metodo non supportato' })
  };
};

