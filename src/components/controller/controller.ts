import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';
import PageError from '../../view/404/404';
import MainPageController from './mainPageController';
import { SortParm } from '../../utils/types'; //IProduct

export default class AppController {
  view: MainPage;
  router: Router;
  model: Model;
  mainPageController: MainPageController;
  pageError: PageError;
  constructor() {
    this.view = new MainPage();
    this.model = new Model();
    this.router = new Router(this);
    this.pageError = new PageError();
    this.mainPageController = new MainPageController(this);
    // this.loadPage();
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

  public async loadPage(path = '') {
    this.model.filter = new URLSearchParams(window.location.search);
    const main = document.querySelector('.main') as Element;
    if (!this.model.productsAll) {
      await this.model.loadData();
    }
    const tempArr = path.split('/');
    const foundItem = this.model.productsAll.find((el) => el.id === Number(tempArr[1]));
    const data = this.filterAndSortItems();
    if (path === '') {
      const productContainer = document.querySelector('.products__items');
      if (productContainer) {
        productContainer.innerHTML = '';
        this.view.item.draw(data);
      } else {
        main.innerHTML = '';
        this.view.draw(data);
      }
    } else if (tempArr.length === 2 && foundItem) {
      // product draw(foundItem)
      console.log('draw product', foundItem);
    } else {
      main.innerHTML = '';
      this.pageError.draw();
    }
  }

  addUserEvents() {
    this.mainPageController.listen();
    const logo = document.querySelector('.header__title') as Element;

    logo.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        // this.model.filter = new URLSearchParams();
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
      // let temp: IProduct[];
      // let includedId: number[];
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
