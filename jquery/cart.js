renderCart(getCart()); // render cart immediately when web is loaded

/**
 * Render all added product in cart which one get from localStorage
 * @param {*} cart
 */

function renderCart(cart) {
  const cartDOM = $('.cart-table tbody'); // define location where need to render cart

  if (cart.length === 0) {
    // if dont have any item in cart, render this one.
    cartDOM.html('<p style="padding: 24px; font-size: 18px">Bạn chưa thêm sản phẩm nào.</p>');
  } else {
    // if not, start to generate HTML list of cart item. Ready to render
    const cartHTML = $.map(cart, (item) => {
      if (item.amount == 0) return;
      const totalAmount = item.price * item.amount; // calc total amount

      return `
        <tr>
          <td>
            <div class="product__thumb">
              <img
                src="${item.image}"
                alt=""
              />
            </div>
            <p>${item.name}</p>
          </td>
          <td><span class="price">${formatCurrency(item.price)}</span></td>
          <td>
            <div class="amount-input">
              <button
                class="btn btn-outline btn-amount"
                id="decrease"
                onClick="decreaseAmount('${item.name}', renderCart)"
                value="Decrease Value"
              >
                -
              </button>
              <input type="number" id="number" value="${item.amount}" />
              <button
                class="btn btn-outline btn-amount"
                id="increase"
                onClick="increaseAmount('${item.name}', renderCart)"
                value="Increase Value"
              >
                +
              </button>
            </div>
          </td>
          <td><span class="price">${formatCurrency(totalAmount)}  </span></td>
        </tr>
        `;
    }).join('');

    cartDOM.html(cartHTML); // insert HTML into defined location
    renderTotal('cart-summary__list', cart);
  }
}

/**
 * + Render total summary with current cart and promote (sale) if have.
 * + Will be call when increase or decrease amount.
 */

function renderTotal(cartTotalDOM, cart, promote = 0) {
  // Calc subtotal (without apply promote) and total amount (applied promote)
  const subTotalAmount = cart.reduce((total, item) => (total += item.amount * item.price), 0);
  const totalAmount = cart.reduce(
    (total, item) => (total += item.amount * item.price * (1 - promote)),
    0
  );

  const cartSummaryDOM = $(`.${cartTotalDOM}`); // define location where need to render it

  // Generate HTML of subtotal and total amount
  const cartSummaryHTML = `
  <div class="cart-summary__row">
    <span class="title">Tạm tính</span>
    <span class="price">${formatCurrency(subTotalAmount)}</span>
  </div>
  <div class="cart-summary__row"> 
    <span class="title">Thành tiền</span>
    <span class="price">${formatCurrency(totalAmount)}</span>
  </div>
  `;

  cartSummaryDOM.html(cartSummaryHTML); // insert Generated HTML into defined location
}

/**
 * Handle apply promote when user enter valid promote code
 */

const promoteButton = document.querySelector('.btn-promote');
const orderBtn = document.querySelector('.btn-order');

promoteButton.addEventListener('click', function () {
  const inputPromoteDOM = document.querySelector('.input-promote');
  const promoteValue = inputPromoteDOM.value;
  if (promotes[promoteValue]) {
    localStorage.setItem('promote', promoteValue);
    renderTotal(getCart(), promotes[promoteValue]);
  } else {
    alert('Mã ưu đãi không hợp lệ.');
  }

  inputPromoteDOM.value = '';
});

/**
 * Wait until order button is clicked, then redirect to payment.html page. If not => notify for user
 */
orderBtn.addEventListener('click', function () {
  if (getCart().length == 0) return alert('Bạn cần chọn sản phảm trước khi thanh toán.');

  // Redirect to payment.html
  window.location.href = './payment.html';
});
