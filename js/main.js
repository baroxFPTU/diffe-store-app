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
            <h3 class="product__title"><a href="/products/detail.html" onClick="setProduct({name: '${product.name}', id: ${product.id}})">${product.name}</a></h3>
            <span class="product__price">${product.price}đ</span>
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
