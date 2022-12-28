// import './item.scss';
import { IProduct } from '../../utils/types';

export default class Item {
  draw(data: IProduct[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const itemTemp: HTMLTemplateElement | null = document.querySelector('#itemTemp');

    if (itemTemp != null) {
      data.forEach((item) => {
        const sourceClone: Node = itemTemp.content.cloneNode(true);

        if (sourceClone instanceof DocumentFragment) {
          const itemName: HTMLElement | null = sourceClone.querySelector('.item__name');
          if (itemName != null) {
            itemName.textContent = item.title;
          }

          const itemPrice: HTMLElement | null = sourceClone.querySelector('.item__price');
          if (itemPrice != null) {
            itemPrice.textContent = '$ ' + item.price.toString();
          }

          const itemImage: HTMLImageElement | null = sourceClone.querySelector('.item__image');
          if (itemImage != null) {
            itemImage.src = item.images[0];
          }

          const itemCategory: HTMLElement | null = sourceClone.querySelector('.item__category span');
          if (itemCategory != null) {
            itemCategory.textContent = item.category;
          }

          const itemBrand: HTMLElement | null = sourceClone.querySelector('.item__brand span');
          if (itemBrand != null) {
            itemBrand.textContent = item.brand;
          }

          const itemDiscount: HTMLElement | null = sourceClone.querySelector('.item__discount span');
          if (itemDiscount != null) {
            itemDiscount.textContent = item.discountPercentage.toString() + ' %';
          }

          const itemRating: HTMLElement | null = sourceClone.querySelector('.item__rating span');
          if (itemRating != null) {
            itemRating.textContent = item.rating.toString();
          }

          const itemStock: HTMLElement | null = sourceClone.querySelector('.item__stock span');
          if (itemStock != null) {
            itemStock.textContent = item.stock.toString();
          }

          fragment.append(sourceClone);
        }
      });

      const productsItems: HTMLElement | null = document.querySelector('.products__items');
      if (productsItems != null) {
        productsItems.append(fragment);
      }
    }
  }
}
