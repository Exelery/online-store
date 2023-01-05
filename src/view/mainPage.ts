import { IProduct } from '../utils/types';
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

  addProductsSection() {
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
    productsItems.classList.add('products__items', 'tile');
    productsList.append(productsItems);

    main.append(section);
  }

  draw(filteredData: IProduct[], allData: IProduct[]) {
    this.addProductsSection();
    this.sortingBar.draw(allData);
    this.filters.draw(allData);
    this.item.draw(filteredData);
    dispatchEvent(new Event('drawMainPage'));
  }
}
