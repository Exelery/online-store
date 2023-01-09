// import { IProductCount } from '../../utils/types';
import CartPage from '../../view/cartPage';
import Model from '../model/model';
import AppController from './controller';

export default class CartPageController {
  controller: AppController;
  model: Model;
  cartPage: CartPage;
  constructor(controller: AppController) {
    this.controller = controller;
    this.model = controller.model;
    this.cartPage = controller.cartPage;
  }

  public listen() {
    window.addEventListener('drawCartPage', () => {
      const cartList = document.querySelector('.cart__items');
      const cartLimit = document.querySelector('.cart__limit-input');
      const pageNumber = document.querySelector('.cart__page-numbers');

      if (cartList) {
        cartList.addEventListener('click', (e) => {
          if (e.target instanceof HTMLElement) {
            const item = e.target.closest('.item') as HTMLElement;
            if (item) {
              const id = item.getAttribute('data-id');
              const minus = e.target.closest('.item__dec');
              const plus = e.target.closest('.item__inc');
              // const stock = item.querySelector('.item__stock span');
              if (id && (plus || minus)) {
                if (plus) {
                  this.model.changeItemToCart(id, 'plus');
                }
                if (minus) {
                  this.model.changeItemToCart(id, 'minus');
                }
                this.controller.appRouter(e, 'cart/?' + this.model.filter.toString());
                // const cartItems: IProductCount[] = this.model.findItemsFromCart(
                //   this.model.shoppingCart
                // ) as IProductCount[];
                // this.cartPage.cardPagination.draw(cartItems, undefined, undefined);
              }
            }
          }
        });
      }
      if (cartLimit) {
        cartLimit.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          console.log(target.value);
          this.model.filter.set('limit', target.value);
          this.controller.appRouter(e, 'cart/?' + this.model.filter.toString());
        });
      }
      if (pageNumber) {
        pageNumber.addEventListener('click', (e) => {
          const button = (e.target as Element).closest('button');
          const currentPage = document.querySelector('.current-page') as Element;
          console.log(button, currentPage);
          if (button && currentPage) {
            this.model.filter.set('page', currentPage.textContent || '1');
            this.controller.appRouter(e, 'cart/?' + this.model.filter.toString());
          }
        });
      }
    });
  }
}
