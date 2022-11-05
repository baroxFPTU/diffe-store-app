const paidBtn = document.querySelector('.btn-paid');

paidBtn.addEventListener('click', function () {
  const paymentFormDOM = document.getElementById('payment-form');
  const formData = {
    lastName: paymentFormDOM.querySelector('input#last-name').value,
    firstName: paymentFormDOM.querySelector('input#name').value,
    email: paymentFormDOM.querySelector('input#email').value,
    address: paymentFormDOM.querySelector('input#address').value,
    description: document.querySelector('textarea#description').value,
    carts: getCart(),
  };

  const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
  console.log(formData);
  console.log(currentOrders);
  formData.id = Math.floor(currentOrders.length + Math.random() * 100000000000000);
  currentOrders.push(formData);
  localStorage.setItem('orders', JSON.stringify(currentOrders));
  alert('Đặt hàng thành công');
  window.location.href = '/';
  clearAllData();
});

renderTotal('cart-summary__list', getCart());
