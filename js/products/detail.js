function renderProductDetail() {
  const productInfoDOM = document.querySelector('.product-detail__info');
  const productImagesDOM = document.querySelector('.product-detail__images');
  const currentProduct = JSON.parse(localStorage.getItem('view-product'));

  if (currentProduct) {
    const productDetail = PRODUCTS.find(function (product) {
      if (product.id === currentProduct.id && product.name === currentProduct.name) {
        return product;
      }
    });

    const productImagesHTML = `
      <img
        class="main-img"
        src="${productDetail.images[0]}"
        alt=""
      />
      <img
        class="sub-img"
        src="${productDetail.images[1]}"
        alt=""
      />
      <img
        class="sub-img"
        src="${productDetail.images[2]}"
        alt=""
      />
    `;
    const productInfoHTML = `
    <h2>${productDetail.name}</h2>
    <p class="material">Chất liệu: ${productDetail.material}</p>
    <span class="product-detail__price"> ${productDetail.price}đ </span>
    <button class="btn btn-primary">Thêm vào giỏ hàng</button>
  `;

    productInfoDOM.innerHTML = productInfoHTML;
    productImagesDOM.innerHTML = productImagesHTML;
  } else {
    document.querySelector('.product-detail').innerHTML =
      '<p style="text-align:center">Không tìm thấy sản phẩm</p>';
  }
}

renderProductDetail();
