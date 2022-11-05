function renderCart(cart) {
  const cartDOM = document.querySelector('.cart-table tbody');
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
        <td><span class="price">${item.price}đ</span></td>
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
        <td><span class="price">${totalAmount}đ</span></td>
      </tr>
      `;
  });

  cartDOM.innerHTML = cartHTML;

  renderTotal(cart);
}

function renderTotal(cart, promote = 0) {
  console.log(promote);
  const subTotalAmount = cart.reduce((total, item) => (total += item.amount * item.price), 0);
  1;
  const totalAmount = cart.reduce(
    (total, item) => (total += item.amount * item.price * (1 - promote)),
    0
  );
  const cartSummaryDOM = document.querySelector('.cart-summary__list');
  const cartSummaryHTML = `
  <div class="cart-summary__row">
    <span class="title">Tạm tính</span>
    <span class="price">${subTotalAmount}đ</span>
  </div>
  <div class="cart-summary__row"> 
    <span class="title">Thành tiền</span>
    <span class="price">${totalAmount}đ</span>
  </div>
  `;

  cartSummaryDOM.innerHTML = cartSummaryHTML;
}

const promoteButton = document.querySelector('.btn-promote');

const promotes = {
  SALE30: 0.3,
  SALE20: 0.2,
};

promoteButton.addEventListener('click', function () {
  const inputPromoteDOM = document.querySelector('.input-promote');
  const promoteValue = inputPromoteDOM.value;
  if (promotes[promoteValue]) {
    localStorage.setItem('promote', promoteValue);
    renderTotal(getCart(), promotes[promoteValue]);
  }
});
console.log(localStorage.getItem('promote'));
renderCart(getCart());
