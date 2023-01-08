import { IProductCount } from '../utils/types';
import CartPagination from './components/cartPagination';
import CartTotal from './components/cartTotal';

export default class CartPage {
  cardPagination: CartPagination;
  cartTotal: CartTotal;

  constructor() {
    this.cardPagination = new CartPagination();
    this.cartTotal = new CartTotal();
  }

  addSection() {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    const section = document.createElement('section');
    section.classList.add('cart');
    main.append(section);

    const container = document.createElement('div');
    container.classList.add('container');
    section.append(container);

    const productInner = document.createElement('div');
    productInner.classList.add('cart__inner');
    container.append(productInner);
  }

  draw(cartItems: IProductCount[]) {
    this.addSection();
    // const cartInner = document.querySelector('.cart__inner') as HTMLElement;
    // cartInner.textContent = JSON.stringify(cartItems[0].brand);
    this.cardPagination.draw(cartItems);
    this.cartTotal.draw(cartItems);
  }
}
