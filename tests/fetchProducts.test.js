require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('testando se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  });
  it('testando se a fetch foi chamada', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verificar se o fetch está usando essa URL https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });
  it('Verificar se me retorna um objeto', async () => {
    const produtosObj = fetchProducts('computador').then((o) => o);
    expect(produtosObj).toBe(computadorSearch)
  })
});
