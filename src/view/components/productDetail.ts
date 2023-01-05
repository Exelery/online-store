import { IProduct } from '../../utils/types';
import Btn from './btn';

export default class ProductDetail {
  btn: Btn;

  constructor() {
    this.btn = new Btn();
  }

  draw(data: IProduct) {
    const productInner = document.querySelector('.product__inner');

    if (productInner !== null) {
      const productDetail = document.createElement('div');
      productDetail.classList.add('product__detail');
      productInner.append(productDetail);

      const productTitle = document.createElement('h2');
      productTitle.classList.add('product__title');
      productTitle.textContent = data.title;
      productDetail.append(productTitle);

      const productData = document.createElement('div');
      productData.classList.add('product__data');
      productDetail.append(productData);

      const productPhotos = document.createElement('div');
      productPhotos.classList.add('product__photos');
      productData.append(productPhotos);

      const productMainPhotoContainer = document.createElement('div');
      productMainPhotoContainer.classList.add('product__main-photo-container');
      productPhotos.append(productMainPhotoContainer);

      const productMainPhoto = document.createElement('img');
      productMainPhoto.classList.add('product__main-photo');
      productMainPhoto.src = data.images[0] ? data.images[0] : '';
      productMainPhoto.alt = 'Product photo';
      productMainPhotoContainer.append(productMainPhoto);

      const productSlides = document.createElement('div');
      productSlides.classList.add('product__slides');
      productPhotos.append(productSlides);

      data.images.forEach((val, i) => {
        const productSlide = document.createElement('img');
        productSlide.classList.add('product__slide');
        if (i === 0) productSlide.classList.add('active');
        productSlide.src = val;
        productSlide.alt = 'Product photo';
        productSlides.append(productSlide);
      });

      const productInfo = document.createElement('ul');
      productInfo.classList.add('product__info-list');
      productData.append(productInfo);

      const descrNames = ['Description', 'Category', 'Brand', 'Rating', 'Discount', 'Stock'];
      const descrText = [data.description, data.category, data.brand, data.rating, data.discountPercentage, data.stock];

      descrNames.forEach((val, i) => {
        const productInfoItem = document.createElement('li');
        productInfoItem.classList.add('product__info-item');
        productInfo.append(productInfoItem);

        const productInfoName = document.createElement('h3');
        productInfoName.classList.add('product__info-name');
        productInfoName.textContent = val + ':';
        productInfoItem.append(productInfoName);

        const productInfoText = document.createElement('p');
        productInfoText.classList.add('product__info-text');
        productInfoText.textContent = descrText[i].toString();
        productInfoItem.append(productInfoText);
      });

      const productAdd = document.createElement('div');
      productAdd.classList.add('product__add');
      productData.append(productAdd);

      const productPrice = document.createElement('p');
      productPrice.classList.add('product__price');
      productPrice.textContent = '$ ' + data.price.toString();
      productAdd.append(productPrice);

      const productAddToCart = this.btn.draw('ADD TO CARD', 'product__add-to-cart');
      productAdd.append(productAddToCart);

      const productBuyNow = this.btn.draw('BUY NOW', 'product__buy-now');
      productAdd.append(productBuyNow);

      productSlides.addEventListener('click', this.changeMainPhoto);
    }
  }

  changeMainPhoto(e: Event) {
    e.preventDefault;
    const productMainPhoto = document.querySelector('.product__main-photo');
    const productSlide = document.querySelectorAll('.product__slide');
    if (
      e.target instanceof HTMLImageElement &&
      e.target !== null &&
      productMainPhoto instanceof HTMLImageElement &&
      productMainPhoto !== null
    ) {
      productSlide.forEach((val) => {
        if (val instanceof HTMLImageElement && val !== null) {
          val.classList.remove('active');
        }
      });
      e.target.classList.add('active');
      productMainPhoto.src = e.target.src;
    }
  }
}
