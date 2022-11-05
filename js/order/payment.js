// render total summary immediately when web is loaded.
// with cart array from localStorage
renderTotal('cart-summary__list', getCart());

/**
 * Get data from Form and save to localStorage when
 * user click pay button
 */
const paidBtn = document.querySelector('.btn-paid');

paidBtn.addEventListener('click', function () {
  const paymentFormDOM = document.getElementById('payment-form'); // define location of form where can get input's data

  // generate 'formData' object by select HTML and get value
  const formData = {
    lastName: paymentFormDOM.querySelector('input#last-name').value,
    firstName: paymentFormDOM.querySelector('input#name').value,
    email: paymentFormDOM.querySelector('input#email').value,
    address: paymentFormDOM.querySelector('input#address').value,
    description: document.querySelector('textarea#description').value,
    carts: getCart(),
  };

  // get current orders from localStorage, if not use empty array
  const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];

  // set random ID for new order
  formData.id = Math.floor(currentOrders.length + Math.random() * 100000000000000);

  // Add new order to exists order
  currentOrders.push(formData);

  // Save updated orders into localStorage
  localStorage.setItem('orders', JSON.stringify(currentOrders));

  // Notify to user
  alert('Đặt hàng thành công');

  // Redirect to home page
  window.location.href = '/';

  //Clear cart's array in localStorage
  clearAllData();
});
