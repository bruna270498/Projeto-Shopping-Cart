const fetchProducts = async (query) => {
  // seu código aqui
  try {
    const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const resultado = await resposta.json();
    return resultado;
  } catch (error) {
    throw new Error('You must provide an url');
  }
 };
// console.log(fetchProducts('computador'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
