const fetchItem = async (ItemID) => {
  // seu código aqui
  try {
    const resposta = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
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
