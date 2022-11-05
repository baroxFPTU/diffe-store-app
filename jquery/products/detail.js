renderProductDetail();

/**
 * Render product detail when user access detail.html page.
 * javascript know which product will be render because is depend on the 'view-product' saved in localStorage
 */
function renderProductDetail() {
  const productInfoDOM = $('.product-detail__info'); // define the location where to render product information
  const productImagesDOM = $('.product-detail__images'); // define the location where to render product images
  const currentProduct = JSON.parse(localStorage.getItem('view-product')); // define what product user want to view base on 'view-product'

  // if exists product's data user want to view
  if (currentProduct) {
    // then loop through PRODUCTS list in data to find complete data of it.
    // use javascript syntax because jquery don't support find method
    const productDetail = PRODUCTS.find(function (product) {
      // find base on id and name of provided product
      if (product.id === currentProduct.id && product.name === currentProduct.name) {
        return product;
      }
    });

    // generate product images html
    // if product want to view have type is 'trong-kinh' then render one image (because data just have one image), else render with three images.
    const productImagesHTML =
      productDetail.type === 'trong-kinh'
        ? `
        <img
        class="main-img"
        src="${productDetail.images[0]}"
        alt=""
      />
  `
        : `
    <img
      class="main-img"
      // src="${productDetail.images[0]}"
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

    // generate product info html base on define product above.
    const productInfoHTML = `
    <h2>${productDetail.name}</h2>
    <p class="material">Chất liệu: ${productDetail.material}</p>
    ${
      productDetail.type === 'trong-kinh' // also check if product have type is 'trong kinh', then render with description, && is and operator
        ? `<p class="description">${productDetail.description}</p>`
        : ''
    }
    <span class="product-detail__price"> ${formatCurrency(productDetail.price)} </span>
    <button class="btn btn-primary" onClick="addToCart({name: '${productDetail.name}', price: ${
      productDetail.price
    }, id:${productDetail.id}})">Thêm vào giỏ hàng</button>
  `;

    // insert everything into it's defined location
    productInfoDOM.html(productInfoHTML);
    productImagesDOM.html(productImagesHTML);
  } else {
    // If don't define the product user want to view, render to nofity user
    $('.product-detail').html('<p style="text-align:center">Không tìm thấy sản phẩm</p>');
  }
}
