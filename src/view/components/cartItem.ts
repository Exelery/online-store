import { IProductCount } from '../../utils/types';
import CartItemControl from './cartItemControl';

export default class CartItem {
  cartItemControl: CartItemControl;

  constructor() {
    this.cartItemControl = new CartItemControl();
  }

  draw(item: IProductCount, index: number) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const itemTemp: HTMLTemplateElement | null = document.querySelector('#itemTemp');

    if (itemTemp != null) {
      const sourceClone: Node = itemTemp.content.cloneNode(true);

      if (sourceClone instanceof DocumentFragment) {
        const itemLi: HTMLElement | null = sourceClone.querySelector('.item');
        if (itemLi != null) {
          itemLi.dataset.id = item.id.toString();

          const itemIndex = document.createElement('div');
          itemIndex.classList.add('item__index');
          itemIndex.textContent = index.toString();
          itemLi.prepend(itemIndex);
        }

        const itemName: HTMLElement | null = sourceClone.querySelector('.item__name');
        if (itemName != null) {
          itemName.textContent = item.title;
        }

        const itemPrice: HTMLElement | null = sourceClone.querySelector('.item__price');
        if (itemPrice != null) {
          itemPrice.classList.add('incart');
          itemPrice.textContent = '$ ' + (item.price * item.count).toString();
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

        // const itemPrice = sourceClone.querySelector('.item__price');
        // if (itemPrice != null) {
        //   itemPrice.remove();
        // }

        const itemAdd = sourceClone.querySelector('.item__add');
        if (itemAdd != null) {
          itemAdd.remove();
        }

        this.cartItemControl.draw(item, sourceClone);
        fragment.append(sourceClone);
      }

      const cartList: HTMLElement | null = document.querySelector('.cart__items');
      if (cartList != null) {
        cartList.append(fragment);
      }
    }
  }
}

//   draw(data: IProductCount, productNumber: number) {
//     const cartList = document.querySelector('.cart__list');

//     if (cartList) {
//       const cartItem = document.createElement('li');
//       cartItem.classList.add('cart__item');
//       cartList.append(cartItem);

//       const cartIndex = document.createElement('p');
//       cartIndex.classList.add('cart__index');
//       cartIndex.textContent = productNumber.toString();
//       cartItem.append(cartIndex);

//       const cartInfo = document.createElement('div');
//       cartInfo.classList.add('cart__info');
//       cartItem.append(cartInfo);

//       const cartImage = document.createElement('img');
//       cartImage.classList.add('cart__image');
//       cartImage.alt = 'Product image';
//       cartImage.src = data.thumbnail;
//       cartInfo.append(cartImage);

//       const cartAbout = document.createElement('div');
//       cartAbout.classList.add('cart__about');
//       cartInfo.append(cartAbout);

//       console.log(cartItem, productNumber);
//     }
//   }
// }
