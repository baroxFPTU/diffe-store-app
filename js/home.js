function renderBestSeller() {
  const productsDOM = document.querySelector('.products-grid');

  function setProduct(product) {
    localStorage.setItem('view-product', JSON.stringify(product));
  }

  const productItemDOM = BEST_SELLER_PRODUCTS.map(function (product) {
    return `
  <div class="product">
  <div class="product__thumb">
    <img
      src="${product.images[0]}"
      alt=""
    />
  </div>
  <div class="product__info">
    <h3 class="product__title"><a href="/products/detail.html" onClick="setProduct({name: '${product.name}', id: ${product.id}})">${product.name}</a></h3>
    <span class="product__price">${product.price}đ</span>
  </div>
</div>
  `;
  }).join('');

  productsDOM.innerHTML = productItemDOM;
}

function setProductType(type) {
  localStorage.setItem('product-type', type);
}

renderBestSeller();
