const saveCartItems = (cartItem) => {
  // seu código aqui
  localStorage.setItem('cartItem', cartItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
