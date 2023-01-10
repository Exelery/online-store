import Router from '../../router/router';
import MainPage from '../../view/mainPage';
import Model from '../model/model';
import PageError from '../../view/404/404';
import MainPageController from './mainPageController';
import { SortParm, ICart, IDisplay, IProductCount, IFilter, IProduct } from '../../utils/types';
import ProductPage from '../../view/productPage';
import CartPage from '../../view/cartPage';
import CartPageController from './cartPageController';
import ProductPageController from './productPageController';
import ModalController from './modalController';

export default class AppController {
  view: MainPage;
  productPage: ProductPage;
  cartPage: CartPage;
  router: Router;
  model: Model;
  mainPageController: MainPageController;
  cartPageController: CartPageController;
  productPageController: ProductPageController;
  pageError: PageError;
  tourchSliders: boolean;
  cart: ICart[];
  modalController: ModalController;

  constructor() {
    this.view = new MainPage();
    this.productPage = new ProductPage();
    this.cartPage = new CartPage();
    this.model = new Model();
    this.router = new Router(this);
    this.pageError = new PageError();
    this.mainPageController = new MainPageController(this);
    this.cartPageController = new CartPageController(this);
    this.productPageController = new ProductPageController(this);
    this.modalController = new ModalController(this);
    this.cart = [];
  }

  start() {
    this.router.listen();
    this.addUserEvents();
    this.tourchSliders = true;
  }
  appRouter(e: Event, path: string) {
    if (e.target instanceof HTMLElement) {
      this.router.navigate(path);
    }
  }

  public async loadPage(path = '') {
    this.updateCart();
    this.model.filter = new URLSearchParams(window.location.search);
    if (!this.model.productsAll) {
      await this.model.loadData();
    }
    const tempArr = path.split('/');
    const foundItem = this.model.productsAll.find((el) => el.id === Number(tempArr[1]));
    const filters = this.updateFilters(this.model.filter);
    const data = this.filterAndSortItems(filters, this.model.productsAll);
    if (path === '') {
      const productContainer = document.querySelector('.products__items');
      if (productContainer) {
        this.view.item.draw(data, this.model.productsAll, filters);
      } else {
        this.view.draw(data, this.model.productsAll, filters);
      }
    } else if (tempArr.length === 2 && tempArr[0] === 'product' && foundItem) {
      this.productPage.draw(foundItem, filters.cartIds);
    } else if (path === 'cart') {
      const cartlist = document.querySelector('.cart__inner');
      const cartlistItems = cartlist?.querySelectorAll('li');
      const cartItems: IProductCount[] = this.model.findItemsFromCart(this.model.shoppingCart) as IProductCount[];
      if (cartlist && cartlistItems && cartlistItems.length > 1) {
        this.cartPage.cardPagination.drawItemsList(cartItems);
      } else {
        this.cartPage.draw(cartItems, filters.cartLimit, filters.cartPage);
      }
    } else {
      this.pageError.draw();
    }
    this.tourchSliders = false;
  }

  addUserEvents() {
    this.mainPageController.listen();
    this.cartPageController.listen();
    this.productPageController.listen();
    this.modalController.listen();
    const logo = document.querySelector('.header__title') as Element;
    const cart = document.querySelector('.header__cart') as Element;

    logo.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        const productContainer = document.querySelector('.products__items');
        productContainer?.parentElement?.removeChild(productContainer);
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
    const totalSum = document.querySelector('.header__total--label');
    const totalCart = document.querySelector('.header__cart--label');
    const storageCart = localStorage.getItem('shopping');
    if (totalSum && totalCart) {
      if (storageCart) {
        this.cart = JSON.parse(storageCart);
        const sum = this.cart.reduce((acc, el) => (acc += el.price * el.count), 0);
        const totalItems = this.cart.reduce((acc, el) => (acc += el.count), 0);
        totalSum.textContent = `$ ${sum}.00`;
        totalCart.textContent = `${totalItems}`;
      } else {
        totalSum.textContent = `$ 0.00`;
        totalCart.textContent = `0`;
        this.cart = [];
      }
    }
  }

  filterAndSortItems(filters: IFilter, data: IProduct[]) {
    data = data.slice();
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
      data = this.model.filterByField(data, 'category', filters.category);
    }
    if (filters.search) {
      data = this.model.filterBySearch(data, filters.search);
    }
    if (filters.sort) {
      data = this.model.sortItems(filters.sort as SortParm, data);
    }
    return data;
  }

  updateFilters(modelFilter: URLSearchParams): IFilter {
    const allId = this.cart.map((el) => el.id);
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
    const cartLimit = modelFilter.get('limit');
    if (cartLimit) filters.cartLimit = Number(cartLimit);
    const cartPage = modelFilter.get('page');
    if (cartPage) filters.cartPage = Number(cartPage);

    return filters;
  }

  changeSliders() {
    this.tourchSliders = true;
  }
}
