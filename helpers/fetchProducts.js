const fetchProducts = async (query) => {
  // seu código aqui
  if (!query || query !== 'computador') {
    throw new Error('You must provide an url');
  }
    const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const resultado = await resposta.json();
    return resultado;
};
// console.log(fetchProducts('computador'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
