const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,  // Usa la chiave segreta
});

exports.handler = async function(event) {
  if (event.httpMethod === 'POST') {
    const newUser = JSON.parse(event.body);

    try {
      // Aggiungi il nuovo utente alla collezione "Users"
      const result = await client.query(
        q.Create(
          q.Collection('Users'),  // Nome della collezione in FaunaDB
          { data: newUser }  // Dati dell'utente da aggiungere
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Nuovo utente aggiunto', newUser }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nel salvataggio nel database', details: err.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Metodo non supportato' }),
  };
};
