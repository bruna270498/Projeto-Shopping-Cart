const carrinho = document.querySelector('.cart__items');

const carrega = (pai) => {
  const carregando = document.createElement('h4');
  carregando.className = 'loading';
  carregando.innerText = 'carregando...';
  pai.appendChild(carregando);
};

const carregado = (pai) => {
   const o = pai.querySelector('.loading');
   pai.removeChild(o);
};

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
  carrega(sectionPai);
  const response = await fetchProducts('computador');
  carregado(sectionPai);
  const produtos = response.results;
  produtos.forEach((produto) => {
    sectionPai.appendChild(createProductItemElement(produto));
  });
};

const soma = () => {
  const elementoTotal = document.querySelector('.total-price');
  const k = document.querySelectorAll('.cart__item');
  let total = 0;
  k.forEach(({ price }) => {
    total += price;
  });
  elementoTotal.innerText = `TOTAL: R$${total}`;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  soma();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  // const img = document.createElement('img');
  // img.src = thumbnail;
  // li.appendChild(img);
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.price = price;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const selecionarCarrinho = async ({ target }) => {
  carrega(carrinho);
  const produto = target.parentNode.firstChild.innerHTML;
  const item = await fetchItem(produto);
  const { id, title, price } = item;
  const lista = createCartItemElement({ id, title, price });
  let localStorageCartItems;
  carregado(carrinho);
  carrinho.appendChild(lista);
  soma();
  if (localStorage.cartItems) {
    localStorageCartItems = JSON.parse(getSavedCartItems());
    localStorageCartItems.push({ texto: lista.innerText, price });
    saveCartItems(JSON.stringify(localStorageCartItems));
    return;
  }
  saveCartItems(JSON.stringify([{ texto: lista.innerText, price }]));
};

const btnLimpar = () => {
  const botao = document.querySelector('.empty-cart');
  botao.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    window.location.reload();
  });
};

const botaoAdd = () => {
  const botao = document.querySelectorAll('.item__add');
  botao.forEach((e) => e.addEventListener('click', selecionarCarrinho));
};

const storageRetornoCar = () => {
  if (localStorage.cartItems) {
    const retorno = JSON.parse(localStorage.cartItems);
    retorno.forEach((e) => {
      const criaElemento = createCustomElement('li', 'cart__item', e.texto);
      criaElemento.addEventListener('click', cartItemClickListener);
      carrinho.appendChild(criaElemento);
    });
  }
};

window.onload = async () => {
  await percorreProduto();
  botaoAdd();
  storageRetornoCar();
  btnLimpar();
 };
