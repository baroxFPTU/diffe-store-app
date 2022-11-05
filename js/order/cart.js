function renderCart(cart) {
  const cartDOM = document.querySelector('.cart-table tbody');

  if (cart.length === 0) {
    cartDOM.innerHTML = '<p style="padding: 24px; font-size: 18px">Bạn chưa thêm sản phẩm nào.</p>';
  } else {
    const cartHTML = cart.map((item) => {
      if (item.amount == 0) return;
      const totalAmount = item.price * item.amount;

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
    });

    cartDOM.innerHTML = cartHTML;
  }

  renderTotal('cart-summary__list', cart);
}

function renderTotal(cartTotalDOM, cart, promote = 0) {
  const subTotalAmount = cart.reduce((total, item) => (total += item.amount * item.price), 0);
  1;
  const totalAmount = cart.reduce(
    (total, item) => (total += item.amount * item.price * (1 - promote)),
    0
  );
  const cartSummaryDOM = document.querySelector(`.${cartTotalDOM}`);
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

  cartSummaryDOM.innerHTML = cartSummaryHTML;
}

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

orderBtn.addEventListener('click', function () {
  if (getCart().length == 0) return alert('Bạn cần chọn sản phảm trước khi thanh toán.');
  window.location.href = './payment.html';
});

renderCart(getCart());
