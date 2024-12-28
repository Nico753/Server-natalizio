// netlify/functions/data.js

exports.handler = async function(event, context) {
  try {
    const data = { message: 'Dati caricati con successo' };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',  // Permetti tutte le origini
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore interno', details: err.message }),
      headers: {
        'Access-Control-Allow-Origin': '*',  // Permetti tutte le origini anche in caso di errore
      }
    };
  }
};
