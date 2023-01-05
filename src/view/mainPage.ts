import { IProduct, IDisplay } from '../utils/types';
import Item from './components/item';
import Filters from './components/filters';
import SortingBar from './components/sortingBar';

export default class MainPage {
  item: Item;
  filters: Filters;
  sortingBar: SortingBar;

  constructor() {
    this.item = new Item();
    this.filters = new Filters();
    this.sortingBar = new SortingBar();
  }

  addProductsSection(display: IDisplay) {
    const main = document.querySelector('main') as HTMLElement;

    const section = document.createElement('section');
    section.classList.add('products');

    const container = document.createElement('div');
    container.classList.add('container');
    section.append(container);

    const productsInner = document.createElement('div');
    productsInner.classList.add('products__inner');
    container.append(productsInner);

    const productsList = document.createElement('div');
    productsList.classList.add('products__list');
    productsInner.append(productsList);

    const productsItems = document.createElement('ul');
    productsItems.classList.add('products__items', display);
    productsList.append(productsItems);

    main.innerHTML = '';
    main.append(section);
  }

  draw(filteredData: IProduct[], allData: IProduct[], display: IDisplay = 'tile', searchValue = '') {
    this.addProductsSection(display);
    this.sortingBar.draw(allData, display);
    this.filters.draw(filteredData, allData);
    this.item.draw(filteredData, allData, display, searchValue);
    dispatchEvent(new Event('drawMainPage'));
  }
}
