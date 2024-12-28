exports.handler = async function(event) {
  try {
    // Usa il percorso relativo per il file statico, che è disponibile pubblicamente
    const data = await fetch('https://yoursite.netlify.app/data.json');
    const currentData = await data.json();

    return {
      statusCode: 200,
      body: JSON.stringify(currentData)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nel recuperare il file', details: err.message })
    };
  }
};
