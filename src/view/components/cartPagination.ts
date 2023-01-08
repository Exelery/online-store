import { IProductCount } from '../../utils/types';
import CartItem from './cartItem';
import CartTotal from './cartTotal';

export default class CartPagination {
  cartItem: CartItem;
  cartTotal: CartTotal;

  constructor() {
    this.cartItem = new CartItem();
    this.cartTotal = new CartTotal();
  }

  addStructure(cartItems: IProductCount[], cartLimitValue: number | undefined, cartPage: number | undefined) {
    const cartInner = document.querySelector('.cart__inner');

    if (cartInner) {
      cartInner.innerHTML = '';
      if (cartItems.length === 0) {
        const cartEmpty = document.createElement('p');
        cartEmpty.classList.add('cart__empty');
        cartEmpty.textContent = 'Cart is Empty';
        cartInner.append(cartEmpty);
      } else {
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
        cartLimitInput.value = cartLimitValue ? cartLimitValue.toString() : cartItems.length.toString();
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
        const pageValue =
          cartPage && cartItems.length / +cartLimitInput.value > cartPage
            ? cartPage
            : Math.floor(cartItems.length / +cartLimitInput.value);

        currentPage.textContent = pageValue ? pageValue.toString() : '1';
        cartPageNumbers.append(currentPage);

        const btnRight = document.createElement('button');
        btnRight.classList.add('btn-right');
        btnRight.textContent = '>';
        cartPageNumbers.append(btnRight);

        const cartList = document.createElement('ul');
        cartList.classList.add('cart__items', 'list');
        cartProducts.append(cartList);
      }
    }
  }

  drawItemsList(cartItems: IProductCount[]) {
    console.log('1');
    const cartLimitInput = document.querySelector('.cart__limit-input') as HTMLInputElement;
    const currentPage = document.querySelector('.current-page') as HTMLElement;
    const cartList = document.querySelector('.cart__items');

    if (cartList) cartList.innerHTML = '';
    const itemsOnPage = +cartLimitInput.value;
    const pageNumber = currentPage.textContent ? +currentPage.textContent : 1;

    const maxIndex = itemsOnPage * pageNumber - 1;
    const minIndex = (pageNumber - 1) * itemsOnPage;
    const indexesToDraw: number[] = [];

    for (let i = minIndex; i <= maxIndex; i++) {
      indexesToDraw.push(i);
    }

    indexesToDraw.forEach((val) => {
      if (cartItems[val]) this.cartItem.draw(cartItems[val], val + 1);
    });
    this.updateTotalValues(cartItems);
  }

  changePageLimit(data: IProductCount[]) {
    const cartLimitInput = document.querySelector('.cart__limit-input') as HTMLInputElement;
    const currentPageSpan = document.querySelector('.current-page');

    if (currentPageSpan) {
      cartLimitInput.addEventListener('input', () => {
        if (+cartLimitInput.value !== 0 && +cartLimitInput.value <= +cartLimitInput.max) {
          const currentPageNumber = currentPageSpan.textContent ? +currentPageSpan.textContent : 111;
          const newMaxPage = Math.ceil(data.length / +cartLimitInput.value);
          if (newMaxPage < currentPageNumber) {
            currentPageSpan.textContent = `${newMaxPage}`;
          }
          this.drawItemsList(data);
        }
      });
    }
  }

  changePage(data: IProductCount[]) {
    console.log('changePage');
    const cartLimitInput = document.querySelector('.cart__limit-input');

    if (cartLimitInput && cartLimitInput instanceof HTMLInputElement) {
      const btnLeft = document.querySelector('.btn-left');
      const btnRight = document.querySelector('.btn-right');
      const currentPageSpan = document.querySelector('.current-page');

      if (btnLeft && btnRight && currentPageSpan) {
        btnLeft.addEventListener('click', () => {
          let currentPage = currentPageSpan.textContent ? +currentPageSpan.textContent : 1;
          if (currentPage > 1) {
            currentPage--;
            currentPageSpan.textContent = `${currentPage}`;
            // this.drawItemsList(data);
          }
        });

        btnRight.addEventListener('click', () => {
          let currentPage = currentPageSpan.textContent ? +currentPageSpan.textContent : 1;
          const maxPage = data.length / +cartLimitInput.value;
          if (currentPage < maxPage) {
            currentPage++;
            currentPageSpan.textContent = `${currentPage}`;
            // this.drawItemsList(data);
          }
        });
      }
    }
  }

  updateTotalValues(data: IProductCount[]) {
    const totalPrice = document.querySelector('.total__price');
    const totalProducts = document.querySelector('.total__count');
    if (totalPrice) {
      totalPrice.textContent = `$ ${data.reduce((acc, val) => (acc += val.price * val.count), 0)}.00`;
    }
    if (totalProducts) {
      totalProducts.textContent = `${data.reduce((acc, el) => (acc += el.count), 0)}`;
    }
  }

  draw(cartItems: IProductCount[], cartLimit: number | undefined, cartPage: number | undefined) {
    this.addStructure(cartItems, cartLimit, cartPage);
    if (cartItems.length > 0) {
      this.drawItemsList(cartItems);
      this.changePageLimit(cartItems);
      this.changePage(cartItems);
      this.cartTotal.draw(cartItems);
      this.updateTotalValues(cartItems);
    }
    dispatchEvent(new Event('drawCartPage'));
  }
}
