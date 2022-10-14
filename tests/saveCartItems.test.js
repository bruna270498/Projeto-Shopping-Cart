const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, passa a função com  cartItem, o método localStorage.setItem é chamado;', () => {
    saveCartItems('cartItem')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1) 
  });
  it('Testando se ao chamar a função, me retorna o localStorage com a chave e valor', () => {
    saveCartItems('cartItem')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', 'cartItem')
  });
});
