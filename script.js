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
const cartItemClickListener = (event) => {
 return event.target.remove();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: R$${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const selecionarCarrinho = async ({ target }) => {
  console.log(target);
  const carrinho = document.querySelector('.cart__items');
  const produto = target.parentNode.firstChild.innerHTML;
  const item = await fetchItem(produto);
  const { id, title, price } = item;
  carrinho.appendChild(createCartItemElement({ id, title, price }));
};
window.onload = async () => {
  await percorreProduto();
  const botao = document.querySelectorAll('.item__add');
  botao.forEach((e) => e.addEventListener('click', selecionarCarrinho));
 };
