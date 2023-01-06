import { IProductCount } from '../../utils/types';

export default class CartPagination {
  addStructure(cartItems: IProductCount[]) {
    const cartInner = document.querySelector('.cart__inner');

    if (cartInner) {
      if (cartItems.length === 0) {
        const cartEmpty = document.createElement('p');
        cartEmpty.classList.add('cart__empty');
        cartEmpty.textContent = 'Cart is Empty';
        cartInner.append(cartEmpty);
      } else {
        cartInner.innerHTML = '';

        const cartProducts = document.createElement('div');
        cartProducts.classList.add('cart__products');
        cartInner.append(cartProducts);

        const cartControl = document.createElement('div');
        cartControl.classList.add('cart__control');
        cartProducts.append(cartControl);

        const cartTitle = document.createElement('h2');
        cartTitle.classList.add('cart__title');
        cartTitle.textContent = 'Products in Cart';
        cartControl.append(cartTitle);

        const cartLimit = document.createElement('div');
        cartLimit.classList.add('cart__limit');
        cartLimit.textContent = 'LIMIT: ';
        cartControl.append(cartLimit);

        const cartLimitInput = document.createElement('input');
        cartLimitInput.classList.add('cart__limit-input');
        cartLimitInput.type = 'number';
        cartLimitInput.min = '1';
        cartLimitInput.max = cartItems.length.toString();
        cartLimitInput.value = cartLimitInput.max;
        cartLimit.append(cartLimitInput);

        const cartPageNumbers = document.createElement('div');
        cartPageNumbers.classList.add('cart__page-numbers');
        cartPageNumbers.textContent = 'PAGE: ';
        cartControl.append(cartPageNumbers);

        const btnLeft = document.createElement('button');
        btnLeft.classList.add('btn-left');
        btnLeft.textContent = '<';
        cartPageNumbers.append(btnLeft);

        const currentPage = document.createElement('span');
        currentPage.classList.add('current-page');
        currentPage.textContent = ' 1 ';
        cartPageNumbers.append(currentPage);

        const btnRight = document.createElement('button');
        btnRight.classList.add('btn-right');
        btnRight.textContent = '>';
        cartPageNumbers.append(btnRight);

        const cartList = document.createElement('ul');
        cartList.classList.add('cart__list');
        cartProducts.append(cartList);
      }
    }
  }

  draw(cartItems: IProductCount[]) {
    this.addStructure(cartItems);
  }
}
