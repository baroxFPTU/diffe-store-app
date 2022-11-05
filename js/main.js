function setProduct(product) {
  localStorage.setItem('view-product', JSON.stringify(product));
}

function setProductType(type) {
  localStorage.setItem('product-type', type);
}

function renderProducts(productsDOMString, productList) {
  const productsDOM = document.querySelector(`.${productsDOMString}`);

  if (productList.length > 0) {
    const productItemDOM = productList
      .map(function (product) {
        return `
          <div class="product">
          <div class="product__thumb">
            <img
              src="${product.images[0]}"
              alt=""
            />
          </div>
          <div class="product__info">
            <h3 class="product__title"><a href="/products/detail.html" onClick="setProduct({name: '${
              product.name
            }', id: ${product.id}})">${product.name}</a></h3>
            <span class="product__price">${formatCurrency(product.price)}</span>
          </div>
          </div>
        `;
      })
      .join('');

    productsDOM.innerHTML = productItemDOM;
  } else {
    productsDOM.innerHTML = '<p>Hiện chưa có sản phẩm nào</p>';
    document.querySelector('.pagination').innerHTML = '';
  }
}

function renderProductByType(type) {
  const products = PRODUCTS.filter((product) => product.type === type);
  renderProducts('products-grid', products);
}

/**
 * Cart handler
 */

class CartItem {
  amount = 0;
  constructor(id, name, price, amount, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.image = image;
  }
}

const cart = getCart(); //Get cart list from localStorage. Be empty array if don't have any one.

function setCart(cart) {
  const filteredCart = cart.filter((item) => item.amount != 0);
  localStorage.setItem('cart', JSON.stringify(filteredCart));
  updateAmountCartButton();
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(product) {
  const isExist = Boolean(cart.find((item) => item.name === product.name)); // check whether product exists or not.
  const productDetail = PRODUCTS.find((pdct) => pdct.name === product.name);
  if (!isExist) {
    const cartItem = new CartItem(
      product.id,
      product.name,
      product.price,
      1,
      productDetail.images[0]
    );
    cart.push(cartItem);
  } else {
    increaseAmount(product.name);
  }

  setCart(cart);
  alert('Thêm sản phẩm thành công.');
}

function increaseAmount(itemName, callback) {
  cart.forEach((item) => {
    if (item.name === itemName) item.amount += 1;
  });

  setCart(cart);
  if (callback) callback(cart);
}

function decreaseAmount(itemName, callback) {
  cart.forEach((item) => {
    if (item.name === itemName && item.amount > 0) item.amount -= 1;
    if (item.amount === 0) renderCart(getCart());
  });

  setCart(cart);
  if (callback) callback(cart);
}

function updateAmountCartButton() {
  const totalAmount = getCart().reduce((total, item) => (total += item.amount), 0);
  const cartBtn = document.querySelector('.btn_cart');
  const cartBtnAfter = cartBtn.querySelector('::after');
  document.documentElement.style.setProperty('--amount', `"${totalAmount ?? 0}"`);
}

function formatCurrency(currency) {
  return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

function clearAllData() {
  localStorage.removeItem('cart');
}
updateAmountCartButton();
