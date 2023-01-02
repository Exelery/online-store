import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';
import Item from '../../view/components/item';
import { SortParm } from '../../utils/types';

export default class AppController {
  view: MainPage;
  router: Router;
  model: Model;
  private items: Item;
  constructor() {
    this.view = new MainPage();
    this.router = new Router(this);
    this.model = new Model();
    this.items = new Item();
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
    // const data = this.model.productsAll;
    const data = this.filterAndSortItems();
    this.view.draw(data);
  }

  addUserEvents() {
    window.addEventListener('drawMainPage', () => {
      console.log('working');
      const productsContaner = document.querySelector('.products__items');
      const search = document.querySelector('.products__search');
      const sortBy = document.querySelector('.products__select');

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

      if (search) {
        search.addEventListener('input', (e: Event) => {
          const field = e.target as HTMLInputElement;
          if (field.value) {
            this.model.filter.set('search', field.value);
          } else {
            this.model.filter.delete('search');
          }
          this.appRouter(e, '?' + this.model.filter.toString());
        });
      }

      if (sortBy) {
        sortBy.addEventListener('change', (e: Event) => {
          const select = e.target as HTMLSelectElement;
          this.model.filter.set('sort', select.value);
          this.appRouter(e, '?' + this.model.filter.toString());
        });
      }
    });
    const logo = document.querySelector('.header__title') as Element;

    logo.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        this.appRouter(e, '/');
      }
    });
  }

  filterAndSortItems() {
    let data = this.model.productsAll.slice();
    const filters = this.model.filter;
    const price = filters.get('price');
    if (price) {
      const [min, max] = price.split('%').map(Number);
      data = this.model.filterByRange('price', min, max);
    }
    const stock = filters.get('stock');
    if (stock) {
      const [min, max] = stock.split('%').map(Number);
      data = this.model.filterByRange('stock', min, max);
    }
    const brand = filters.getAll('brand');
    if (brand) {
      brand.forEach((el) => {
        data = this.model.filterByField('brand', el);
      });
    }
    const category = filters.getAll('category');
    if (category) {
      category.forEach((el) => {
        data = this.model.filterByField('category', el);
      });
    }
    const search = filters.getAll('search').join(',');
    if (search) {
      data = this.model.filterBySearch(search);
    }
    const sort = filters.get('sort');
    if (sort) {
      data = this.model.sortItems(sort as SortParm, data);
    }
    return data;
  }
}
