exports.handler = async function(event, context) {
  try {
    // Fai una richiesta HTTP per ottenere il contenuto di data.json
    const response = await fetch('https://json-server-natale.netlify.app/data.json');
    
    // Verifica che la richiesta sia andata a buon fine
    if (!response.ok) {
      throw new Error(`Errore nel recuperare il file: ${response.statusText}`);
    }

    // Estrai i dati JSON dalla risposta
    const data = await response.json();

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
