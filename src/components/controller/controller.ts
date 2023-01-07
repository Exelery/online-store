import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';
import PageError from '../../view/404/404';
import MainPageController from './mainPageController';
import { SortParm, ICart, IDisplay, IProductCount, IFilter } from '../../utils/types';
import ProductPage from '../../view/productPage';
import CartPage from '../../view/cartPage';

export default class AppController {
  view: MainPage;
  productPage: ProductPage;
  cartPage: CartPage;
  router: Router;
  model: Model;
  mainPageController: MainPageController;
  pageError: PageError;
  tourchSliders: boolean;
  cart: ICart[];
  constructor() {
    this.view = new MainPage();
    this.productPage = new ProductPage();
    this.cartPage = new CartPage();
    this.model = new Model();
    this.router = new Router(this);
    this.pageError = new PageError();
    this.mainPageController = new MainPageController(this);
  }

  start() {
    this.updateCart();
    this.addUserEvents();
    this.tourchSliders = true;
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
    const filters = this.updateFilters(this.model.filter);
    const data = this.filterAndSortItems(filters);
    if (path === '') {
      const productContainer = document.querySelector('.products__items');
      if (productContainer) {
        this.view.item.draw(data, this.model.productsAll, filters);
      } else {
        this.view.draw(data, this.model.productsAll, filters);
      }
    } else if (tempArr.length === 2 && foundItem) {
      this.productPage.draw(foundItem);
    } else if (path === 'cart') {
      const cartItems: IProductCount[] = this.model.findItemsFromCart(this.model.shoppingCart) as IProductCount[];
      console.log('cart Open', cartItems);
      this.cartPage.draw(cartItems);
    } else {
      this.pageError.draw();
    }
    this.tourchSliders = false;
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
      this.cart = JSON.parse(storageCart);
      const sum = this.cart.reduce((acc, el) => (acc += el.price * el.count), 0);
      const totalItems = this.cart.reduce((acc, el) => (acc += el.count), 0);
      totalSum.textContent = `$ ${sum}.00`;
      totalCart.textContent = `${totalItems}`;
    }
  }

  filterAndSortItems(filters: IFilter) {
    let data = this.model.productsAll.slice();
    // console.log(data, 'start', filters.toString());
    if (filters.price) {
      const [min, max] = filters.price;
      data = this.model.filterByRange(data, 'price', min, max);
    }
    if (filters.stock) {
      const [min, max] = filters.stock;
      data = this.model.filterByRange(data, 'stock', min, max);
    }
    if (filters.brand && filters.brand.length > 0) {
      data = this.model.filterByField(data, 'brand', filters.brand);
    }
    if (filters.category && filters.category.length > 0) {
      // console.log(category);
      data = this.model.filterByField(data, 'category', filters.category);
    }
    if (filters.search) {
      data = this.model.filterBySearch(data, filters.search);
    }
    if (filters.sort) {
      data = this.model.sortItems(filters.sort as SortParm, data);
    }
    // console.log(data, 'end');
    return data;
  }

  updateFilters(modelFilter: URLSearchParams): IFilter {
    const allId = this.cart.map((el) => el.id);
    console.log(allId);
    const filters: IFilter = {
      display: 'tile',
      sort: '',
      category: [],
      brand: [],
      changePriceOrStock: this.tourchSliders,
      cartIds: allId,
    };
    const price = modelFilter.get('price');
    if (price) filters.price = price.split('%').map(Number);
    const stock = modelFilter.get('stock');
    if (stock) filters.stock = stock.split('%').map(Number);
    const search = modelFilter.getAll('search').join(',');
    if (search) filters.search = search;
    const category = modelFilter.getAll('category');
    if (category.length > 0) filters.category = category;
    const brand = modelFilter.getAll('brand');
    if (brand.length > 0) filters.brand = brand;
    const display: IDisplay = modelFilter.get('display') as IDisplay;
    filters.display = display !== 'list' ? 'tile' : 'list';
    const sort = modelFilter.get('sort');
    filters.sort = sort as SortParm;

    console.log(filters);
    return filters;
  }
  changeSliders() {
    console.log('test');
    this.tourchSliders = true;
  }
}
