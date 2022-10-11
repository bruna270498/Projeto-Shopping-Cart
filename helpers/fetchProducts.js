const fetchProducts = async (query) => {
  // seu código aqui
  try {
    const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const resultado = await resposta.json();
    return resultado;
  } catch (error) {
    return error;
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
