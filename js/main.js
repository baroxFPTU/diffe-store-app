// update amount of cart button immediately when web is loaded
updateAmountCartButton();

// Save product object into localStorage
function setProduct(product) {
  localStorage.setItem('view-product', JSON.stringify(product));
}

// Save product type string into localStorage
function setProductType(type) {
  localStorage.setItem('product-type', type);
}

/**
 * Render products into location (productsDOMString) with provided list product (productList)
 * @param {*} productsDOMString
 * @param {*} productList
 */
function renderProducts(productsDOMString, productList) {
  const productsDOM = document.querySelector(`.${productsDOMString}`); // define location where need to render

  // checking, whether have any product or not.
  if (productList.length > 0) {
    // Generate products HTML by loop through provided product list and assign product value into html
    const productItemHTML = productList
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
      .join(''); // used to merge all elements of array into a string which will used to insert into defined location

    productsDOM.innerHTML = productItemHTML; // insert products HTML into defined location
  } else {
    // If don't have any product, render 'Hien chua co...'
    productsDOM.innerHTML = '<p>Hiện chưa có sản phẩm nào</p>';

    //Remove pagination (phan trang) if don't have any.
    document.querySelector('.pagination').innerHTML = '';
  }
}

/**
 * Render products follow provided type
 * @param {*} type
 */
function renderProductByType(type) {
  // filter to get valid product
  const products = PRODUCTS.filter((product) => product.type === type); // valid products which are have same type with provided type
  renderProducts('products-grid', products); // give filtered product list for function renderProducts render it.
}

/**
 * Cart handler
 */

/**
 * Define a CartItem object.
 * Mission is only for save data in right way.
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

// Get cart which saved in localStorage
const cart = getCart(); //Get cart list from localStorage. Be empty array if don't have any one.

// Save cart array into localStorage
function setCart(cart) {
  // filter to get product which one have amount not equal to 0
  const filteredCart = cart.filter((product) => product.amount != 0);

  // Then save filtered cart into localStorage
  localStorage.setItem('cart', JSON.stringify(filteredCart));

  // Call updateAmountCartButton() to reset number of amount in cart button (header)
  updateAmountCartButton();
}

// Get cart saved in localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Add product into cart, then save cart into local storage and notify for user
function addToCart(product) {
  const isExist = Boolean(cart.find((item) => item.name === product.name)); // check whether product exists or not.
  const productDetail = PRODUCTS.find((pdct) => pdct.name === product.name); // get entire product data from product list in data.js.

  // If product is not present in cart, then add new one
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
    // if product is already existed, update it amount with increaseAmount function
    increaseAmount(product.name);
  }

  setCart(cart); // save updated cart into localStorage
  alert('Thêm sản phẩm thành công.');
}

// Increase amount of product which have same name with provided name (itemName), then call function callback which provided by user.
function increaseAmount(itemName, callback) {
  // loop through cart list and increase amount of product have exactly same name with provided name (itemName)
  cart.forEach((item) => {
    if (item.name === itemName) item.amount += 1;
  });

  setCart(cart); // save updated cart into localStorage

  // if user passed callback function, then call it with updated cart. Give for them to use with any purpose.
  if (callback) callback(cart);
}

// Same with above function, but this one is decrease amount
function decreaseAmount(itemName, callback) {
  cart.forEach((item) => {
    if (item.name === itemName && item.amount > 0) item.amount -= 1;
    if (item.amount === 0) renderCart(getCart());
  });

  setCart(cart);
  if (callback) callback(cart);
}

// update amount number of cart button (in header)
function updateAmountCartButton() {
  const totalAmount = getCart().reduce((total, item) => (total += item.amount), 0); // calculate total amount by loop through cart and sum amount
  const cartBtn = document.querySelector('.btn_cart'); // define location of cart button.
  const cartBtnAfter = cartBtn.querySelector('::after'); // then select the pseudo code (have to property before, after)

  // update --amount (variable define in main.css, to update the
  // 'content' property of cart button
  document.documentElement.style.setProperty('--amount', `"${totalAmount ?? 0}"`);
}

function formatCurrency(currency) {
  return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

// clear cart array saved in localStorage
// named function is clearAllData with purpose for future develope like remove more saved data.
function clearAllData() {
  localStorage.removeItem('cart');
}
