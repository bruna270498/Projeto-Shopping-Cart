const fetchItem = async (query) => {
  // seu código aqui
  try {
    const resposta = await fetch(`https://api.mercadolibre.com/items/${query}`);
    const resultado = await resposta.json();
    return resultado;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
