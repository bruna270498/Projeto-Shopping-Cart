const getSavedCartItems = (card) => {
  // seu código aqui
  localStorage.getItem(card);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
