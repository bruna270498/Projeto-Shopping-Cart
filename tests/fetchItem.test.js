require('../mocks/fetchSimulator');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Testando se é uma função', () => {
    expect(typeof fetchItem).toEqual('function')
  });
  it('Verificar se a fetch foi chamada', async () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verificar se o fetch está usando essa URL  https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  });
  it('Verificar se me retorna um objeto', async () => {
    const itensObj = await fetchItem('MLB1615760527');
    expect(itensObj).toEqual(item)
  });
  it('testando se chamar a função sem argumento retorne um erro', () => {
    expect(fetchItem()).rejects.toThrow('You must provide an url');
  })
});
