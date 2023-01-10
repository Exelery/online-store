import CartPage from '../../view/cartPage';
import Model from '../model/model';
import AppController from './controller';

export default class ProductPageController {
  controller: AppController;
  model: Model;
  cartPage: CartPage;
  constructor(controller: AppController) {
    this.controller = controller;
    this.model = controller.model;
    this.cartPage = controller.cartPage;
  }

  listen() {
    window.addEventListener('drawProductPage', () => {
      const cartButton = document.querySelector('.product__add-to-cart');
      const buyNowButton = document.querySelector('.product__buy-now');

      const pathId = this.controller.router.clearSlashes(decodeURI(window.location.pathname)).split('/')[1];
      if (cartButton) {
        cartButton.addEventListener('click', () => {
          const type = cartButton.textContent === 'ADD TO CARD' ? 'plus' : 'minus';
          cartButton.textContent = type === 'plus' ? 'DROP FROM CART' : 'ADD TO CARD';
          this.model.changeItemToCart(pathId, type);
        });
      }
      if (buyNowButton) {
        buyNowButton.addEventListener('click', (e) => {
          console.log('do something');
          this.model.changeItemToCart(pathId, 'plus');
          this.controller.appRouter(e, '/cart');
          this.cartPage.modal.draw();
        });
      }
    });
  }
}
