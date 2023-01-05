import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';
import PageError from '../../view/404/404';
import MainPageController from './mainPageController';
import { SortParm, ICart, IDisplay, IProductCount } from '../../utils/types';
import ProductPage from '../../view/productPage';

export default class AppController {
  view: MainPage;
  productPage: ProductPage;
  router: Router;
  model: Model;
  mainPageController: MainPageController;
  pageError: PageError;
  constructor() {
    this.view = new MainPage();
    this.productPage = new ProductPage();
    this.model = new Model();
    this.router = new Router(this);
    this.pageError = new PageError();
    this.mainPageController = new MainPageController(this);
  }

  start() {
    this.updateCart();
    this.addUserEvents();
  }
  appRouter(e: Event, path: string) {
    if (e.target instanceof HTMLElement) {
      this.router.navigate(path);
    }
  }

  public async loadPage(path = '') {
    this.model.filter = new URLSearchParams(window.location.search);
    if (!this.model.productsAll) {
      await this.model.loadData();
    }
    const tempArr = path.split('/');
    // const regex = 'product/\b([1-9]|[1-4][0-9]|50)\b';
    const foundItem = this.model.productsAll.find((el) => el.id === Number(tempArr[1]));
    const data = this.filterAndSortItems();

    let display: IDisplay = this.model.filter.get('display') as IDisplay;
    if (display !== 'list') display = 'tile';
    const search = this.model.filter.getAll('search').join(',') || '';
    const categoryAndBrand = [...this.model.filter.getAll('category'), ...this.model.filter.getAll('brand')] || [];
    console.log(categoryAndBrand);
    if (path === '') {
      const productContainer = document.querySelector('.products__items');
      if (productContainer) {
        this.view.item.draw(data, this.model.productsAll, display, search, categoryAndBrand);
      } else {
        this.view.draw(data, this.model.productsAll, display, search, categoryAndBrand);
      }
    } else if (tempArr.length === 2 && foundItem) {
      this.productPage.draw(foundItem);
    } else if (path === 'cart') {
      const cartItems: IProductCount[] = this.model.findItemsFromCart(this.model.shoppingCart) as IProductCount[];
      console.log('cart Open', cartItems);
    } else {
      this.pageError.draw();
    }
  }

  addUserEvents() {
    this.mainPageController.listen();
    const logo = document.querySelector('.header__title') as Element;
    const cart = document.querySelector('.header__cart') as Element;

    logo.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        this.appRouter(e, '/');
      }
    });

    cart.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        this.appRouter(e, 'cart');
      }
    });

    window.addEventListener('storage', this.updateCart);
  }

  updateCart() {
    const totalSum = document.querySelector('.header__total--label') as Element;
    const totalCart = document.querySelector('.header__cart--label') as Element;
    const storageCart = localStorage.getItem('shopping');
    if (storageCart) {
      const cart: ICart[] = JSON.parse(storageCart);
      const sum = cart.reduce((acc, el) => (acc += el.price * el.count), 0);
      const totalItems = cart.reduce((acc, el) => (acc += el.count), 0);
      totalSum.textContent = `$ ${sum}.00`;
      totalCart.textContent = `${totalItems}`;
    }
  }

  filterAndSortItems() {
    let data = this.model.productsAll.slice();
    const filters = this.model.filter;
    // console.log(data, 'start', filters.toString());
    const price = filters.get('price');
    if (price) {
      const [min, max] = price.split('%').map(Number);
      data = this.model.filterByRange(data, 'price', min, max);
    }
    const stock = filters.get('stock');
    if (stock) {
      const [min, max] = stock.split('%').map(Number);
      data = this.model.filterByRange(data, 'stock', min, max);
    }
    const brand = filters.getAll('brand');
    if (brand.length > 0) {
      // console.log('brand');
      // let tempData:
      data = this.model.filterByField(data, 'brand', brand);
    }
    const category = filters.getAll('category');
    if (category.length > 0) {
      // console.log(category);
      data = this.model.filterByField(data, 'category', category);
    }
    const search = filters.getAll('search').join(',');
    if (search) {
      data = this.model.filterBySearch(data, search);
    }
    const sort = filters.get('sort');
    if (sort) {
      data = this.model.sortItems(sort as SortParm, data);
    }
    // console.log(data, 'end');
    return data;
  }
}
