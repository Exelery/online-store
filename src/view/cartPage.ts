import { IProductCount } from '../utils/types';
import CartPagination from './components/cartPagination';
import CartTotal from './components/cartTotal';
import Modal from './modal';

export default class CartPage {
  cardPagination: CartPagination;
  cartTotal: CartTotal;
  modal: Modal;

  constructor() {
    this.cardPagination = new CartPagination();
    this.cartTotal = new CartTotal();
    this.modal = new Modal();
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

  openModal() {
    const checkoutBtn = document.querySelector('.total__checkout');

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.modal.draw();
        console.log('open!!!');
      });
    }
  }

  draw(cartItems: IProductCount[]) {
    this.addSection();
    // const cartInner = document.querySelector('.cart__inner') as HTMLElement;
    // cartInner.textContent = JSON.stringify(cartItems[0].brand);
    this.cardPagination.draw(cartItems);
    this.cartTotal.draw(cartItems);
    this.openModal();
  }
}
