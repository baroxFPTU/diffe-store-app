function renderBestSeller() {
  const productsDOM = document.querySelector('.products-grid');

  renderProducts('products-grid', BEST_SELLER_PRODUCTS);
}

function setProductType(type) {
  localStorage.setItem('product-type', type);
}

renderBestSeller();
