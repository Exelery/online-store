import Router from '../../router/router';
import Model from '../model/model';
import Item from '../../view/item/item';

export default class AppController {
  router: Router;
  model: Model;
  private item: Item;
  constructor() {
    this.router = new Router();
    this.model = new Model();
    this.item = new Item();
    this.start();
    this.updateCart();
    this.addUserEvents();
  }
  appRouter(e: Event, path: string) {
    if (e.target instanceof HTMLElement) {
      this.router.navigate(path);
    }
  }

  updateCart() {
    const totalSum = document.querySelector('.header__total--label') as Element;
    const totalCart = document.querySelector('.header__cart--label') as Element;
    window.onstorage = (event) => {
      if (event.key !== 'shopping') return;
      if (event.newValue) {
        const cart: { id: number; count: number; price: number }[] = JSON.parse(event.newValue);
        const sum = cart.reduce((acc, el) => (acc += el.price * el.count), 0);
        const totalItems = cart.reduce((acc, el) => (acc += el.count), 0);
        totalSum.textContent = `$ ${sum}`;
        totalCart.textContent = `${totalItems}`;
      }
    };
  }

  public async start() {
    await this.model.loadData();
    const data = this.model.productsAll;
    this.item.draw(data);
  }

  addUserEvents() {
    const productsContaner = document.querySelector('.products__items');
    const logo = document.querySelector('.header__title') as Element;

    if (productsContaner) {
      productsContaner.addEventListener('click', (e: Event) => {
        if (e.target instanceof HTMLElement) {
          const item = e.target.closest('.item');
          console.log(item);
          const addItem = e.target.closest('.item__add');
          if (addItem) {
            this.model.addItemToCart();
          } else if (item) {
            this.appRouter(e, 'product/n');
          }
        }
      });
    }

    logo.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        this.appRouter(e, '/');
      }
    });
  }
}
