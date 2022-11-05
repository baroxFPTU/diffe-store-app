/**
 * Get product type which is saved in localStorage with key is 'product-type'
 */
const productType = localStorage.getItem('product-type');
renderProductByType(productType); // call function renderProductByType in main.js with type is saved
