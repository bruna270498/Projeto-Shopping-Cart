const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};
const percorreProduto = async () => {
 const sectionPai = document.querySelector('.items');
  const response = await fetchProducts('computador');
  const produtos = response.results;
  produtos.forEach((produto) => {
    sectionPai.appendChild(createProductItemElement(produto));
  });
};

const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const cartItemClickListener = (event) => event.target.remove();

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: R$${price}`;
  li.price = price;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const carrinho = document.querySelector('.cart__items');

const soma = () => {
  const elementoTotal = document.querySelector('.total-price');
  const k = document.querySelectorAll('.cart__item');
  let total = 0;
  k.forEach(({ price }) => {
    total += price;
  });
  elementoTotal.innerText = `R$${total.toLocaleString('pt-br')}`;
};

const o = () => {
  const l = document.querySelector('.cart__items');
  console.log(l.deleted());
};

const selecionarCarrinho = async ({ target }) => {
  const produto = target.parentNode.firstChild.innerHTML;
  const item = await fetchItem(produto);
  const { id, title, price } = item;
  const lista = createCartItemElement({ id, title, price });
  let localStorageCartItems;
  carrinho.appendChild(lista);
  if (localStorage.cartItems) {
    localStorageCartItems = JSON.parse(getSavedCartItems());
    localStorageCartItems.push({ texto: lista.innerText, price });
    saveCartItems(JSON.stringify(localStorageCartItems));
    soma();
    return;
  }
  saveCartItems(JSON.stringify([{ texto: lista.innerText, price }]));
  l();
};
const y = () => {
  const l = document.querySelector('.empty-cart');
  l.addEventListener('click', o);
};
window.onload = async () => {
  await percorreProduto();
  const botao = document.querySelectorAll('.item__add');
  botao.forEach((e) => e.addEventListener('click', selecionarCarrinho));
  if (localStorage.cartItems) {
    const retorno = JSON.parse(localStorage.cartItems);
    retorno.forEach((e) => {
      const criaElemento = createCustomElement('li', 'cart__item', e.texto);
      criaElemento.addEventListener('click', cartItemClickListener);
      carrinho.appendChild(criaElemento);
    });
  }
  y();
 };
